---
title: Angular 10 - Towards the Better future for Angular
description: "Angular 10 is released, many developers sent me messages asking we cannot see any features, yes there was no big feature."
date: 2020-08-03T20:22:57.847Z
coverSVG: ../../images/Angular/Angular-10.png
socialImage: ../../images/Angular/Angular-10.png
draft: false
tags: ["Angular","Angular 10", "Material"]
categories: ["Angular", "Angular CLI", "Angular Components"]
publishDate: 2020-08-03T20:22:57.847Z
canonicalUrl: https://indepth.dev/posts/1309/angular-10-towards-the-better-future-for-angular
author: Santosh Yadav
---

Angular 10 is released, many developers sent me messages asking we cannot see any features, yes there was no big feature, but sometimes you need to take some time to prepare for a better future, and this is what Angular 10 release was all about.Let’s see what was included in the release and why it is important for a better future for the Angular framework.

## New Features

### Typescript 3.9:

Angular 10 supports Typescript 3.9 now, support for previous versions of typescript is removed. Typescript 3.9 comes with some bug fixes and minor improvements before the 4.0 gets released with some great features.

### Solution-style TypeScript configurations:

Typescript 3.9 added a solution style typescript config, in earlier versions, we had one `tsconfig.json` which was extended by [`tsconfig.app`](http://tsconfig.app)`.json` and `tsconfig.spec.json`, now `tsconfig.json` is used by editors to improve the developer experience, it specifies the path for different tsconfig file used within the application, and a new `tsconfig.base.json` is used by the compiler. This is how your `tsconfig.json` looks like now.

```
{
  "files": [
  ],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

> For time being the solution style config is going away, due to several issues reported in microsoft and inside CLI too you can see the issues [here](https://docs.google.com/document/d/1eB6cGCG_2ircfS5GzpDC9dBgikeYYcMxghVH5sDESHw/edit?usp=sharing) , but it may come back in future releases.

### Stricter configurations when using the --strict flag:

Strict flags were available with Ivy in Angular 9, but it can generate lot of errors if you application is  not following the correct types, and you may choose to disable it, Angular team chose not to create an application with strict flags by default, rather create a new app with `--strict` flag which will add few compiler options to your tsconfig.base.json.

Creating an App with `--strict` flag also adds a new `package.json` in your `app` folder. The `package.json` has a property to provide a flag called `sideEffects` this is set to `false` to enable tree-shaking of unused imports, `sideeffects` are something which changes the application behavior like polyfills, they can not be tree-shaked.

You can see all different compiler options on [Angular Docs](https://angular.io/guide/angular-compiler-options#angular-compiler-options)

### Narrower browser target configuration:

Angular uses `.browserslistrc` to determine for which browsers we need to compile the app, prior to Angular 10, Angular was supporting more versions of browsers. Angular 10 drops the support for IE 9-10 and IE 11 is supported in Opt-in. It means by default you will not get differential loading enabled, when new Angular 10 app is created, but if you migrate from previous version, differential loading will work. Angular 10 supports only last 1 version of Chrome and Firefox, for Edge, Safari and iOS last 2 major versions are supported.

### Service Worker:

* **Support for cache matching options:**  Provides support for cache.match options, Service Workers have 3 options `ignoreSearch`, `ignoreMethod` and `ignoreVary` now you can use `ignoreSearch` if provided it will [`http://foo.com/?value=bar`](http://foo.com/?value=bar) remove `value=bar` while matching the request from cache. read more on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match).
    
* **ignoreVary to avoid the reading Cache by default:** Angular has first class support for PWAs , which can be configured using `ng add @angular/pwa` , there is are few new header option `vary` which is not supported by all the browsers , where you can retrieve the cached responses, as this is not supported by all the browsers, it may lead to some buggy behaviour, now a new option is added to SW config called  `ignoreVary:true` which will not consider the vary header. You can read about it on [GitHub](https://github.com/angular/angular/pull/34663/commits) [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary)
    
* **change default SW strategy behavior:** In earlier version, while registering a service worker, it used to wait indefinitely to make sure the service worker is stable and can be registered, with this release you can specify the timeout. This is useful when you are specifying custom `registrationStrategy` and it depends on the response from a third party service. Now by default `'registerWhenStable:30000` is used which waits for 3 seconds to register the SW otherwise uses the default strategy. Read more about registrationStratgey [here](https://angular.io/api/service-worker/SwRegistrationOptions#registrationStrategy)  
    

### Router

* **canLoad can return UrlTree :**   `canLoad` only allowed to return `boolean` `Observable<boolean>`, `Promise<boolean>` where other Route Guards also returns `UrlTree`, it is possible to return `UrlTree` now similar to other Routes.
    

### SSR:

* **use absolute URLs from Location for HTTP :** While making an http call in SSR, if we wanted to use the absolute url with all http calls, we had to append it. Now we have a flag called `useAbsoluteUrl` which can be provided via INITIAL_CONFIG
    
```typescript
provide: INITIAL_CONFIG,
useValue: { document: '<app></app>', url: 'http://abc.com', useAbsoluteUrl: true }
```

After this config all http calls will [`http://abc.com`](http://abc.com) as base URL for all http calls.

### Treat SMS as UrlSafe

[SMS](https://github.com/angular/angular/issues/31462) was not treated as safe URL now with Angular 10 it will be treated as safe, this will be helpful for PWA apps. Earlier option was to use `bypassSecurityTrustResourceUrl` you can remove if you are still using it.

### Bazel Changes

The @angular/bazel is removed and in case you are using Bazel move to [@bazel/angular](https://www.npmjs.com/package/@bazel/angular) which is maintained by [Alex Eagle](https://twitter.com/Jakeherringbone). You can read his blog post on the same migration [here](https://dev.to/bazel/angular-bazel-leaving-angular-labs-51ja).

## Angular CLI

### New Feature

### Warning for commonJs libraries:

It is not advised to use commonJs modules with Angular as they may not be compatible with browsers, also they are not tree-shakable, but there are lot of application which uses packages like lodash, though it is advised to use lodash-es which is tree-shakable, Angular 10 will start giving you warnings, if you are using commonJs modules.

You can disable these warnings, if you still decide to use commonJs modules using below code into your build options:

```json
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    "allowedCommonJsDependencies": [
      "lodash"
    ]
  }
}
```

This option is not available for libraries, you can use it for your applications only.

### Lazy loading enabled by default for new Universal projects

Earlier all the lazy loaded modules were bundled into a single bundle so there was no lazy loading enable, Now all Universal applications will have lazy loading enabled if it it configured.

You can opt-in this behaviour in Angular 9, just by removing the commonJs as module target in your tsconfig.server.json. Thanks to [Alan](https://twitter.com/AlanAgius4) from CLI to inform the above changes.

### Breaking Changes

* `ng get` and `ng set` commands are deprecated now, you can use `ng config` now.
    
* removed deprecated options from app-shell and universal schematics.
    

## Angular Components

### New Features

### DateRangePicker Component

Now we have a new `DateRangePicker` control available in Angular Material 10, you can use below snippet.

```html
<mat-date-range-input [rangePicker]="picker">
  <input matStartDate placeholder="Start date">
  <input matEndDate placeholder="End date">
</mat-date-range-input>

<mat-date-range-picker #picker></mat-date-range-picker>
```

![](https://images.indepth.dev/images/2020/07/image-4.png)

### Allow position for DatePicker

You can easily position the DatePicker popup now, with `xPosition` and `yPosition` options available.

`xPosition` accepts `start` or `end` values.

`yPosition` accepts `above` or `below` values.

```html
<mat-form-field class="example-full-width" appearance="fill">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-datepicker xPosition="end" yPosition="above" #picker></mat-datepicker>
</mat-form-field>
<button mat-raised-button (click)="picker.open()">Open</button>
```

### Allow credentials for retrieving SVG Icons

If you try to retrieve icons from a remote location which requires credentials you will get exception, now we have `withCredentials` options which you can pass while retrieving the svg icons using http.

```typescript
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        'url',
        {
          withCredentials: true
        });
  }
```

### Convenient Way to handle no rows in matTable

Earlier to Angular Material 10, we used to use ngIf and display some row, when there are no records available once filters are applied, now we can use below snipper to handle the same

```html
 <tr class="mat-row" *matNoDataRow>
    <td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
  </tr>
```

### MDC snackbar

All Angular Material components are being migrated to Material Design Components (MDC) which is experimental. Now an experimental Snackbar component implemented using MDC is available to make Angular components follow the Material Design specification more closely.

### Selection List with Option to Select multiple rows

List component now has the option to add `mat-list-option` which will allow you to select multiple rows when used inside the `mat-selection-list` you can use the below snippet

```html
<mat-selection-list #shoes>
  <mat-list-option *ngFor="let shoe of typesOfShoes">
    {{shoe}}
  </mat-list-option>
</mat-selection-list>

<p>
  Options selected: {{shoes.selectedOptions.selected.length}}
</p>
```

### Added new routing option to navigation schematics

If you use navigation schematics, which is very convenient way to generate a navbar using material, we used to get `href` with generated template, now you can pass --routing as option which will add routerLink to the template.

```bash
ng generate @angular/material:navigation <component-name> --routing
```

### Breaking Changes

### hammerJs configs removed

HammerJs was removed as a dependency in Version 9.0 in this version below token and options are removed.

* `MAT_HAMMER_OPTIONS` has been removed.
    
* `GestureConfig` has been removed.
    
* `HammerInput` has been removed.
    
* `HammerStatic` has been removed.
    
* `Recognizer` has been removed.
    
* `RecognizerStatic` has been removed.
    
* `HammerInstance` has been removed.
    
* `HammerManager` has been removed.
    
* `HammerOptions` has been removed.
    

### Conclusion

Angular 10 was the first release after long time with fewer features, but in my opinion we are setting a path towards a better future for the framework, Angular team is trying to focus more on the issues raised by the community, so do expect some great features in upcoming releases, one feature which i am aware of is Strict type checked Forms. And Angular Components using Material Specification for all Components is a good thing to happen too. Angular CLI is now smaller.


Shout out to my GitHub Sponsors for supporting my work on Open Source.
- appwrite - [https://appwrite.io](https://appwrite.io)
- Umair - [https://twitter.com/_UmairHafeez_](https://twitter.com/_UmairHafeez_)
- Anand - [https://twitter.com/AnandChowdhary](https://twitter.com/AnandChowdhary)
- Sunil - [https://twitter.com/sunil_designer](https://twitter.com/sunil_designer)
- Darshan - [https://twitter.com/dr5hn](https://twitter.com/dr5hn)
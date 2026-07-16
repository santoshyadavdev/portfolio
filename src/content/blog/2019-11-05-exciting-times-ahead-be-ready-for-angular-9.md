---
draft: false
title: 'Exciting Times Ahead — Be Ready For Angular 9'
description: 'Angular 9 RC is out, what an exciting time to be Angular developer, no I am not saying this because of Angular 9 RC release. It''s because…'
author: Santosh Yadav
publishDate: 2019-11-05
preview: ../images/medium/exciting-times-ahead-be-ready-for-angular-9.png
coverSVG: ../images/medium/exciting-times-ahead-be-ready-for-angular-9.png
socialImage: ../images/medium/exciting-times-ahead-be-ready-for-angular-9.png
canonicalUrl: https://medium.com/@santosh.yadav198613/exciting-time-ahead-be-ready-for-angular-9-b3dbb4078c47
categories:
  - Angular
tags:
  - Angular
  - Angular 9
  - Ivy
---

![](https://cdn-images-1.medium.com/max/800/1*BKABj3Ewn8pfbTTjCs-wAQ.jpeg)

![](https://cdn-images-1.medium.com/max/800/0*B1w3k3OgSsW-xPHS.png)

> [**_AngularInDepth_**](https://medium.com/angular-in-depth) **_is moving away from Medium. More recent articles are hosted on the new platform_** [**_inDepth.dev_**](https://indepth.dev/angular/)**_. Thanks for being part of indepth movement!_**

The Angular 9 RC is out, what an exciting time to be Angular developer, no I am not saying this because of Angular 9 RC release. It's because Ivy is here, Ivy is now the default rendering engine in Angular.


> [](https://twitter.com/esosanderelias/status/1190106464901378048)

And believe me, if you are still not excited, see this tweet from [Mathias Raacke](https://medium.com/u/51c028df5615). 7 KB for a Hello World app

> [](https://twitter.com/oocx/status/1190672446711570433)

Now let’s go ahead and see what we have more apart from Ivy.

## New Features

### Add Migration Support for Undecorated Classes

Till Angular 8 decorators were optional for base classes for Directives and Components. This is applicable to Services that were not using `@Injectable` decorators.

```
export class BasePlain {
  constructor(private vcr: ViewContainerRef) {}
}

@Directive({selector: '[blah]'})
export class DerivedDir extends BasePlain {}
```

With Ivy such classes require decorators as well, to take care of such cases once you migrate using `ng update` the decorators will be added as a part of the migration. Read [this](https://hackmd.io/@alx/S1XKqMZeS) for more details, there are few cases that will not be taken care of.

### FormControlName Accept Number as Input

You may have used below code several times, but one thing we never thought of is how `[formControlName]="i"` works because it takes values of type string, this was fine there was no `fullTemplateTypeCheck` but in Ivy this will fail, to make sure the below syntax still works `formControlName` can accept value of type `string | number`.

```
<div formArrayName="tags">
  <div *ngFor="let tag of tagsArray.controls; index as i">
    <input [formControlName]="i">
  </div>
</div>
```

### Replace TestBed.get with TestBed.inject

In Angular 8 there was a breaking change where `TestBed.get` can no longer accept string value, the team decided to rollback the change as it was impacting a larger application base. Now that we have the type-safe version `TestBed.inject`, `TestBed.get` is deprecated.

```
TestBed.get(ChangeDetectorRef) // returns any

TestBed.inject(ChangeDetectorRef) // returns ChangeDetectorRef
```

### Default Value for Static Flag in ViewChild

Another breaking change introduced in Angular 8 `static` flag required for `ViewChild`. The static property is still there but for using false value, we no longer need to pass this property. Once you update to Angular 9 using `ng update` the migration will remove wherever we are using `{ static: false }`.

```
@ViewChild(ChildDirective) child: ChildDirective;
@ViewChild(ChildDirective, { static: false }) child: ChildDirective; // similar to above code
```

### ng-add Support for @angular/localize

To use @angular/localize we can now run `ng add @angular/localize` it will install the package and add necessary imports to polyfills, which is required to make it work.

### FullTemplateTypeCheck for Template

One issue which was always raised while working on Angular is “Why are templates not strictly type checked”. This was to some extent the case earlier, but now it will be strict for directives like `*ngIf` `*ngFor` and even pipes. There are 3 modes for type checking the templates:

-   Basic Mode: To enable set `fullTemplateTypeCheck: false`
-   Full Mode: To enable set `fullTemplateTypeCheck: true`
-   Strict Mode: To enable set `fullTemplateTypeCheck: true` and `strictTemplates: true`

Refer to [this](https://next.angular.io/guide/template-typecheck) document for more details.

### Typescript 3.6 support

Typescript version 3.6 is required now. Here a gist from [Lars Gyrup Brink Nielsen](https://medium.com/u/f0e7507974eb) with Angular version and respective Typescript version support.

```
Angular CLI version,Angular version,Node.js version,TypeScript version,RxJS version
~16.0.0,~16.0.0,^16.13.0 || ^18.10.0,	>=4.9.5 <5.1.0,^6.5.5 || ^7.4.0
~15.2.0,~15.2.0,^14.20.0 || ^16.13.0 || ^18.10.0,	>=4.8.4 <5.0.0,^6.5.5 || ^7.4.0
~15.1.0,~15.1.0,^14.20.0 || ^16.13.0 || ^18.10.0,	>=4.8.4 <5.0.0,^6.5.5 || ^7.4.0
~15.0.5,~15.0.4,^14.20.0 || ^16.13.0 || ^18.10.0,	~4.8.4,^6.5.5 || ^7.4.0
~14.3.0,~14.3.0,^14.15.0 || ^16.10.0,	>=4.6.4 <4.9.0,^6.5.5 || ^7.4.0
~14.2.0,~14.2.0,^14.15.0 || ^16.10.0,	>=4.6.4 <4.9.0,^6.5.5 || ^7.4.0
~14.1.3,~14.1.3,^14.15.0 || ^16.10.0,	>=4.6.4 <4.8.0,^6.5.5 || ^7.4.0
~14.0.7,~14.0.7,^14.15.0 || ^16.10.0,	>=4.6.4 <4.8.0,^6.5.5 || ^7.4.0
~13.3.0,~13.3.0,^12.20.2 || ^14.15.0 || ^16.10.0,>=4.4.4 <4.7.0,^6.5.5 || ^7.4.0
~13.2.6,~13.2.7,^12.20.2 || ^14.15.0 || ^16.10.0,>=4.4.4 <4.6.0,^6.5.5 || ^7.4.0
~13.1.4,~13.1.3,^12.20.2 || ^14.15.0 || ^16.10.0,>=4.4.4 <4.6.0,^6.5.5 || ^7.4.0
~13.0.4,~13.0.3,^12.20.2 || ^14.15.0 || ^16.10.0,~4.4.4,^6.5.5 || ^7.4.0
~12.2.18,~12.2.17,^12.14.1 || ^14.15.0,>=4.2.4 <4.4.0,^6.5.5 || ^7.0.1
~12.1.4,~12.1.5,^12.14.1 || ^14.15.0,>=4.2.4 <4.4.0,^6.5.5
~12.0.5,~12.0.5,^12.14.1 || ^14.15.0,~4.2.4,^6.5.5
~11.2.19,~11.2.14,^10.13.0 || ^12.11.1,>=4.0.8 <4.2.0,^6.5.5
~11.1.4,~11.1.2,^10.13.0 || ^12.11.1,>=4.0.8 <4.2.0,^6.5.5
~11.0.7,~11.0.9,^10.13.0 || ^12.11.1,~4.0.8,^6.5.5
~10.2.4,~10.2.5,^10.13.0 || ^12.11.1,>=3.9.4 <4.1.0,^6.5.5
~10.1.7,~10.1.6,^10.13.0 || ^12.11.1,>=3.9.4 <4.1.0,^6.5.5
~10.0.8,~10.0.14,^10.13.0 || ^12.11.1,~3.9.4,^6.5.5
~9.1.15,~9.1.13,^10.13.0 || ^12.11.1,>=3.6.5 <3.9.0,^6.5.5
~9.0.7,~9.0.7,^10.13.0 || ^12.11.1,>=3.6.5 <3.8.0,^6.5.5
~8.3.29,~8.2.14,^10.9.0,~3.5.3,^6.4.0
~8.2.2,~8.2.14,^10.9.0,~3.4.5,^6.4.0
~8.1.3,~8.1.3,^10.9.0,~3.4.5,^6.4.0
~8.0.6,~8.0.3,^10.9.0,~3.4.5,^6.4.0
~7.3.9,~7.2.15,^8.9.4 || ^10.9.0,~3.2.4,^6.3.3
~7.2.4,~7.2.15,^8.9.4 || ^10.9.0,~3.2.4,^6.3.3
~7.1.4,~7.1.4,^8.9.4 || ^10.9.0,~3.1.6,^6.3.3
~7.0.7,~7.0.4,^8.9.4 || ^10.9.0,~3.1.6,^6.3.3
~6.2.9,~6.1.10,^8.9.4,~2.9.2,^6.2.2
~6.1.5,~6.1.10,^8.9.4,~2.7.2,^6.2.2
~6.0.8,~6.0.9,^8.9.4,~2.7.2,^6.0.0
~1.7.4,~5.2.11,^6.9.5 || ^8.9.4,~2.5.3,^5.5.12
~1.6.7,~5.2.11,^6.9.5 || ^8.9.4,~2.5.3,^5.5.12
~1.5.6,>=5.0.5 <=5.1.3,^6.9.5 || ^8.9.4,>=2.4.2 <2.6.0,^5.5.12
~1.4.10,>=4.2.6 <=4.4.7,^6.9.5 || ^8.9.4,~2.4.2,^5.0.3
~1.3.2,>=4.2.6 <=4.4.7,^6.9.5,~2.4.2,^5.0.3
~1.2.7,>=4.0.3 <=4.1.3,^6.9.5,~2.3.4,^5.0.3
~1.1.3,>=4.0.3 <=4.1.3,^6.9.5,~2.3.4,^5.0.3
~1.0.6,>=4.0.3 <=4.1.3,^6.9.5,~2.2.2,^5.0.3
1.0.0-rc.4,~2.4.10,^6.9.5,~2.0.10,^5.0.3
1.0.0-beta.30,~2.3.1,^6.9.5,~2.0.10,^5.0.3
1.0.0-beta.22-1 (package name: angular-cli),~2.2.4,^6.9.5,~2.0.10,^5.0.3
1.0.0-beta.20-1 (package name: angular-cli),~2.1.2,^6.9.5,~2.0.10,^5.0.3
1.0.0-beta.17 (package name: angular-cli),~2.0.2,^6.9.5,~2.0.10,^5.0.3
```

### Generic Support for ModuleWithProviders

If you are an Angular library owner, there are high chances you may have used `ModuleWithProviders` with Angular 9. Now it is mandatory to use the generic `ModuleWithProviders<T>` type to indicate the Angular module type.

A migration schematic is already added, so `ng update` will take care of this migration.

Previous code:

```
@NgModule({ ...}) export class MyModule {
 static forRoot(config: SomeConfig): ModuleWithProviders {
   return {
         ngModule: SomeModule,
         providers: [{ provide: SomeConfig, useValue: config }]
   };
 }
}
```

After migration:

```
@NgModule({ ...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<SomeModule>
{
   return {
         ngModule: SomeModule,
         providers: [{ provide: SomeConfig, useValue: config }]
   };
 }
}
```

### Apply Schematics to Libraries

`ng update` takes care of all code migration, but it was not applied to Angular libraries. In Angular 9, `ng update` will apply all migration schematics to library projects as well. This is important if you are an Angular library author, so your code is in sync with the latest changes.

### No more entryComponents

If you have worked with a popup in Angular, you must have used this property. It was required so you can dynamically load the component without referring it in the template. With Ivy, this is not required anymore.

## Breaking Changes

### Removed tslib Dependency

Angular does not depend on `tslib` now. In earlier versions of Angular, it was required and was part of the dependency. If you are not using Angular CLI you may need to install this package.

### Forms

-   **ngForm:** Earlier `<ngForm></ngForm>` was a valid selector, if you are using it move to `<ng-form></ng-form>.`
-   **NgFromSelectorWarning:** It was deprecated in Angular 6 and now removed the purpose of this directive was to display warnings when the deprecated `[ngForm](https://angular.io/api/forms/NgForm)` selector is used.
-   **FormsModule.withConfig:** `FormsModule.withConfig` has been removed. we need to use`FormsModule` directly, `withConfig` used to take below options.

`opts: { warnOnDeprecatedNgFormSelector?: "never" | "once" | "always"; }`

-   The deprecated type `RenderComponentType` has been removed. Use `RendererType2` instead.
-   The deprecated type `RootRenderer` has been removed. Use `RendererFactory2` instead.

### Angular Translation

-   Translations (loaded via the `loadTranslations()` function) must now use `MessageId` for the translation key rather than the previous `SourceMessage` string.
-   To attach the `$localize` function to the global scope import from `@angular/localize/init`. Previously it was `@angular/localize` .
-   To access the `loadTranslations()` and `clearTranslations()` functions, import from `@angular/localize`. Previously it was `@angular/localize/run_time`.

### Service Worker

`versionedFiles` property is removed in `ngsw-config.json`

**Before**

```
"assetGroups": [
  {
    "name": "test",
    "resources": {
      "versionedFiles": [
        "/**/*.txt"
      ]
    }
  }
]
```

**After**

```
"assetGroups": [
  {
    "name": "test",
    "resources": {
      "files": [
        "/**/*.txt"
      ]
    }
  }
]
```

### Angular Bazel

-   @angular/bazel `ng_setup_workspace()` is no longer needed and has been removed. Angular will assume you will fetch rules\_nodejs in your WORKSPACE file, and no other dependencies remain here. Simply remove any calls to this function and the corresponding load statement.
-   If you are using `protractor_web_test_suite` from `@angular/bazel` now switch to the `@bazel/protractor` package.

## Deprecations

-   `TestBed.get` function is now deprecated in favor of type-safe `TestBed.inject`.

For a complete guide refer to [Official docs](https://next.angular.io/guide/updating-to-version-9). Also, nothing is covered related to Ivy as it is a really big topic and we will be writing a blog post soon to cover all features of Ivy.

## Angular CLI

### Support to verify CLI Version

Check is added to verify if the installed CLI version is latest published version If it is not while running `ng update` it will install the latest version as a temporary package to run the migration.

### Support to Mix Multiple Configuration

Earlier with `ng build` we can pass configuration by using `--configuration` the one problem is if I want to override some configuration, we have to copy the entire configuration and make a new entry to use it.

Now it is possible to use `ng build --configuration=prod,testing` so in `testing` configuration we can only pass the configuration which needs to be overwritten.

### Specify options for ng-add

Another update if you are an Author for Angular Library, with `ng add` you can specify if the package should be added to dependencies or not.

You can specify below option in package.json

```
ng-add : { 
     "save": false | true | 'dependencies' | 'devDependencies'
}
```

### Type options for component schematic

As of now, when we use `ng g c user` it will generate a file with the component class `UserComponent` the type option lets you define which type of component you are creating for example `ng g c user --type="dialog"` it will create a component with the class name `UserDialog` .

### Schematics Support to Generate Interceptor

Adding an interceptor was manual till now, with Angular 9 we will be able to use `ng g i custom` to create a `CustomInterceptor` class.

### Change to app-shell schematic

To generate app-shell we had to pass `--clientProject` it will be optional now, it will consider the default project instead, if not provided.

### Skip Test While using Generate Schematics

If we create an application with `--minimal=true` it skips the e2e and unit testing configuration. But when we use `ng g` to generate a `component/pipe/service` it adds a `spec.ts` file. Starting from Angular CLI 9, this will be taken care of.

### Autodiscover multiSelect schema prompt

To create a prompt that can have multiSelect we have to provide a lot of other options, with Angular 9 it can be simplified like below configuration.

```
test: {
  type: 'array',
  'x-prompt': {
    'type': 'list',
    'multiselect': false,
    'items': [
      {
        'value': 'one',
        'label': 'one'
      },
      {
        'value': 'two',
        'label': 'two'
      },
    ],
    'message': 'test-message',
  },
}
```

### Support to provide npmrc file path

`NPM_CONFIG_USERCONFIG` and `NPM_CONFIG_GLOBALCONFIG` variables are available in npm and when provided Angular CLI will prefer them over the global `.npmrc` file. Read npm [docs](https://docs.npmjs.com/misc/config#npmrc-files) for more detail.

### Breaking Change

-   `styleext` and `spec` options are removed while using CLI , use `style` and `skipTests` options instead.

## Angular Component

### New Clipboard Module

A new clipboard component is available which is part of the `@angular/cdk` family.

If you want to read more on how to implement do read below blog post from [Tim Deschryver](https://medium.com/u/802a7996f6b6).

[**Use the new Angular Clipboard CDK to interact with the clipboard**  
_The new Material release brings us a new Clipboard CDK module, let’s explore the CDK with some examples._blog.angularindepth.com](https://blog.angularindepth.com/use-the-new-angular-clipboard-cdk-to-interact-with-the-clipboard-be1c9c94cac2 "https://blog.angularindepth.com/use-the-new-angular-clipboard-cdk-to-interact-with-the-clipboard-be1c9c94cac2")[](https://blog.angularindepth.com/use-the-new-angular-clipboard-cdk-to-interact-with-the-clipboard-be1c9c94cac2)

### hammerjs is now optional

In earlier versions `hammerjs` was required to add gesture support, it is optional now and all implementation used internally is removed, you can use `HammerModule` from [@angular/platform-browser](https://next.angular.io/api/platform-browser).

### `New Package for Google Maps`

`@angular/google-maps` package is available now, integrating google maps was always a difficult task not anymore, this package is already tested on multiple devices. You can refer to the blog post from [Tim Deschryver](https://medium.com/u/802a7996f6b6) on how to implement it.

[**Google Maps is now an Angular component**  
_The new Angular Component release introduces the second official @angular/component component, a Google Maps component._blog.angularindepth.com](https://blog.angularindepth.com/google-maps-is-now-an-angular-component-821ec61d2a0 "https://blog.angularindepth.com/google-maps-is-now-an-angular-component-821ec61d2a0")[](https://blog.angularindepth.com/google-maps-is-now-an-angular-component-821ec61d2a0)

### Breaking Changes

-   Components can no longer be imported through `@angular/material`. Use the individual secondary entry-points, such as `@angular/material/button`.
-   `MAT_CHECKBOX_CLICK_ACTION` is deprecated, use `MAT_CHECKBOX_DEFAULT_OPTIONS`

## Conclusion

I am really excited to finally see Ivy which is more stable and ready for production use, and I am sure you are excited as well. The Angular CLI has many awesome features added to make us more productive, and it's great to see some awesome components like map and clipboard being added in Angular Material. And with Ivy into the picture now, believe me, we can expect more in future, so **exciting times ahead** for Angular for sure and you should be excited as well.

Thanks to the community for translating the article in Japanese:

[**Exciting Times Ahead - Be Ready For Angular 9 を翻訳しました - Graat（グラーツ）**  
_本記事は、Angular In Depth のエントリ、 Exciting Times Ahead - Be Ready For Angular 9 (…_www.graat.co.jp](https://www.graat.co.jp/blogs/ck38hopvsqxw60991eco8zmsx "https://www.graat.co.jp/blogs/ck38hopvsqxw60991eco8zmsx")[](https://www.graat.co.jp/blogs/ck38hopvsqxw60991eco8zmsx)

---
draft: false
title: 'Brace yourself. Angular 8 is coming'
description: 'In this blog, let’s see what we should expect from the Angular 8 release. This post will cover some hot topics covered at ngConf and…'
author: Santosh Yadav
publishDate: 2019-05-21
preview: ../images/medium/brace-yourself-angular-8-is-coming.png
coverSVG: ../images/medium/brace-yourself-angular-8-is-coming.png
socialImage: ../images/medium/brace-yourself-angular-8-is-coming.png
canonicalUrl: https://medium.com/@santosh.yadav198613/embrace-yourself-angular-8-is-coming-1bf187c8f0bf
categories:
  - Angular
tags:
  - Angular
  - Angular 8
  - Web Development
---

![](https://cdn-images-1.medium.com/max/800/0*8ChmH7C_kzQ4zGUR.png)

> [**_AngularInDepth_**](https://medium.com/angular-in-depth) **_is moving away from Medium. More recent articles are hosted on the new platform_** [**_inDepth.dev_**](https://indepth.dev/angular/)**_. Thanks for being part of indepth movement!_**

In this blog, let’s see what we should expect from the Angular 8 release. This post will cover some hot topics covered at ngConf and Google I/O 2019. So if you missed both events, do read on to have an idea what features your favorite framework is going to offer you. This blog is co-written with [Roman Yavoriv](https://medium.com/u/2fd215b5b80a).

## Introduction

I am sure you are also excited the same way I am after NgConf 2019, and eagerly awaiting the Angular 8 release. [Igor Minar’s keynote](https://youtu.be/O0xx5SvjmnU) covered many things from tooling to differential loading and many more awesome features.

Let’s go ahead and see how it impacts your projects. We will discuss the features in detail and whether there are any deprecations and breaking changes.

## New Features

### Differential loading

Depending on your `browserlist` file, during the build Angular will create a separate bundle for `polyfills`. So basically you’ll have:

![Source: Keynote by Brad Green & Igor Minar(ng-conf 2019)](https://cdn-images-1.medium.com/max/800/1*ict75x6WEp4M32_i12_epg.jpeg)

_Source: Keynote by Brad Green & Igor Minar(ng-conf 2019)_

Using this feature will decrease the bundle size.

![Source: Keynote by Brad Green & Igor Minar(ng-conf 2019)](https://cdn-images-1.medium.com/max/800/1*bLVHZ7moTDQUXvBdcanB1A.jpeg)

_Source: Keynote by Brad Green & Igor Minar(ng-conf 2019)_

But how does this work?

Basically, Angular will build additional files with polyfills, and they will be injected with `[nomodule](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-nomodule)` attributes.

```
<body>
  <pp-root></pp-root>
<script type="text/javascript" src="runtime.js"></script>
  <script type="text/javascript" src="es2015-polyfills.js" nomodule></script>
  <script type="text/javascript" src="polyfills.js"></script>
  <script type="text/javascript" src="styles.js"></script>
  <script type="text/javascript" src="vendor.js"></script>
  <script type="text/javascript" src="main.js"></script>
</body>
```

> The nomodule attribute is a boolean attribute that prevents a script from being executed in user agents that support module scripts. This allows selective execution of module scripts in modern user agents and classic scripts in older user agents.

### SVG as a template

You can now use SVG files as a template. Up until now, we only had the option to use inline HTML or external HTML as a template.

```
@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.svg",
  styleUrls: ["./icon.component.css"]
})
export class AppComponent {...}
```

### Experimental Ivy Rendering Engine

Ivy is still in the experimental phase and with the Angular 8 release you can test it by creating an app with `enable-ivy` flag set to true as shown below. Remember, it's not fully functional (opt-in preview) and as suggested by Igor Minar in ngConf 2019, View Engine is still recommended for new apps.

To enable Ivy in an existing project set `enableIvy`option in the `angularCompilerOptions` in your project’s `tsconfig.app.json`

```
"angularCompilerOptions": {"enableIvy": true}
```

You can create a new application with the new Engine as well:

```
$ ng new my-app --enable-ivy
```

Ivy will offer the following advantages, the first 3 features are expected in Angular 9:

1.  Faster Compilation (V9).
2.  Improved Type checking for templates (V9).
3.  Smaller Bundle Size(V9) (in case you missed [I/O 19, Vikram Subramanian displayed an App with 4.3 KB build](https://youtu.be/FiVw6zjgw24)).
4.  Backward compatibility.
5.  And my favorite: you can debug templates (I am sure like me many developers need this feature).

### Bazel Support

Bazel is another tool open sourced by Google and “don’t we love Google for that”. As explained by Igor Minar, Bazel has been used internally for a long time and is now available for everyone to use. You can refer to the [Bazel](https://bazel.build/) Documentation and also learn how to use it with [Angular](https://next.angular.io/guide/bazel).

You are probably wondering: “Is Bazel ready?” Short answer: not yet. Currently, it is in the “opt-in preview” mode. Let me cite Alex Eagle, Angular tooling team lead at Google:

> If you tried Bazel in the past there were a lot of sharks…

> (Now) Sharks have been dealt with, but the water still might be cold.

Bazel is available as opt-in, it is expected to be included in `@angular/cli` in Version 9.

Bazel will provide these advantages:

1.  Faster build time (For the first build it takes time, but concurrent builds will be a lot faster), Angular is already using it and now CI gets completed within 7.5 minutes rather than 60 mins which were before Bazel.
2.  Incremental Build: you will be able to build and deploy only what has changed rather than the entire App.
3.  You can eject the Bazel files, they are hidden by default.

You can add Bazel support using the below command:

```
ng add @angular/bazel
```

Or, you can create a new app with Bazel as well:

```
$ npm install -g @angular/bazel
$ ng new my-app --colection=@angular/bazel
```

### Builders API

The new version allows us to use Builders API, also known as Architect API.   
Angular uses builders for main operations: `serve` , `build` , `test` , `lint` and `e2e` . You can see used builders in the `angular.json` file.

```
...
"projects": {
  "app-name": {
    ...
    "architect": {
      "build": {
        "builder": "@angular-devkit/build-angular:browser",
        ...
      },
      "serve": {
        "builder": "@angular-devkit/build-angular:dev-server",
        ...
      },
      "test": {
        "builder": "@angular-devkit/build-angular:karma",
        ...
      },
      "lint": {
        "builder": "@angular-devkit/build-angular:tslint",
        ...
      },
      "e2e": {
        "builder": "@angular-devkit/build-angular:protractor",
        ...
      }
    }
  }
}
```

From now on we can create our custom builders. I think about this as the `gulp/grunt` commands in the “old days”.

Basically, the builder is just a function with a set of commands which you pass to the `createBuilder()` method from `@angular-devkit/architect` package.

```
import { createBuilder } from '@angular-devkit/architect';
function customBuild(options, context) { 
  return new Promise((resolve, reject) => {
    // set of commands
  })
}
createBuilder(customBuild);
```

You can check out the built-in Angular builders [here](https://github.com/angular/angular-cli/tree/a41c18571370a164d8a36695dbf4faf65860fc19/packages/angular_devkit/build_angular/src).

For more details, you can check this [awesome article](https://blog.angular.io/introducing-cli-builders-d012d4489f1b) in the [Angular blog](https://blog.angular.io/).

### Changes in the Lazy loading

The new version is deprecating the `loadChildren:string` syntax for loading modules lazily.

Before:

```
loadChildren: './lazy/lazy.module#LazyModule';
```

After:

```
loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
```

In case you have a lot of lazy loaded modules and want to do it via some package, read [Upgrading Lazy Loaded Route](https://blog.angularindepth.com/automatically-upgrade-lazy-loaded-angular-modules-for-ivy-e760872e6084) by [Craig Spence](https://medium.com/u/52fa64a71dbc).

### Support for $location AngularJS API

The Angular Team wants to provide support for all developers using AngularJS and help them upgrade to Angular. The team has now added support for $location service when you upgrade. A new package `angular/common/upgrade` is added.

1.  Allows the ability to retrieve the state from location service.
2.  Add the ability to track all location changes.
3.  It will allow you to read `hostname` `protocol` `port` `search` properties which were available in AngularJS.
4.  `MockPlatformLocation` API added to test the location service.

### Web Worker

Web worker support is added in Angular 8. Now you can add web workers and delegate the time consuming processes which you want to run in the background to a web worker. Run the below command to generate a new web worker using the Angular CLI:

```
ng g webWorker <name>
```

### Service Worker

Usage of PWA is growing day by day, there are many improvements made to the service worker.

1.  One of the improvements is `SwRegistrationOptions` option added.
2.  Support multiple Apps in one domain.

Read more about Service Workers on [Angular Doc](https://next.angular.io/guide/service-worker-config).

### Form improvements

1.  `markAllAsTouched` method is added to mark all controls within `FormGroup`as `touched`. This is very useful if you want to trigger the validation for all controls within a `FormGroup`. Earlier we had to use the code snippet below to achieve the same functionality for `FormGroup`:

```
validateFormAndDisplayErrors(form: FormGroup) {
  Object.keys(form.controls).map((controlName) => {
    form.get(controlName).markAsTouched({onlySelf: true});
  });
}
```

2\. `clear` (remove all) elements from a `FormArray`.

Previously to remove all elements from `formArray` we had to loop removing the 1st element until empty:

```
while (formArray.length) {
  formArray.removeAt(0);
}
```

Not anymore. We will have a native method**.**

```
formArray.clear()
```

### Support for Typescript 3.4.x

Angular now uses TypeScript 3.4 (v7 uses 3.2.x). There are not a lot of breaking changes — so probably you should be good. You can check them out [here](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#typescript-34).

### Performance Improvements

Right now the `ServerRendererFactory2` creates a new instance of the `DomElementSchemaRegistry` for each and every request, which is quite costly. Now it will share the global instance of `DomElementSchemaRegistry.`

### Angular Firebase

If you are using Angular Firebase, there is really good news for you. You can deploy your application using the Angular CLI. Isn’t that exciting?!

You can run the below command to deploy the application using the CLI:

```
ng run [PROJECT_NAME]:deploy
```

You can read more about this functionality on [Angular Firebase.](https://github.com/angular/angularfire2/pull/2046/files#diff-f2708892333baee7be9359746cdb7939)

## Deprecated API’s

### Usage for any in TesBed.get

-   `TestBed.get()` has two signatures, one which is typed and another which accepts and returns `any`. The signature for `any` is deprecated; all usage of `TestBed.get()` should go through the typed API. This mainly affects string tokens (which aren't supported) and abstract class tokens.

Before:

```
TestBed.configureTestingModule({
  providers: [{ provide: "stringToken", useValue: new Service() }],
});
let service = TestBed.get("stringToken"); // type any
```

After:

```
const SERVICE_TOKEN = new InjectionToken<Service>("SERVICE_TOKEN");
TestBed.configureTestingModule({
  providers: [{provide: SERVICE_TOKEN, useValue: new Service()}],
});
let service = TestBed.get(SERVICE_TOKEN); // type Service
```

### Removed deprecated DOCUMENT from `@angular/platform-browser`

`DOCUMENT` is removed from `@angular/platform-browser` If you use `DOCUMENT` from `@angular/platform-browser`, you should start to import this from `@angular/common`.

### @angular/http

`@angular/http` package was deprecated in Angular 5 but was still available as `@angular/ platform-server` had the dependency on the same, now it is removed from the list of packages.

## Breaking Changes

It’s not a well-known fact, but Angular was auto-correcting invalid usage of `tr` and `col` HTML elements.

For `tr` — the correction will be applied if the element is not inside `tbody`, `tfoot` or `thead`. In this case, it will be wrapped automatically in the `tbody`.

For `col` — the correction will be applied if the element is not inside `colgroup`. In this case, it will be wrapped automatically.

Now Angular has decided to leave this for developers, in order to avoid conflicts and issues. So you should wrap it by itself.

You can read more about this issue [here](https://github.com/angular/angular/commit/f2dc32e).

### Configure Timing of ViewChild/ContentChild queries

With this feature, it is mandatory to provide a static flag to define when you want a ViewChild and ContentChild instance to be resolved.

You’ve probably experienced this inconsistency: query results would sometimes be available in `ngOnInit`, but sometimes wouldn’t be available until `ngAfterContentInit` or `ngAfterViewInit`.

```
// Ensure Change Detection runs before accessing the instance
@ContentChild('foo', { static: false }) foo!: ElementRef;
// If you need to access it in ngOnInit hook
@ViewChild(TemplateRef, { static: true }) foo!: TemplateRef;
```

The above feature is not available for `ViewChildren` or `ContentChildren`. They will be resolved after Change Detection runs.

But be careful. Setting `static: true` will not allow you to get results from dynamic templates resolutions such as`*ngIf`.

Schematic support is added to migrate the existing code to this syntax, as this syntax will be used for `Ivy` . You can run `ng update @angular/core` to migrate the existing code.

You can read more details about this option [here](https://github.com/angular/angular/pull/28810).

### Angular Material

Angular Material Project is renamed to Angular Components. The packages remain the same.

## Conclusion

We are really close to Angular 8. The Angular team is doing a great job — which makes our job (and life) much easier. With every version, the update is smoother and smoother.

Let’s take for example the Air France case.

![Source: Keynote by Brad Green & Igor Minar(ng-conf 2019)](https://cdn-images-1.medium.com/max/800/1*40B6NyupPTjsoOZymLSL9w.jpeg)

_Source: Keynote by Brad Green & Igor Minar(ng-conf 2019)_

So the update should be painless and probably won’t take a lot of time.

For a step by step migration guide please check [https://update.angular.io](https://update.angular.io/).

> [](https://twitter.com/IgorMinar/status/1121676911552262145?s=20)

We should expect the Angular stable release the week of May 22nd as per Igor Minar, if all the issues are resolved.

The future of Angular looks bright. Everything else depends on us.

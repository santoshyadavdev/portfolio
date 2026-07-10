---
draft: false
title: 'What’s new After Angular 8'
description: 'In this blog post let’s see what is going on with Angular 8 post the official release in May 2019.'
author: Santosh Yadav
publishDate: 2019-09-10
preview: ../images/medium/whats-new-after-angular-8.png
coverSVG: ../images/medium/whats-new-after-angular-8.png
socialImage: ../images/medium/whats-new-after-angular-8.png
canonicalUrl: https://medium.com/@santosh.yadav198613/whats-new-after-angular-8-28d27ce3348a
categories:
  - Angular
tags:
  - Angular
  - Angular 8
  - Web Development
---

![Angular](https://cdn-images-1.medium.com/max/800/1*nbJ41jD1-r2Oe6FsLjKaOg.png)

_Angular_

![](https://cdn-images-1.medium.com/max/800/0*-cYw6rVYeY4m8BKZ.png)

> [**_AngularInDepth_**](https://medium.com/angular-in-depth) **_is moving away from Medium. More recent articles are hosted on the new platform_** [**_inDepth.dev_**](https://indepth.dev/angular/)**_. Thanks for being part of indepth movement!_**

In this blog post let’s see what is going on with Angular 8 post the official release in May 2019.

## Introduction

We got many new features with the release of Angular 8, Angular 9 will be released around November 2019. There are a lot of interesting things happening after Angular 8 was released in May, we have Ivy as default, ng deploy is officially support by CLI and many more.

## New Features

### **Capture Location Updates from AngularJS Application**

A new hook `onChange` is added, this hook can be used to capture changes to browser URL done by AngularJS application. Below is the code snippet from spec file, you can pass `changeListener` and `errorHandler` function

```
$location.onChange(changeListener, errorHandler);
function changeListener(url: string, state: unknown) 
{ 
      return undefined; 
} 
function errorHandler(e: Error) {}
```

### Unit Test Helpers

2 new Unit Test Helpers are added so we can Unit Test Angular Service while upgrading AngularJS project.

-   [createAngularJSTestingModule](https://angular.io/api/upgrade/static/testing/createAngularJSTestingModule)
-   [createAngularTestingModule](https://angular.io/api/upgrade/static/testing/createAngularTestingModule)

### Typescript

Typescript 3.5.x is required with 8.2.0 release.

### Migration from Renderer to Renderer2

`Renderer` was deprecated long back and new `Renderer2` was introduced, now `ng update` will automatically migrate the code to `Renderer2`.

### Support $element in the upgraded component

An upgraded component that uses a template function doesn’t receive the `$element` or `$attrs` arguments earlier, now it will receive `$element`.

## Deprecations

### **Platform WebWorker**

Platform web worker packages `@angular/platform-webworker` and `@angular/platform-webworker-dynamic` are officially deprecated, the Angular team realized it's not good practice to run the Angular application on Web worker due to poor API and tooling support. If you are interested in learning more about it you can read the entire message on [Commit](https://github.com/angular/angular/pull/30642/commits/9fe8df82a9b9dfafd57228d727c6076bd3176b9f)

### **Web Tracing Framework**

Angular supported the integration with the Web Tracing Framework (WTF) for performance testing. As it is not maintained and fails for the majority of applications, this is deprecated now.

## Breaking Changes

### Slice Pipe

The `SlicePipe` used to take vale of type `any` earlier, `SlicePipe` now only accepts an array of values, a string, null or undefined. It will throw a compilation error if any other data type is used.

## Angular CLI

-   The Angular root component in the default app is redesigned to include few commands on UI.
-   `ng deploy` command is added for supporting the deployment builders created by the community.
-   While creating a new module you can also define if you need the module to be lazy-loaded. The below command generates the `ProductModule` and will add the routing configuration in `app-routing.module` to lazy load the `ProductModule`

```
ng g module product --routing true --route product --module app
```

-   In Angular, 8 differential loading feature was added, and compiler used to build the application twice once for `ES2015` and another with `ES5` which caused a lot of confusion for the developers, as we have seen many questions over StackOverflow and on GitHub as well. With latest CLI release you will not notice this behavior anymore. With CIL 8.3.0 only the ES2015 application is built and then the resulting application bundles are then down leveled directly.

## Conclusion

The Angular 9.next is already available and Ivy is now the default rendering engine and in a few months we will have RC version and it will be clear what more we can expect from Angular. There are a lot of performance improvements and bug fixes which is happening in parallel.

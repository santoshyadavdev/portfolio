---
draft: false
title: 'Angular Tools You Should be Aware Of'
description: 'In this blog post, we will learn about the tools you should be aware of as an Angular Developer.'
author: Santosh Yadav
publishDate: 2019-10-24
preview: ../images/medium/angular-tools-you-should-be-aware-of.png
coverSVG: ../images/medium/angular-tools-you-should-be-aware-of.png
socialImage: ../images/medium/angular-tools-you-should-be-aware-of.png
canonicalUrl: https://medium.com/@santosh.yadav198613/angular-tools-you-should-be-aware-of-a6d37ad39f4e
categories:
  - Angular
tags:
  - Angular
  - Tools
  - Web Development
---

![](https://cdn-images-1.medium.com/max/400/1*Z4u0zQEBPhjPSYetpGUPFg.png)

![](https://cdn-images-1.medium.com/max/400/1*PvEsShI5N9jfIRjrOIoG4Q.png)

![](https://cdn-images-1.medium.com/max/400/1*9wUdxYZA_I_1T4gsfS_bcw.png)

![](https://cdn-images-1.medium.com/max/800/0*1TU4SpVyHXV-KYIl.png)

> [**_AngularInDepth_**](https://medium.com/angular-in-depth) **_is moving away from Medium. More recent articles are hosted on the new platform_** [**_inDepth.dev_**](https://indepth.dev/angular/)**_. Thanks for being part of indepth movement!_**

In this blog post, we will learn about the tools you should be aware of as an Angular Developer.

## Introduction

As an Angular Developer, we often focus on using the overall framework. This isn’t wrong since Angular was designed to have a uniform method of building great applications. However, Angular also offers great tooling support. The tooling that is included with Angular is freely available and easy to use.

So let’s go through each tool you should be aware of:

### Typescript

When Angular Team started working Typescript was selected as the go-to language, and this was the reason I personally chose to learn Angular. This was my feeling when I started learning TypeScript. TypeScript is adding a lot of new features and 3.7 is around and a stable version will be released soon, to keep yourself updated, refer the [official documentation](https://www.typescriptlang.org/index.html).

![](https://cdn-images-1.medium.com/max/800/0*xUz_xNQnrm7Lv3mc.gif)

### Angular Compiler

As a developer, we only care about ng build command, but Angular Compiler does more than that behind the scene. As per Angular documentation, Angular Compiler runs in 3 phases.

-   Code Analysis
-   Code Generation
-   Template Type Checking

To read more about Angular Compiler refer the contents below :

[**Angular**  
_Angular is a platform for building mobile and desktop web applications. Join the community of millions of developers…_angular.io](https://angular.io/guide/aot-compiler#how-aot-works "https://angular.io/guide/aot-compiler#how-aot-works")[](https://angular.io/guide/aot-compiler#how-aot-works)

[**A Deep, Deep, Deep, Deep, Deep Dive into the Angular Compiler**  
_As you know, I love Angular, and all the magical things you can do with it, and I thought it would be an interesting…_medium.com](https://medium.com/angular-in-depth/a-deep-deep-deep-deep-deep-dive-into-the-angular-compiler-5379171ffb7a "https://medium.com/angular-in-depth/a-deep-deep-deep-deep-deep-dive-into-the-angular-compiler-5379171ffb7a")[](https://medium.com/angular-in-depth/a-deep-deep-deep-deep-deep-dive-into-the-angular-compiler-5379171ffb7a)

[**Inside Ivy: Exploring the New Angular Compiler**  
_If you had fun with the “Deep, Deep, Deep” Dive into the Angular Compiler, just wait ‘till you get your hands on Ivy!_medium.com](https://medium.com/angular-in-depth/inside-ivy-exploring-the-new-angular-compiler-ebf85141cee1 "https://medium.com/angular-in-depth/inside-ivy-exploring-the-new-angular-compiler-ebf85141cee1")[](https://medium.com/angular-in-depth/inside-ivy-exploring-the-new-angular-compiler-ebf85141cee1)

### Webpack

Webpack is the most important tool we have, which was added after Angular 2 to avoid manual configuration using systemJS. And If you are wondering like below guy as you have never used it with Angular, let me tell you are using it from Angular 4 and still using it

![](https://cdn-images-1.medium.com/max/800/1*RvXCIUzuAXCXeNTFy0gL-Q.gif)

Ever wondered what happens when we run `ng serve`, `ng build` command?

```
"builder": "@angular-devkit/build-angular:browser"
"builder": "@angular-devkit/build-angular:dev-server"
```

Do above lines looks familiar to you?

![](https://cdn-images-1.medium.com/max/800/1*HN3xXbQPU5cP04qr5RRtcw.gif)

Yes, you are right they are in your `angular.json` inside build and serve.

But how are they related to webpack?

[**angular/angular-cli**  
_You can't perform that action at this time. You signed in with another tab or window. You signed out in another tab or…_github.com](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_angular/src/dev-server/index.ts "https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_angular/src/dev-server/index.ts")[](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/build_angular/src/dev-server/index.ts)

The above code is for dev-server if you notice line number 10–14, which is below code, they are coming for `build-webpack` which is implemented as part of @angular/devkit.

```
import {  DevServerBuildOutput,  WebpackLoggingCallback,  runWebpackDevServer,} from '@angular-devkit/build-webpack';
```

The below folder contains the entire source code for webpack inside @angular/devkit.

[**angular/angular-cli**  
_This package allows you to run Webpack and Webpack Dev Server using Architect. To use it on your Angular CLI app…_github.com](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_webpack "https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_webpack")[](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_webpack)

And if you have used webpack as a tool for Javascript, you must be wondering where is the config file as we need one for webpack. If you have an Angular Application created go to the below path.

```
node_modules\@angular\cli\models\webpack-config.js
```

Are you more comfortable directly using your own webpack config, or wants to add your config to existing configuration and want freedom?

![](https://cdn-images-1.medium.com/max/800/1*YrrQKDhGXLj3mjUEEjfDkQ.gif)

Angular got you covered, the builders can be extended there are many custom builders available.

[**Angular Custom Builders**  
angular-builders.dev](https://angular-builders.dev/home "https://angular-builders.dev/home")[](https://angular-builders.dev/home)

### Angular Schematics

If I have to describe Angular Schematics in one word its

![](https://cdn-images-1.medium.com/max/800/1*22YJ4jB01vVlhmQ5ut2ggQ.gif)

The Angular Schematics is what lets you create Components, modules, and services. Angular Schematics also lets you create your own schematics, or override the default options. Refer below blog post on how to create one by [Natalia Venditto](https://medium.com/u/175f90e7c76d)

[**Effective automated scaffolding with Angular Schematics**  
_Last evening I spoke at http://www.frontenddeveloperlove.com about Angular Schematics as a solution to avoid common…_medium.com](https://medium.com/angular-in-depth/effective-automated-scaffolding-with-angular-schematics-c61d6640b7d5 "https://medium.com/angular-in-depth/effective-automated-scaffolding-with-angular-schematics-c61d6640b7d5")[](https://medium.com/angular-in-depth/effective-automated-scaffolding-with-angular-schematics-c61d6640b7d5)

And if you are looking to override the default options without creating one refer to my blog post

[**Overriding Angular Schematics**  
_In this blog post, we will learn how we can override some default options in Angular Schematics._medium.com](https://medium.com/angular-in-depth/overriding-angular-schematics-322aeb11bfb0 "https://medium.com/angular-in-depth/overriding-angular-schematics-322aeb11bfb0")[](https://medium.com/angular-in-depth/overriding-angular-schematics-322aeb11bfb0)

### Angular Builders

This is what I feel about Builders 😍

![](https://cdn-images-1.medium.com/max/800/1*-3ZJVf0rzToeuRz3GC2bvA.gif)

Builders were exposed as public API with Angular 8 release. But we have been using them for long. you can read my blog post below to know more about builders.

[**Angular CLI Builders**  
_In this blog post, we will discuss Angular CLI Builders, in case you are following Angular, with version 8 Builders are…_indepth.dev](https://indepth.dev/angular-cli-builders/ "https://indepth.dev/angular-cli-builders/")[](https://indepth.dev/angular-cli-builders/)

### Angular CLI

This blog post would be incomplete if don’t mention the most important and widely loved tool Angular CLI.

Angular CLI lets us create an Application, build and deploy it and many more. There is already a lot written about CLI.

If you want to see the complete list of Angular CLI commands refer to the [official docs](https://angular.io/cli).

### Angular Language Service

Ever heard about it, not sure go to `package.json` and you will find the below package.

```
"@angular/language-service": "~8.2.4"
```

The package is required so the extension can work you in VSCode, you can install the extension from [here](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).

But wait there’s more! Have you ever wondered if we can get suggestions as you build properties, components, and directives? Install this today and it will improve your overall experience.

Do you love Webstorm like my friend [Alexander Poshtaruk](https://medium.com/u/ae97ac398bf9) it is also available for Webstorm and even Sublime, to install refer the [docs](https://angular.io/guide/language-service).

### Schematics Extension For IDE

You must be aware of several commands like `ng generate component/service/directive <name>`

I personally prefer using commands, but in case you don’t remember them “no problem.” There are tools available that have got you covered. Webstorm has built-in support for Schematics. For VSCode, refer to this [extension](https://marketplace.visualstudio.com/items?itemName=cyrilletuzi.angular-schematics).

### Augury

Augury is the best tool to debug your application, it also gives you a nice dependency graph for components and services. It is supported by Chrome and Firefox.

[**Angular Augury**  
_What is Augury Augury is the most used Developer Tool extension for debugging and profiling Angular applications inside…_augury.rangle.io](https://augury.rangle.io/ "https://augury.rangle.io/")[](https://augury.rangle.io/)

### Angular Tracer for View Updates

Augury is an awesome tool, apart from few functionalities which it misses,one fo them is to show real-time change detection on the browser, this is where the extension written by [Alexey Zuev](https://medium.com/u/d59a9e801370) comes handy and I totally love it. It supports Angular 4+.

[**Angular Tracer for View Updates**  
_Chrome extension that enables highlighting view updates in Angular applications built with ViewEngine(>=4.0.0 <9.0.0)_chrome.google.com](https://chrome.google.com/webstore/detail/angular-tracer-for-view-u/bdneljfoigfojeenmmgahnkjnkpbellg?hl=en "https://chrome.google.com/webstore/detail/angular-tracer-for-view-u/bdneljfoigfojeenmmgahnkjnkpbellg?hl=en")[](https://chrome.google.com/webstore/detail/angular-tracer-for-view-u/bdneljfoigfojeenmmgahnkjnkpbellg?hl=en)

### [N](https://ng-run.com/)g Run

Another tool created by [Alexey Zuev](https://medium.com/u/d59a9e801370) you may argue that StackBlitz looks a lot similar, but this tool but there are few features I totally love.

-   Ability to take a screenshot for your code.
-   Ability to run the test cases online.

[**ng-run**  
_Online angular editor for building demo._ng-run.com](https://ng-run.com/ "https://ng-run.com/")[](https://ng-run.com/)

### Integrated Development Environment (IDE)

You are free to use any IDE of your choice, the most widely used are VSCode, Webstorm. Even there are few online editors available like StackBlitz.

### Redux Dev Tools

If you are using any State management framework, this is a must-have tool for debugging. Used by NgRx, Akita and many more libraries.

[**Redux DevTools**  
_Redux DevTools for debugging application's state changes._chrome.google.com](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en "https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en")[](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

### Nx Dev Tools

Nx from [Nrwl.io](https://medium.com/u/2817fb68583) offers great tooling support for Angular as well as react applications. It comes with default support for Jest and Cypress and do check out [Angular Console](https://angularconsole.com/). The other advantage is when you want to use NestJS or ExpressJS as your backend, you can easily add the project and share the models between FrontEnd and BackEnd.

## Conclusion

A lot of developers ignore the tooling support in the Angular CLI. Angular is more than just a framework and offers great build tools that help with your application. It gives you the free ability to use Schematics and Builders along the way.

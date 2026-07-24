---
draft: false
title: 'Exploring NestJS Workspace'
description: 'Standard mode vs. monorepo mode'
author: Santosh Yadav
publishDate: 2020-01-03
preview: ../images/medium/exploring-nestjs-workspace.png
coverSVG: ../images/medium/exploring-nestjs-workspace.png
socialImage: ../images/medium/exploring-nestjs-workspace.png
canonicalUrl: https://medium.com/@santosh.yadav198613/exploring-nestjs-workspace-7d674ba3c86a
categories:
  - NestJS
tags:
  - NestJS
  - Node.js
  - TypeScript
---

![NestJS logo](https://cdn-images-1.medium.com/max/800/1*oTbTuBA4_RtKoXCsZ-ybKQ.png)

_NestJS logo_

In my [previous article](https://medium.com/p/a4e8b0b09db4), we saw why and how to use [NestJS](https://nestjs.com/), in this article, we will go through the NestJS workspace.

## NestJS Workspace

[NestJS](https://nestjs.com/) supports two modes:

-   Standard mode
-   Monorepo mode

### Standard mode

When we create a new application using `nest new <app-name>`, we are using standard mode. In standard mode, TypeScript’s `tsc` will be used as the compiler. Below is what our app looks like in standard mode.

![](https://cdn-images-1.medium.com/max/800/1*kROnicH3_HgHJl2OwlCEfg.jpeg)

### Monorepo mode

A monorepo mode is where we have more than one application, generally, it's one app and one library, we already have app, let’s add a library by using the below command. It will add a new library project.

```
nest generate lib shoppingLib
```

Now, as we are in monorepo mode, rather than `tsc`, [webpack](https://webpack.js.org/) will be used as a build tool. You can open the `nest-cli.json` and notice the below lines of code being added. `compilerOptions` has `webpack` value to true.

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "projects": {
    "shopping-lib": {
      "type": "library",
      "root": "libs/shopping-lib",
      "entryFile": "index",
      "sourceRoot": "libs/shopping-lib/src",
      "compilerOptions": {
        "tsConfigPath": "libs/shopping-lib/tsconfig.lib.json"
      }
    }
  },
  "compilerOptions": {
    "webpack": true
  }
}
```

And after adding a library, the app structure will look like below:

![monorepo](https://cdn-images-1.medium.com/max/800/1*qhHnElJA9ttiBr4SsPsdRw.jpeg)

_monorepo_

Let’s go through some important files:

-   `tsconfig.json`: The configuration file to be used while running `tsc` to transpile your files.
-   `nest-cli.json`: The Nest CLI config file has a list of projects when we are in monorepo mode, and defines which build tool we are using `webpack` in monorepo and by default it’s `tsc`.
-   `main.ts`: This is the entry file for our NestJS application and has a `bootstrap()` function to bootstrap our app. By default, the server runs on port 3000, you can change it and while using it in production, we can use an environment variable.
-   `app.module.ts`: This is our root module which has registered all modules, controllers, services.
-   `app.controller.ts`: Our application should have at least one controller defined and this is our default controller.
-   `app.service.ts`: We can have multiple services in our application. This is a sample service added as a part of the workspace, this is optional.
-   `Libraries`**:** Libraries can have reusable code like service, pipes, guards, or interceptors.

## Tool for a Full-Stack App With NestJS

If you are building a full-stack application with Angular/React.js and want to use NestJS as a back end, you should consider [Nx Dev Tools](https://nx.dev/angular/getting-started/what-is-nx) which provides a lot of features.

## Conclusion

We learned about the NestJS workspace and two modes that are available and how they differ, and how we can convert our workspace to monorepo mode.

We also saw different files, which are important, and why they are useful. In the next post, we will discuss controllers and how we can create and configure endpoints.

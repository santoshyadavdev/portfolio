---
draft: false
title: 'Getting Started with NestJS'
description: 'Why you should consider NestJS for your next project'
author: Santosh Yadav
publishDate: 2020-01-02
preview: ../images/medium/getting-started-with-nestjs.png
coverSVG: ../images/medium/getting-started-with-nestjs.png
socialImage: ../images/medium/getting-started-with-nestjs.png
canonicalUrl: https://medium.com/@santosh.yadav198613/getting-started-with-nestjs-a4e8b0b09db4
categories:
  - NestJS
tags:
  - NestJS
  - Node.js
  - TypeScript
  - Backend
---

![](https://cdn-images-1.medium.com/max/800/1*oTbTuBA4_RtKoXCsZ-ybKQ.png)

This is the first part of a series on the Node.js framework known as [NestJS](https://nestjs.com/). In this piece, we’ll see why and how to use NestJS.

## My Node.js Story

I’ve been using Express.js since 2017, and I love Express.js — it’s well designed, and we can plug in any JavaScript library and use it.

I was a .Net developer for a long time and work with Angular now. I do miss a few things while working with ExpressJS.

### Angular ecosystem vs. Node.js/Express.js ecosystem

-   **CLI:** Angular offers us a CLI to easily get started with a new project. Even in .Net, I can create an app using the CLI. Though there are many generators available, a CLI with ExpressJS would have been a great addition.
-   **Clean architecture:** ExpressJS doesn’t come with any clean architecture defined, and, of course, it's not the purpose of ExpressJS — as you’re free to define your own architecture. But for an enterprise application, I prefer something that has a clean and well-defined architecture.
-   **Code sharing:** For a big enterprise application, we may need to share the code across multiple apps or even APIs. In other programming languages, this can be achieved using libraries. In ExpressJS, we can to create an npm module and make it available via Artifactory.

## NestJS to the Rescue

[NestJS](https://nestjs.com) is a framework that’s written on top of ExpressJS, and it’s written in TypeScript. Let’s see some advantages:

-   **TypeScript support:** NestJS supports TypeScript, which makes me really comfortable as I’ve been using TypeScript for a long time while working with Angular. You have the option to choose JavaScript as well.
-   **Code sharing:** NestJS supports creating libraries and applications using the CLI. It becomes really easy to share the code and becomes a great choice for enterprise applications.
-   **monorepo support:** Angular supports monorepo, and starting with Version 6, NestJS comes with [monorepo](https://trilon.io/blog/announcing-nestjs-monorepos-and-new-commands) support.
-   **Learning path:** Another thing I like about NestJS is if you’re coming from a .Net or Java background and have an idea about creating APIs, NestJS is easy to learn. Also, if you’re an Angular developer, you’ll feel at home since it follows the same modular pattern.
-   **Fastify support:** NestJS uses ExpressJS as the default framework, but it also has support for Fastify and can be easily configured.

## Architecture

If I have to define the architecture of the API created using NestJS, this is how it looks like: We have a root module available, which will be used to configure database providers, to define the controller, to add middleware, to add the pipe and guards, and to provide services.

![](https://cdn-images-1.medium.com/max/800/1*a3Tny9DwSI90zsfQtBgJDQ.jpeg)

We can also have a module for each controller. We’ll see how to achieve that in upcoming pieces. Once our module receives a request, it’ll be redirected to the respective controller (which will handle the request). The service is optional, but we should try to use the service to follow the single responsibility principle (SRP).

## Installation

Now, we have an idea of why we should use NestJS. Let’s see how to use it.

-   Before we can start using NestJS, we need to install the NestJS CLI. Run the following command to install the CLI globally:

```
npm install -g @nestjs/cli
```

-   You can also download the [starter project](https://github.com/nestjs/typescript-starter) from GitHub and use it.

## Creating our First API

-   Once the CLI is installed, run the following command to create a new application called `shoppingAPI`. We’ll use the same API for our upcoming pieces.

```
nest new shoppingAPI
```

-   The CLI creates an app using Typescript as the default language. If you like JavaScript as the language, you can run the following command:

```
nest new shoppingAPI -l JS
```

## Running and Testing the API

Once a new project is created, we can use the following command to run the application.

```
cd shopping-API
npm start
```

The app is configured to run on port 3000 by default. Once one controller is already defined, visit [http://localhost:3000/,](http://localhost:3000/) and you’ll get `Hello World!` as a response.

We have created our first app using NestJS with minimum configuration. In the next piece, we’ll go through the app structure and will configure our own controller to handle HTTP requests.

## Conclusion

[NestJS](https://nestjs.com) is really easy to start with, and if you have already used .Net, Java, or even ExpressJS, most of the concepts are similar.

It offers a CLI, and by using it, we can easily scaffold our app and focus more on our code. For an enterprise application, it becomes really easy to split the code across multiple modules using NestJS modules.

Special thanks to [@MarkPieszak](https://medium.com/@MarkPieszak) for review.

---
draft: false
title: 'Scully, the Static Site Generator for Angular'
description: 'Scully is the first JAMstack SSG for Angular.'
author: Santosh Yadav
publishDate: 2020-01-05
preview: ../images/medium/scully-the-static-site-generator-for-angular.png
coverSVG: ../images/medium/scully-the-static-site-generator-for-angular.png
socialImage: ../images/medium/scully-the-static-site-generator-for-angular.png
canonicalUrl: https://medium.com/@santosh.yadav198613/scully-the-static-site-generator-for-angular-d0608cb028ae
categories:
  - Angular
tags:
  - Angular
  - Scully
  - JAMStack
  - Static Site Generator
---

![](https://cdn-images-1.medium.com/max/800/1*TeXxLb6ue4Il9D5nV_uWQg.png)

In this blog post, we are going to take a brief look into the First Static Site Generator for Angular. Introducing [Scully](https://github.com/scullyio/scully)**.**

![](https://cdn-images-1.medium.com/max/800/0*VTrRHWP06ZE70IFq.png)

> [**_AngularInDepth_**](https://medium.com/angular-in-depth) **_is moving away from Medium. More recent articles are hosted on the new platform_** [**_inDepth.dev_**](https://indepth.dev/angular/)**_. Thanks for being part of indepth movement!_**

## Introduction

A Static Site Generator is the best way to create blog posts or portfolios. We can quickly set up a blog and deploy it to any cloud provider like [Netlify](https://medium.com/u/5250f9d9bd2f). An important question is what does SSG do?

### JAMstack

JAMstack was introduced in 2017 and its popularity is growing every month. This is seen in the popularity of Gatsby. JAM stack websites offer:

-   We should be able to run entire websites without any server side code.
-   A website that can run on any static site provider like [Netlify](https://medium.com/u/5250f9d9bd2f).
-   Can render static pages with JavaScript disabled.

JAM is short for: JavaScript, APIs, and Markup. We use JavaScript to load data from APIs and combine it with markup or static files to render static web pages.

### SSG

Static Site Generators are playing an important role in the growing popularity of JAMstack. A Static Site Generator (SSG) is a tool that takes all resources and generates a Static Site.

In a static site, we don’t make any API call to get the data from the server, rather we put all the content on our pages as data and text and make it available to our end users, like blog posts or portfolios.

Now that we know about SSG, JAMstack and how they are related, let’s see the first Static Site Generator for Angular.

Other popular frameworks and libraries like Vue and React have had Static Site Generators like Gatsby and VuePress respectively for a long time. Angular was released in 2016, but did not have an SSG until now. Finally we have a Static Site Generator for Angular thanks to [HeroDevs](https://herodevs.com/) who develops and maintains Scully as an open source project.

## Scully, Angular’s First Static Site Generator

Let’s first see how Angular apps are built and deployed. I will not go into more detail about Angular as it is expected that you have prior knowledge.

![Figure 1. The Angular Build Process](https://cdn-images-1.medium.com/max/800/1*6cmBWTAcZwq6f1y8icOULA.jpeg)

_Figure 1. The Angular Build Process_

Figure 1 gives us an overview of how our Angular apps are compiled. Components, services, modules and static assets are processed by the Angular Build Process which compiles them. In the example in Figure 1, we have a blog module which is lazily loaded. We see index.html which is our main page.

### How Scully is different:

![Figure 2. The Scully Build Process](https://cdn-images-1.medium.com/max/800/1*ncRNR5-WDI_Ehxu_DeJ6_A.jpeg)

_Figure 2. The Scully Build Process_

In Scully, we add an extra build process after our Angular Build Process to process all the contents to create static pages. Figure 2 shows us that if we process the same example app using Scully, we get an additional index.html for the lazy loaded `blog` module.

### Let’s create our first blog post using Scully

-   Create a new Angular application using the command below. We need the first release of Angular Ivy which is included in Angular version 9. As it is currently in RC, we use `npx` to generate an Angular Ivy application.

```
npx -p @angular/cli@next ng new blogpostdemo
```

-   Once our app is created, we add Scully support using the command below. The command will add all configuration required to add Scully support

```
ng add @scullyio/init
```

Before we move ahead let’s discuss plugins. Plugins are very important when it comes to SSG. Take Gatsby as an example, it has many community-contributed plugins which help generate static sites. Scully is brand new and has 3 plugin types available with a few plugins of each type included with the library:

-   **Router:** Router plugins are used to discover the data which will be used to pre-render the pages.
-   **Render:** Render plugins are used to transform the HTML which will be rendered. An example is markdown that will be processed into a static HTML page.
-   **File Handler:** File handler plugins process static files, for example Markdown files.

### Adding blog post support

The beauty of Scully is you don’t have to use the above plugins and configure them manually. To add blog support run the below command.

```
ng g @scullyio/init:blog
```

It will add a new component, module and will add lazy load config to `app.module.ts` . It will also create an `.md` file inside the `blog` folder where we can add static content.

-   Open the `.md` file created inside `blog` folder, edit the content and save.

### Using Scully routes

Scully determines routes using router plugins. We can access these routes using a service provided by Scully. We don’t need to add any configuration manually. We can use the Scully routes service to render navigation menus.

-   For this demo, I am also using Angular Material which is optional.
-   I have created a new nav-bar component using Angular Schematics with the command below

```
ng generate @angular/material:nav main-nav
```

-   Delete the existing code in `app.component.html` and add

```
<app-main-nav></app-main-nav>
```

-   Move to `main-nav.component.ts` add the below code

```
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ScullyRoutesService } from '@scullyio/ng-lib';
@Component({
selector: 'app-main-nav',
templateUrl: './main-nav.component.html',
styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
map(result => result.matches),
shareReplay()
);
constructor(private breakpointObserver: BreakpointObserver, 
public routerService: ScullyRoutesService ) {}
}
```

-   The only code which is added to this file is the highlighted code the `**ScullyRoutesService**` gives us access to the list of the available routes.
-   In main-nav.component.html add the below code.

```
<mat-sidenav-container class="sidenav-container">
<mat-sidenav #drawer class="sidenav" fixedInViewport [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'" [mode]="(isHandset$ | async) ? 'over' : 'side'" [opened]="(isHandset$ | async) === false">
<mat-toolbar>Menu</mat-toolbar>
<mat-nav-list *ngFor="let route of routerService.available$ | async ">
<a mat-list-item [routerLink]="route.route">{{route.title}}</a>
</mat-nav-list>
</mat-sidenav>
<mat-sidenav-content>
<mat-toolbar color="primary">
<button type="button" aria-label="Toggle sidenav" mat-icon-button (click)="drawer.toggle()" *ngIf="isHandset$ | async">
<mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
</button>
<span>blogpostdemo</span>
</mat-toolbar>
<!-- Add Content Here -->
<router-outlet></router-outlet>
</mat-sidenav-content>
</mat-sidenav-container>
```

-   The highlighted code is changed which will create the routes once we run the Sully build process.

### What’s Next

You can add more posts to your existing app by using the below command

```
ng g @scullyio/init:post --name="<post-title>"
```

The above command will create a new `.md` file inside the `blog` folder.

### Creating Our Static Site

Now we have one more post created, you can run the build commands again, to verify if everything is fine. We are ready to run the Scully build process to create and run our first static site.

-   Run the commands below. The first command will generate output in `dist/blogpostdemo` and the second command will generate the `dist/static` folder

```
ng build --prod
npm run scully
```

To verify if everything is working fine run the below command to install `http-server`.

```
npm i -g http-server
```

Next, move to `dist/static` folder inside the command prompt and run the command below

```
http-server
```

This is how our website looks like after running it locally

![Static Site Using Scully](https://cdn-images-1.medium.com/max/800/1*yaJI_hXOrKQ563bbNwpiug.gif)

_Static Site Using Scully_

### Scully Config

When we do `ng add` schematics adds a config file `scully.config.js` it has several properties defined.

-   **projectRoot:** This property has the path of the app folder of the project default to `./src/app` . This property is mandatory.
-   **outFolder:** By default when we run the Scully build the output is generated in `dist/static` folder. If you want to change you can provide the property, it is optional.
-   **routes:** You can provide multiple routes to generate the Static Page.

### Some More Tips

-   By default all the `.md` files are created under the `blog` folder, if you want to create another folder you can run the below command.

```
ng g @scullyio/init:markdown --name=articles --slug=article
```

The command will generate a folder named `articles` and will add a new entry in `scully.config.js` .your routes will be changes to `/articles/<article-title>`

-   You can also change the default folder where static files will be generated. By default it’s `dist/static`. To override, open `scully.config.js` and add the property below

```
outFolder: './<output-path>'
```

### Adding More Plugins

Plugins are the most important part of SSG. Gatsby has more than 1500 plugins available. Scully is the first SSG for Angular and has 3 types of plugins available, but we need your help to create new plugins. If you want to contribute one, refer to the [docs](https://github.com/scullyio/scully/blob/master/docs/recommended-plugins.md) and submit one.

The Scully core team has started Office Hours as well so developers can ask them questions. It is scheduled every Tuesday at noon, MDT: [Scully Office Hours](https://meet.google.com/vcm-wekz-hsx)

Another big news, we will soon be able to fetch additional data at build time from our APIs and use TransferState to immediately provide all necessary data to run our full Angular application.

> [](https://twitter.com/aaronfrost/status/1212847715450642432)

## Conclusion

The popularity of Static Site Generators is growing over the year. It helps us create static sites, using all the assets and can even serve the pages with JavaScript disabled. It works faster when compared to websites where we need to make the API calls to get the data. Scully is the first SSG for Angular. It’s new so we need community support to add more plugins like we already have for other SSGs like VuePress and Gatsby. Finally, a Static Site Generator for Angular is the best gift the Angular community can get. A big thank you to [Aaron Frost](https://medium.com/u/1c80b4e8d30f) and his team at HeroDevs. They are the real heroes of the community.

The code used for this article is available on

[**santoshyadav198613/scully-demo**  
_This project was generated with Angular CLI version 9.0.0-rc.7. Run ng serve for a dev server. Navigate to…_github.com](https://github.com/santoshyadav198613/scully-demo "https://github.com/santoshyadav198613/scully-demo")[](https://github.com/santoshyadav198613/scully-demo)

and it is deployed on [https://agitated-swartz-d8a163.netlify.com](https://agitated-swartz-d8a163.netlify.com/blog/what-is-ivy)

If you would like to contribute here are a few links for your reference:

[**scullyio/scully**  
_The best way to build the fastest Angular apps. Scully is a static site generator for Angular projects looking to…_github.com](https://github.com/scullyio/scully "https://github.com/scullyio/scully")[](https://github.com/scullyio/scully)

[**scullyio/scully**  
_Scully is freaking awesome. Why? Because it can create static sites using Angular. In other words, Scully is a SSG…_github.com](https://github.com/scullyio/scully/blob/master/docs/scully.md "https://github.com/scullyio/scully/blob/master/docs/scully.md")[](https://github.com/scullyio/scully/blob/master/docs/scully.md)

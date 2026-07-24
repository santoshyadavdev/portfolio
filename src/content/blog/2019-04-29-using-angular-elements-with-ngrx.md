---
draft: false
title: 'Using Angular Elements with NgRx'
description: 'AngularInDepth is moving away from Medium. More recent articles are hosted on the new platform inDepth.dev. Thanks for being part of…'
author: Santosh Yadav
publishDate: 2019-04-29
preview: ../images/medium/using-angular-elements-with-ngrx.png
coverSVG: ../images/medium/using-angular-elements-with-ngrx.png
socialImage: ../images/medium/using-angular-elements-with-ngrx.png
canonicalUrl: https://medium.com/@santosh.yadav198613/using-angular-elements-with-ngrx-bc655e1eb212
categories:
  - Angular
tags:
  - Angular
  - Angular Elements
  - NgRx
  - Web Components
---

![](https://cdn-images-1.medium.com/max/800/0*JXdd4toCqn1NmVV3.png)

> [**_AngularInDepth_**](https://medium.com/angular-in-depth) **_is moving away from Medium. More recent articles are hosted on the new platform_** [**_inDepth.dev_**](https://indepth.dev/angular/)**_. Thanks for being part of indepth movement!_**

In this blog, Let’s walk through how to build a fully functional counter that is backed by NgRx and distributed across multiple angular elements. This will allow us to deploy our counter for use across multiple frameworks.

## Prerequisites

Basic knowledge of Angular and NgRx is expected for this blog.

Versions used:

1.  **Angular**: 7.2.x
2.  **NgRx**: 7.4.x

## Angular Elements

Angular Elements are simply Angular Components packaged as custom elements so it can work with any framework or library as an HTML tag.

Angular offers `createCustomElement()` API with `@angular/elements` package to convert the component to custom elements. You can read more on Angular [Elements](https://angular.io/guide/elements) on the Angular Docs.

## Background

We got the idea of this blog while working on one of the tasks on NgRx you can read more about it on [GitHub](https://github.com/ngrx/platform/issues/1621).

## About the Project

We are going to build an Angular library which we will utilize in an Angular App and one static HTML page. To achieve this we need 2 applications within our project, one to showcase how it works with Angular App, and second to build/generate a .js file which can be utilized in our static HTML file.

**Initial Project Setup**

First, create a new Angular Project using Angular CLI.

```
ng new ngRxElementDemo --createApplication=false
```

Now it is time to create the Angular Library and Angular Application as discussed. Use below commands to create the Library and Applications.

```
ng g lib my-counter
ng g application elementApp
ng g application counterelement
```

1.  `elementApp`will be used to showcase how we can use our Elements within an Angular Application.

2\. `counterelement`will be used to create a build which we can use later in the HTML page.

Once the installation is done, let’s add NgRx and Angular Elements as a dependency to our project with commands given below. We are also using Angular Material in our showcase application, but it is optional.

```
ng add @ngrx/store --project=my-counter
ng add @angular/elements
```

The only problem is `ng add @angular/elements` makes changes to default project, in this case, elementApp. You have to copy the changes to counterelement as well. There is an issue logged on [Angular](https://github.com/angular/angular/issues/24813).

You will notice below property included inside scripts section of `elementApp` inside `angular.json`, copy and paste the same to the scripts section of `counterelement`

```
"scripts": [
{"input": "node_modules/document-register-element/build/document-register-element.js"}
]
```

**Time to Create the Library**

Run the commands below to create new components, modules and we will also create action and reducer. We will see the complete implementation of increment-counter here.

```
ng g module counter --project=my-counter
ng g c counter --project=my-counter --flat=true
ng g c counter-increment --project=my-counter
ng g c counter-decrement --project=my-counter
ng g c counter-reset --project=my-counter
```

In this post, we are going to use the same example mentioned on [NgRx.io](https://ngrx.io/guide/store#tutorial), add the counter and reducer code into your lib folder.

Now let’s add the code in our component. Every component will inject the Store to access or update the counter. All components are standard angular components, no changes here.

Add the below code in counter.component.ts :

```typescript
import { Component, OnInit, Injector } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: '<div>Current Count: {{ count$ | async }}</div>',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  count$ = this.store.pipe(select('count'));

  constructor(private store: Store<{ count: number }>) {
  }

  ngOnInit() {
  }
}
```

Now make the changes to the counter-increment.component.ts and counter-increment.component.html files.

```typescript
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Increment} from '../counter.actions';

@Component({
  selector: 'app-counter-increment',
  templateUrl: './counter-increment.component.html',
  styleUrls: ['./counter-increment.component.css']
})
export class CounterIncrementComponent implements OnInit {

  constructor(private store: Store<{ count: number }>) { }

  ngOnInit() {
  }

  increment() {
    this.store.dispatch(new Increment());
  }

}
```

```html
<button mat-raised-button color="primary" (click)="increment()">Increment</button>
```

There is nothing new in the above code if you know the basics of NgRx, we are dispatching the `Increment` action here, which will update the counter.

Now we need to make changes to the`counter.module.ts` file

```typescript
import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CounterComponent } from './counter.component';
import { CounterIncrementComponent } from './counter-increment/counter-increment.component';
import { CounterDecrementComponent } from './counter-decrement/counter-decrement.component';
import { CounterResetComponent } from './counter-reset/counter-reset.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [CounterComponent, CounterIncrementComponent,
    CounterDecrementComponent, CounterResetComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    StoreModule.forRoot({ count: counterReducer })
  ],
  entryComponents: [CounterComponent,
    CounterIncrementComponent,
    CounterDecrementComponent,
    CounterResetComponent]
})
export class CounterModule {
    constructor(private injector: Injector ) {
      const CounterElement = createCustomElement(CounterComponent, { injector });
      // Register the custom element with the browser.
      customElements.define('counter-element', CounterElement);

      const CounterIncrementElement = createCustomElement(CounterIncrementComponent, { injector });
      customElements.define('counter-increment', CounterIncrementElement);
      const CounterDecrementElement = createCustomElement(CounterDecrementComponent, { injector });
      customElements.define('counter-decrement', CounterDecrementElement);
      const CounterResetElement = createCustomElement(CounterResetComponent, { injector });
      customElements.define('counter-reset', CounterResetElement);
    }

}
```

In the above code, you may notice some difference from a typical Angular Module.

1.  We have included each of our components in the`entryComponents` array, because they are required to be loaded as Angular Elements.
2.  Usage of `createCustomElement` , we have used this API to register the Angular Component as Angular Elements. Where the first parameter is the component and the second parameter is the injector instance.

After making all these changes, make sure to add below code to public-api.ts file available in the library:

```typescript
/*
 * Public API Surface of my-counter
 */

export * from './lib/counter.actions';
export * from './lib/counter.component';
export * from './lib/counter.module';
export * from './lib/counter.reducer';
export * from './lib/counter-decrement/counter-decrement.component';
export * from './lib/counter-increment/counter-increment.component';
export * from './lib/counter-reset/counter-reset.component';
```

Now it is time to build and check the library, to make sure the library gets compiled use below command:

```
ng build my-counter
```

### Making changes to Angular App

First, we will make our Angular Element work with the Angular Application which is in our case is `elementApp`

1.  Changes to `app.module.ts`

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterModule } from 'my-counter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CounterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

So let’s see what we have done differently here:

1.  `import { CounterModule } from 'my-counter'` Here we have imported the module from our library so we can utilize the functionalities provided, and added the same to `imports` array.
2.  `schemas: [CUSTOM_ELEMENTS_SCHEMA]` This is required so we can use Custom elements within our app.

Add the below lines of code to include the Custom Elements in our `app.component.html`

```html
<counter-increment></counter-increment>
<counter-element></counter-element>
<counter-decrement></counter-decrement>
<counter-reset></counter-reset>
```

Before we can build and run our app, we have to include one polyfill to our application, go ahead and run the below command from the root of the project:

```
npm i @webcomponents/webcomponentsjs -save
```

Once installed add below import to `polyfills.ts,` you can read more about this [polyfill](https://github.com/webcomponents/webcomponentsjs). The below line of code is also required in other apps, please add the same import to `polyfills.ts` inside`counterelement` app as well.

```
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
```

Time to run our app to see the changes in action now, run the below command which will build our application and run the application on port 4200:

```
ng build my-counter && ng serve — project=elementApp -o
```

![Application using Angular Elements](https://cdn-images-1.medium.com/max/800/1*-2qLETUCg0Buhuchc1cbHg.jpeg)

_Application using Angular Elements_

### Making changes to run Custom Elements in a static page

Now we will learn, how to create the build and use the Angular Elements inside a static HTML page.

1.  Changes to `app.module.ts` in `customelelment` Application.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CounterModule } from 'my-counter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CounterModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

  ngDoBootstrap() {
  }
 }
```

Let’s see what we have done differently here:

1.  We have removed the `AppComponent` from the bootstrap array, as we want to bootstrap the app manually, notice `ngDoBootstrap` being called here.

### Creating `counter-element.js`

Time to create the .js file which can be used outside an Angular App.

1.  Install the packages which will help us to create the build, the jscat package will help us to concatenate the multiple files and create the output file, which will be our counter-element.js file.

```
npm install jscat --save-dev
```

2\. Add the below command in package.json

```
"build-element": "ng build my-counter && ng build --project=counterelement --prod --output-hashing=none",
"package": "jscat ./dist/counterelement/runtime.js ./dist/counterelement/polyfills.js ./dist/counterelement/scripts.js ./dist/counterelement/main.js > htmlapp/counter-element.js",
```

Run the first command `npm run build-element` to create a build, you will notice a new `dist/counterelement` folder.

**3**. Create a folder `htmlapp` in the root directory, add the `index.html` file in the folder and add below code.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="counter-element.js"></script>
  <title>Angular Elements</title>
</head>

<body>
  <counter-increment></counter-increment>
  <counter-element></counter-element>
  <counter-decrement></counter-decrement>
  <counter-reset></counter-reset>
</body>

</html>
```

**4\.** Run the `npm run package` it will create a new file named `counter-element.js` inside this newly created `htmlapp` folder.

5\. make sure you have `http-server` npm package installed globally, run the below command from the inside `htmapp` folder

```
http-server
```

This command will start a local server on port 8081.

![Http server in action](https://cdn-images-1.medium.com/max/800/1*NEjHS5Txv7HpqSRZ7ua6Vg.png)

_Http server in action_

Now move to [http://localhost:8081/](http://localhost:8081/) to see Angular Elements in action with a static page.

### Source Code Repository:

You can download the entire code from:

[https://github.com/santoshyadav198613/ngRxElementDemo](https://github.com/santoshyadav198613/ngRxElementDemo)

## Conclusion

There is no difference in using NgRx state management with Angular Elements, you can easily use the same code which you may have written, convert them to Angular Elements and still utilize the NgRx state management functionality within an Angular App or any with any other framework or library.

Special thanks to [Tim Deschryver](https://medium.com/u/802a7996f6b6) [Wes Grimes](https://medium.com/u/9af1d23366c8) [Alex Okrushko](https://medium.com/u/f7828ad40c7c) [Brandon Roberts](https://medium.com/u/637b8a3ce256) for feedback.

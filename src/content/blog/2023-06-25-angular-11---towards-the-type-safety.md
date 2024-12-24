---
title: Angular 11 - Towards the Type Safety
description: "Angular 11 is released, and it was focused on improving the type safety of APIs and fixing the issues. Let's go through the changes introduced in this version."
date: 2020-11-12T21:40:59.614Z
preview: ../images/Angular/Angular-11.png
coverSVG: ../images/Angular/Angular-11.png
socialImage: ../images/Angular/Angular-11.png
draft: false
tags: ['Angular', 'Angular 11']
categories: ['Angular']
publishDate: 2020-11-12T21:40:59.615Z
canonicalUrl: https://indepth.dev/posts/1388/angular-11-towards-type-safety
author: Santosh Yadav
---

Angular 11 is released, and it was focused on improving the type safety of APIs and fixing the issues. Let's go through the changes introduced in this version.

## Angular

### New Features

### Support Lazy Loading with Named Outlets

Till now named outlets always supported the component, there was no way to lazy load the module using named outlet, you can use it now, you can refer an sample on [GitHub](https://github.com/santoshyadavdev/Angular11-demo)

```typescript
 {
        path: '',
        outlet: 'contactus',
        loadChildren: () => import('./contactus/contactus.module').then(m => m.ContactusModule)
}
```

### Webpack 5 Support

Yes you can use webpack 5 with Angular 11, but there are 2 things you need to keep in mind:

- This can be used if you are using yarn

- Webpack 5 support is still experimental, so not suggested for production

To use webpack 5 add the below code in `package.json` and call `yarn install`.

```json
"resolutions": {
    "webpack": "^5.0.0"
}
```

To check the status of Webpack 5 support follow the [GitHub issue](https://github.com/angular/angular-cli/pull/18873)

### Deprecations and Breaking Changes

### Router

Earlier while using [RouteReuseStrategy#shouldReuseRoute](https://angular.io/api/router/RouteReuseStrategy#shouldReuseRoute) method, there was an issue of future and next routes being swapped for child routes, this is fixed now, but if you are already using it in your code, you many need to adjust your code.

### Pipes

- Slice pipe now return null for the undefined input value.

- The typing for `date` and `number` pipe is fixed, they used to take `any` type as input earlier.

- `DatePipe` will round off the millisecond part in datetime provided to nearest millisecond.

- `async` pipe will no longer return null as a value for an undefined input, if you are checking the value to be undefined explicitly in template change to null.

- Case conversion pipes like `lowercase` used to accept falsy values "0, false" you will get an exception now.

### Browser Support

The support for IE 9, 10, and IE mobile is removed, they were deprecated in Angular 10 release.

### Forms

- Improved typing for validators and asyncValidators earlier they used to take `any` type

![Forms](https://images.indepth.dev/images/2020/11/image-4.png)

### Angular Universal

In angular 10 we received an feature to use absoluteUrl while working with SSR, [https://indepth.dev/angular-10-towards-the-better-future-for-angular#ssr-](https://indepth.dev/angular-10-towards-the-better-future-for-angular#ssr-)

In this release another you have to set the `baseUrl` parameter if you are using `useAbsoluteUrl` , `baseUrl` will override the `protocol`, `hostname`, and `port` .

### CollectionChangeRecord is deprecated

If you are using [CollectionChangeRecord](https://angular.io/api/core/CollectionChangeRecord) start using [IterableChangeRecord](https://angular.io/api/core/IterableChangeRecord) as earlier it is deprecated now.

### Typescript 3.9

Angular 11 will support Typescript 4.0, support for 3.9 version is dropped.

### Unit Test

Earlier calling `TestBed.overrideProvider` after TestBed initialization had no effect, but unlike other override methods, you don't used to get the exception, now you will get exception if you try to do this.

## Angular CLI

### New Features

### Generator for Resolvers

Now you can generate a resolve guard using CLI , use the below command to do the same.

```bash
ng g r/resolver <name>
```

### Feature to Extract i18n tokens from library

Starting Angular 11 you can extract the i18n tokens from angular libraries too, use the below command with library.

```bash
ng xi18n --ivy
```

### Prompt for Strict Mode

Angular 10 had an flag `--strict` to generate the angular application with all strict check enabled, now you will get a prompt to check if you want to enable it like below image, one change is earlier, there was an extra `package.json` which was created inside `app` folder, it wont be created anymore, as it was causing the confusion among the community members.

![Strict Mode](https://images.indepth.dev/images/2020/11/image-5.png)

### Generate E2E test with async/wait

It's possible is to use async/await for async task while writing the e2e test cases, SELENIUM_PROMISE_MANAGER was used earlier with protractor to handle the async scenarios, CLI will not generate the protractor config with SELENIUM_PROMISE_MANAGER anymore.

### Inline Google Fonts and Icons

Google Fonts and Icon will be converted to inline in index.html, when you set below flag in your `angular.json` under `build` option. This is enabled by default for production configuration. If you want to use this functionality, you have to make sure the internet connection is available during build, keep this in mind, if you are running your build on CI.

```json
"configurations": {
  "optimization": true
}
```

You can disable this optimisation by changing the flag to below snippets

```json
"configurations": {
  "optimization": {
    "fonts": false
  }
}

OR

"configurations": {
  "optimization": {
    "fonts": {
      "inline": false
    }
  }
}
```

### HMR (Hot Module Reload)

Yes the most wanted feature, is finally here, it was broken for a long time and now you can use it, use the below command to utilize the HMR. You can read more about what HMR offers in webpack [docs](https://webpack.js.org/guides/hot-module-replacement/)

```bash
ng serve --hmr
```

![HMR](https://images.indepth.dev/images/2020/11/image.png)

### Formatted Build Output

The final output description generate will be shown in table format like below

![Build Output](https://images.indepth.dev/images/2020/11/image-1.png)

### Angular Component

### New Features

### CDK

- For testing allow dispatching an custom event, which can not be simulate like change and input. You can use `dispatchEvent` method to test such events.

- For `TestElement` we have an option to dispatch `rightClick` event, useful in cases where you have context menu, which opens up on right click.

- `getNativeElement` is available to work with harness environment.

- `manualChangeDetection` api is added to disable auto change detection, useful in cases where you have some async code to run before calling change detection.

```typescript
await manualChangeDetection(async () => {
    await buttonHarness.click();
    fixture.detectChanges();
    // Check expectations while async click operation is in progress.
    expect(isProgressSpinnerVisible()).toBe(true);
    await fixture.whenStable();
    // Check expectations after async click operation complete.
    expect(isProgressSpinnerVisible()).toBe(false);
  });
```

- `selectOptions` api is available to selection options inside a native select in harness environment.

### Material

- Theming support for stepper control.

- viewChanged event available when datepicker changes the view, for example monthView, yearView.

- `MAT_TABS_CONFIG` supports `dynamicHeight` property if you want tab group to grow to the size of active tab, this was available as a property of  MatTabGroup, now you can set it for all tabs in your application. An example with existing config is available on [StackBlitz](https://stackblitz.com/angular/rxqyoejxdrb?file=src%2Fapp%2Ftab-group-dynamic-height-example.html).

- For Tree control there is a new method `getTreeStructure` for test harness.

- Test harness is available for MatTree.

### Deprecations and Breaking Changes

- matSnackBarHarness.getRole() replaced with .getAriaLive()

### ESLint Migration

There was a plan to migrate from TSLint to ESLint, but there is already `angular-eslint` builder which exist, and you can use the same, and in future Angular team may provide an command similar to `ng deploy` to integrate any ESLint builder.

You can refer the `angular-eslint` on [GitHub](https://github.com/angular-eslint/angular-eslint) to see how to migrate, team is also working on schematics to automatically migrate you to the next version.

## Conclusion

This release was more focused on improving the type safety as well as reducing the backlogs, which was major pain for the community. HMR is going to be a great help for during the build process, and improving the types of all pipes will avoid the error at runtime. One thing which I want to see in Next version is Type Safe Forms, which is in progress and will be breaking change.

You can see the updated roadmap [here](https://angular.io/guide/roadmap).

Shout out to my GitHub Sponsors for supporting my work on Open Source.

- [CodeRabbit](https://www.coderabbit.ai/)
- [Cometa.rocks](https://github.com/cometa-rocks/)
- [Umair](https://twitter.com/_UmairHafeez_)
- [Anand](https://twitter.com/AnandChowdhary)
- [Sunil](https://twitter.com/sunil_designer)
- [Darshan](https://twitter.com/dr5hn)
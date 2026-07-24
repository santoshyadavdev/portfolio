---
draft: false
title: 'Angular CLI Builders'
description: 'In this blog post, we will discuss Angular CLI Builders, in case you are following Angular, with version 8 Builders are talked about a lot…'
author: Santosh Yadav
publishDate: 2019-08-06
preview: ../images/medium/angular-cli-builders.png
coverSVG: ../images/medium/angular-cli-builders.png
socialImage: ../images/medium/angular-cli-builders.png
canonicalUrl: https://medium.com/@santosh.yadav198613/angular-cli-builder-26f0981fb7f3
categories:
  - Angular
tags:
  - Angular
  - Angular CLI
  - Builders
---

![](https://cdn-images-1.medium.com/max/800/1*QjRjMZuyZosOPrNoAPL68g.png)

![](https://cdn-images-1.medium.com/max/800/0*w8EDYTrjceYY5DLu.png)

> [**_AngularInDepth_**](https://medium.com/angular-in-depth) **_is moving away from Medium. More recent articles are hosted on the new platform_** [**_inDepth.dev_**](https://indepth.dev/angular/)**_. Thanks for being part of indepth movement!_**

In this blog post, we will discuss Angular CLI Builders, in case you are following Angular, with version 8 Builders are talked about a lot. So let’s see how we can use the Builders API.

> I will be speaking at [Ng Srilanka](https://ng-srilanka.com/) this year, and we are looking for sponsors if you are an organization or your organization wants to sponsor some community-driven conference please get in touch with the organizers.

## Introduction

Builders API is released with Angular 8, and it offers a functionality where you can override commands as `ng build`,`ng test` and `ng lint` . Not to be confused with Angular Schematics here, by using which you can add your own commands for `ng generate` commands or provide support for `ng add` .

## History

Prior to Angular 8, the only way to override the build process was to extract the default webpack config provided by Angular and adding your code. I know like me, you might have hated this overhead, and after ejecting you can not use CLI commands as it used to be replaced with other commands.’

Below is the snippet from `.angular-cli.json` which was used prior to Angular 6, you can notice it simply takes a config file and build `serve` and `build` the section is not even available.

```json
 "e2e": {
    "protractor": {
      "config": "./protractor.conf.js"
    }
  },
  "lint": [
    {
      "project": "src/tsconfig.app.json",
      "exclude": "**/node_modules/**"
    },
    {
      "project": "src/tsconfig.spec.json",
      "exclude": "**/node_modules/**"
    },
    {
      "project": "e2e/tsconfig.e2e.json",
      "exclude": "**/node_modules/**"
    }
  ],
  "test": {
    "karma": {
      "config": "./karma.conf.js"
    }
  },
```

And let's see the snippet for the same in the Angular 8 project. For visibility, I have removed other sections, but you can notice now all commands have an option called `builder` where there are pre-defined builders from angular and you can easily override by providing your own builder.

```json
"architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            ],
            "styles": [
            ],
            "scripts": []
          },
          "configurations": {
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "ecommerceapp:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "ecommerceapp:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "ecommerceapp:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": [
            ],
            "styles": [
            ],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        },
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "ecommerceapp:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "ecommerceapp:serve:production"
            }
          }
        }
      }
    }
```

## CLI builders API

With Angular 8 release the CLI Builders API was made public, and with Builders being a public API, it opened a lot of possibilities for Angular lovers.

With CLI builders it has become easy to create and use your own builders without ejecting the webpack config. Even it is not possible to `ng eject` command anymore.

Let’s create our own builder to see how it works and how you can create your own.

There are already many custom builders which are available before you create your own check [Angular Builder](https://angular-builders.dev/home)s to see if one already exists

### Creating a Builders API Project:

To create a new builders project you can use the sample project provided on [Angular Docs](https://github.com/mgechev/cli-builders-demo).

Before we can write our own builder let’s take a look at the API.

1.  BuilderContext
2.  BuilderOutput
3.  createBuilder

**BuilderContext**

Let's see the useful methods and properties provided:

-   **reportStatus:** Use `reportStatus` method to report status on running tasks to the command prompt.
-   **logger:** logger provides methods like log, debug, info, warn, error and fatal for logging purpose.
-   **scheduleTarget:** this method lets us schedule other tasks with provided config, a simple example is running build task as part of your own task.

**createBuilder**

This is the entry point into the builder, it can return `Promise` or `Observable` of type `BuilderOutput`

**BuilderOutput**

BuilderOutput can return below values:

-   **error:** error to be sent to the application, this is optional value
-   **info:** this is returns \[key, value\] pair and optional.
-   **success:** can return true/false value and is required.
-   **target:** it can return `configuration` `project` and `target` .

For example, let’s modify the existing sample code and add a task to **build** and run the **test** together with the new custom builder.

1.  Replace the code in downloaded repository `index.ts` file with below code:

```typescript
import { BuilderOutput, createBuilder, BuilderContext } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
  command: string;
  args: string[];
  configuration: string;
}

export default createBuilder<Options>(
  async (options: Options, context: BuilderContext): Promise<BuilderOutput> => {

    context.reportStatus(`Executing "${options.command}"...`);

    const configuration = options.configuration ? options.configuration : 'production';

    const build = await context.scheduleTarget({
      target: 'build',
      project: context.target !== undefined ? context.target.project : '',
      configuration
    });

    const test = await context.scheduleTarget({
      target: 'test',
      project: context.target !== undefined ? context.target.project : ''
    });

    let buildResult = await build.result && await test.result;

    return { success: buildResult.success };

  });
```

2\. To test the builder locally run the below command `npm run build`

3\. Run `npm link` to link the package locally

4\. Create a new Angular Application using CLI

5\. run `npm link @example/command-runner` you can change the package name as per your package name mentioned in builder’s `package.json`

6\. Add below configuration to `angular.json`

```
"[your-command]": {
  "builder": "@example/command-runner:command",
  "options": {
    "command": "[your-command]",
    "args": [
      "src/main.ts"
    ]
  }
}
```

7\. To test the builder run`ng run [project-name]: [your-command]` or `ng deploy` if your command is `deploy`this is available after Angular CLI 8.3.0.

You can also publish this on npm to use it across multiple applications.

## Conclusion

The use case for builders API is a lot bigger there are many custom builders that are already available. The custom builder to `deploy` became so popular that the CLI team decided to make `ng deploy` command available.

If you love [Netlify](https://medium.com/u/5250f9d9bd2f) here is and Custom Builder to deploy the application from CLI [https://github.com/ngx-builders/netlify-builder](https://github.com/ngx-builders/netlify-builder)

Both projects are open source, so contributions are welcome.

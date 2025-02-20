---
title: "Link Personal GitHub Account to Organization's Docker Account"
description: "Recently I came across an issue Unable to find image locally when using docker and wanted to document the solution for myself"
date: 2025-02-20T19:20:38.848Z
preview: ../images/docker/docker-banner.png
coverSVG: ../images/docker/docker-banner.png
socialImage: ../images/docker/docker-banner.png
draft: false
tags: ["docker","github"]
categories: ["docker"]
publishDate: 2025-02-20T19:20:38.848Z
keywords:
    -  Unable to find image locally when using docker 
author: "Santosh Yadav"
---

Recently I installed docker on my work machine, as I had to verify some changes related to our documentation on my local machine.

Everything went well until I wanted to execute a docker command which had to download an image from our GitHub package, as we use [GitHub Packages](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages) to publish our docker images.

When I tried to run my docker command below I started getting an error `Unable to find image 'ghcr.io/org/dockerimage:latest' locally`

```shell
docker run -it --rm -v .:/app -p 3000:3000 ghcr.io/org/dockerimage:latest

Unable to find image 'ghcr.io/org/dockerimage:latest' locally
docker: Error response from daemon: Head "https://ghcr.io/v2/org/dockerimage/manifests/latest": unauthorized.
See 'docker run --help'.
```

### What went wrong? 

I use my personal GitHub account at my work, so I understood that docker is not able to connect to my GitHub account as I am using SSO to login and not my GitHub account for docker.

### Solution 

I searched across and there was limited help, I found that I need to authinticate my GitHub account from docker and ended un finding `docker login` commmand.

But I was already authenticated with My org account.

Then I tried using `docker login ghcr.io -u <my-github-username>` and this command asked me to enter my password, but I ended up getting denied error and nothing happened.

Next try was to use PAT(Personal Access Token) I created a new PAT with below rights

- write:packages
- read:packages

And ran `docker login ghcr.io -u <my-github-username>` but this time I entered my PAT and thats it, it worked.



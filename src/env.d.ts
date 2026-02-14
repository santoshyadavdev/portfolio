/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
  readonly PUBLIC_UMAMI_WEBSITE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "hero-patterns";
declare module "photoswipe-dynamic-caption-plugin";

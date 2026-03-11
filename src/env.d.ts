/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
  readonly YOUTUBE_API_KEY?: string;
  readonly PUBLIC_UMAMI_WEBSITE_ID?: string;
  readonly AUTOSEND_API_KEY?: string;
  readonly AUTOSEND_FROM_EMAIL?: string;
  readonly CONTACT_EMAIL?: string;
  readonly TURNSTILE_SECRET_KEY?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cloudflare Turnstile global
interface Turnstile {
  reset: (widgetId?: string) => void;
  render: (container: string | HTMLElement, options: object) => string;
  getResponse: (widgetId?: string) => string | undefined;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

declare module "hero-patterns";
declare module "photoswipe-dynamic-caption-plugin";

import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import alpinejs from "@astrojs/alpinejs";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./remark-plugins/remark-reading-time.mjs";
import cloudflare from "@astrojs/cloudflare";
import expressiveCode from "astro-expressive-code";

export default defineConfig({
  adapter: cloudflare({
    prerenderEnvironment: "node",
    routes: {
      strategy: "auto",
    },
  }),
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "node-native-modules",
        enforce: "pre",
        resolveId(id) {
          if (id === "@resvg/resvg-js" || id.startsWith("@resvg/resvg-js-")) {
            return "\0resvg-stub";
          }
        },
        load(id) {
          if (id === "\0resvg-stub") {
            // Provide a no-op stub for the Cloudflare Workers bundle.
            // OG images are pre-rendered at build time in the Node.js context,
            // so the actual @resvg/resvg-js is not needed in the server bundle.
            return `
              class Resvg {
                constructor() {}
                render() { return { asPng: () => new Uint8Array() }; }
              }
              export { Resvg };
              export const renderAsync = async () => {};
              export const render = () => {};
            `;
          }
          if (id.endsWith(".node")) {
            return "module.exports = {};";
          }
        },
      },
    ],
    ssr: {
      external: ["svgo", "@resvg/resvg-js"],
    },
    build: {
      rollupOptions: {
        external: [/\.node$/],
      },
    },
  },
  site: "https://santoshyadav.dev",
  base: "/",
  integrations: [
    sitemap({
      filter: (page) => {
        const externalCanonicalSlugs = [
          "2023-06-24-how-github-is-improving-developer-experience",
          "2023-06-25-angular-11---towards-the-type-safety",
          "2023-06-25-why-and-how-we-migrated-to-nx-from-angular-cli",
          "2023-07-02-angular-10---towards-the-better-future-for-angular",
          "angular-the-framework-of-past-present-and-future",
        ];
        if (
          externalCanonicalSlugs.some((slug) => page.includes(`/blog/${slug}`))
        ) {
          return false;
        }
        if (page.includes("/tag/") || page.includes("/category/")) {
          return false;
        }
        return true;
      },
    }),
    expressiveCode({
      themes: ["github-light", "github-dark"],
      styleOverrides: {
        codeFontFamily: "inherit",
      },
    }),
    mdx(),
    alpinejs(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
    ],
  },
});

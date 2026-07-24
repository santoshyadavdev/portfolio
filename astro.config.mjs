import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import alpinejs from "@astrojs/alpinejs";
import robotsTxt from "astro-robots-txt";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkPlantUML from "@akebifiky/remark-simple-plantuml";
import { remarkReadingTime } from "./remark-plugins/remark-reading-time.mjs";
import { remarkDiagram } from "./remark-plugins/remark-diagram.mjs";
import cloudflare from "@astrojs/cloudflare";
import expressiveCode from "astro-expressive-code";
import partytown from "@astrojs/partytown";

// https://astro.build/config
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
      noExternal: ["swiper", "leaflet"],
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
        // Exclude blog posts that have an external canonical URL
        const externalCanonicalSlugs = [
          "2023-06-24-how-github-is-improving-developer-experience",
          "2023-06-25-angular-11---towards-the-type-safety",
          "2023-06-25-why-and-how-we-migrated-to-nx-from-angular-cli",
          "2023-07-02-angular-10---towards-the-better-future-for-angular",
          "angular-the-framework-of-past-present-and-future",
        ];
        if (externalCanonicalSlugs.some((slug) => page.includes(`/blog/${slug}`))) {
          return false;
        }
        // Exclude noindex pages (tag, category, author listings)
        if (
          page.includes("/tag/") ||
          page.includes("/category/") ||
          page.includes("/author/")
        ) {
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
    robotsTxt(),
    partytown(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [
      remarkReadingTime,
      remarkMath,
      remarkPlantUML,
      remarkDiagram,
    ],
    rehypePlugins: [rehypeKatex],
  },
});

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
  site: "https://www.santoshyadav.dev",
  base: "/",
  integrations: [
    sitemap(),
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
    shikiConfig: {
      theme: "github-light",
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
});

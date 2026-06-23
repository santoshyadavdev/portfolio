import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
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
  adapter: cloudflare({ prerenderEnvironment: "node" }),
  vite: {
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
    tailwind(),
    sitemap(),
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
    processor: unified({
      remarkPlugins: [
        remarkReadingTime,
        remarkMath,
        remarkPlantUML,
        remarkDiagram,
      ],
      rehypePlugins: [rehypeKatex],
    }),
  },
});

import { defineConfig } from "astro/config";
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
  adapter: cloudflare(),
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
    sitemap({
      filter: (page) => {
        // Exclude blog posts that have an external canonical URL
        // (they point to dev.to/indepth.dev and will never be indexed here)
        const externalCanonicalSlugs = [
          "2023-06-24-how-github-is-improving-developer-experience",
          "2023-06-25-angular-11---towards-the-type-safety",
          "2023-06-25-why-and-how-we-migrated-to-nx-from-angular-cli",
          "2023-07-02-angular-10---towards-the-better-future-for-angular",
          "angular-the-framework-of-past-present-and-future",
        ];
        return !externalCanonicalSlugs.some((slug) =>
          page.includes(`/blog/${slug}`)
        );
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
    extendDefaultPlugins: true,
    remarkPlugins: [
      remarkReadingTime,
      remarkMath,
      remarkPlantUML,
      remarkDiagram,
    ],
    rehypePlugins: [rehypeKatex],
  },
});

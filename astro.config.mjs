import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import image from '@astrojs/image'
import mdx from '@astrojs/mdx'
import alpinejs from '@astrojs/alpinejs'
import robotsTxt from 'astro-robots-txt'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkPlantUML from '@akebifiky/remark-simple-plantuml'
import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs'
import { remarkDiagram } from './remark-plugins/remark-diagram.mjs'

import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ['svgo'],
      noExternal: ['swiper', 'leaflet'],
    },
  },
  site: 'https://santoshyadav.dev',
  base: '/',
  integrations: [
    tailwind(),
    sitemap(),
    image(),
    mdx(),
    alpinejs(),
    robotsTxt(),
    partytown(),
  ],
  experimental: {},
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      remarkReadingTime,
      remarkMath,
      remarkPlantUML,
      remarkDiagram,
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-light',
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
})

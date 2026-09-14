# Portfolio antislop redesign, September 2026

Full-site pass that removed the AI-generated look from santoshyadav.dev, replaced it with
an editorial neutral system, and fixed responsive defects along the way. 84 files changed,
net minus 106 lines. Every fact, link, award, and piece of content is untouched; only the
presentation and the phrasing of a few sentences changed.

## What the problem was

The site had accumulated the default AI portfolio vocabulary:

| Tell | Where it was | What replaced it |
| --- | --- | --- |
| Purple-pink gradient name | Hero h1 | Spectral serif in ink, no gradient |
| Typewriter role rotation | Hero subtitle | A fixed role line under the name |
| `bg-purple-600 hover:bg-pink-600` on every button | 55 files, 552 class occurrences | One deep spruce green with a darker hover |
| Emoji badges (`GitHub Star ⭐`, `Nx Champion 🏆`) | Hero pills | Plain text pills, uniform neutral styling |
| `🎙️ Host of...` line | Hero and site description | A normal sentence, no emoji |
| "Unlocking developer productivity through intelligent Code Reviews" | Meta description, hero | "writing and teaching about Angular, monorepos and code review tooling" |
| "empowering the next generation of developers", "bridging complex engineering with developer success" | Meta description, hero | Deleted. Facts only, human voice |
| "a unique blend of engineering depth and communication skill" | work-with-me intro | Deleted |
| Emoji service icons (💻 🎯 ✍️ 🎤 🌐 🎓) | work-with-me | Drawn mdi icons, one stroke weight |
| Emoji tiles in the command center (16 of them) | Cmd+K palette | No icon tiles; text-first rows like Raycast |
| Floating blurred blobs, animated gradient headline, ping/glow/scale effects | About timeline | Solid spruce line, flat cards, quiet hover states |
| `shadow-xl` on every card (border plus shadow) | 21 occurrences | Border only; hover tightens border to accent. The command center modal keeps the only shadow in the system |
| Purple/pink Pagefind search theme | search.astro (60+ hardcoded hexes) | Stone and spruce, flat highlight marks |
| Purple OG images | og-image.ts | Spruce accent on warm near-black |

## The new system

Direction chosen in the interview: editorial neutral. The record lives in `DESIGN.md`
(tokens) and `PRODUCT.md` (product truth) at the repo root.

- **Palette**: warm stone neutrals (paper `#fafaf9`, ink `#1c1917`) plus one accent, deep
  spruce `#2f5d46`, used for links, primary actions, and active markers. Dark mode is warm
  stone (`#1c1917`), not cool slate, with pale spruce `#9cc7ad` as the dark-mode accent.
- **Type**: Spectral (serif) for headings, Inter for body, JetBrains Mono only for kbd
  chips and code. All self-hosted via fontsource; no system-font display.
- **Components**: cards are bordered paper (1px, 12px radius), hover shifts the border to
  accent. Buttons: solid spruce primary, outlined secondary, underline-offset text actions.
  Navigation is quiet text links with a spruce underline on the active page.
- **Browser surfaces**: text selection, scrollbar, and kbd styling now follow the palette.

## Responsive fixes

- Card rows (`-mx-4` grid offset) bled 8px past the viewport at 390px on the homepage.
  Now `-mx-2 sm:-mx-4`; verified zero overflow at 390, 768, and 1440 on six pages.
- Hero rebuilt as a real two-column grid (7/5) that stacks cleanly, replacing the old
  absolute-positioned split that put the illustration in a fixed-height band on mobile.
- The talks section's button grid (which forced `col-span-2` hacks on mobile) is now a
  wrapping row of text links.
- Verified: 0px horizontal overflow, 0 out-of-viewport elements, at 390/768/1440 across
  home, blog, about, work-with-me, contact, and projects.

## Copy changes (facts identical)

Before (meta description): "Principal Developer Advocate at CodeRabbit. Unlocking developer
productivity through intelligent Code Reviews and scalable Monorepo strategies. Recognized
as a Google Developer Expert (Angular), GitHub Star, Nx Champion, and Microsoft MVP. 🎙️
Host of This is Tech Talks. I bridge the gap between complex engineering and developer
success, dedicated to empowering the next generation of developers."

After: "Principal Developer Advocate at CodeRabbit, writing and teaching about Angular,
monorepos and code review tooling. Google Developer Expert for Angular, GitHub Star,
Microsoft MVP, Nx Champion, and host of the This is Tech Talks podcast."

Hero description now reads: "Principal Developer Advocate at CodeRabbit, writing and
teaching about Angular, monorepos and code review tooling. Host of the This is Tech Talks
podcast." The Cmd+K hint and both CTAs kept their wording; the scroll-down indicator and
its bouncing chevron are gone.

## Screenshots

Before and after, desktop 1440 and mobile 390, captured with animations settled and fonts
loaded. All shots are full-page.

### Homepage, desktop

Before:

![before home desktop](redesign-2026/shots/before-home-desktop.png)

After:

![after home desktop](redesign-2026/shots/after-home-desktop.png)

Dark mode:

![after home desktop dark](redesign-2026/shots/after-home-desktop-dark.png)

### Homepage, mobile

Before:

![before home mobile](redesign-2026/shots/before-home-mobile.png)

After:

![after home mobile](redesign-2026/shots/after-home-mobile.png)

### Blog index

Before:

![before blog desktop](redesign-2026/shots/before-blog-desktop.png)

After (desktop and mobile):

![after blog desktop](redesign-2026/shots/after-blog-desktop.png)

![after blog mobile](redesign-2026/shots/after-blog-mobile.png)

### About (timeline)

Before:

![before about desktop](redesign-2026/shots/before-about-desktop.png)

After:

![after about desktop](redesign-2026/shots/after-about-desktop.png)

### Work with me

![after work with me desktop](redesign-2026/shots/after-work-with-me-desktop.png)

![after work with me mobile](redesign-2026/shots/after-work-with-me-mobile.png)

### Projects

![after projects desktop](redesign-2026/shots/after-projects-desktop.png)

## Verification

- `pnpm build` passes. `astro check` reports 53 pre-existing type errors (62 before this
  change; none introduced by it).
- Impeccable detector: 1 finding remaining, a false positive (a regex literal in
  `newsletter.ts` read as an `<img>` tag).
- Interaction checks: Cmd+K opens the command center, Escape closes it, dark mode toggle
  and system preference both work, mobile menu markup intact.
- Pre-existing issues left alone: an external newsletter thumbnail host with a broken SSL
  config (has an onerror handler), Cloudflare Turnstile 400 in local dev without keys,
  GitHub API rate limits on contact/testimonials without a token.

## Files

Everything is in the working tree, uncommitted. The main groups:

- `tailwind.config.cjs`: spruce `accent` scale, Spectral/Inter/JetBrains Mono families
- `src/layouts/base.astro`: fontsource imports, heading font rule, selection/scrollbar
  theming, theme-color
- `src/components/`: hero, header, footer, theme, cards (blog, project, talk, podcast,
  video, newsletter, testimonial, award, press, sponsor, bluesky), section components,
  timeline, command center, page heroes, sidebar, pagination, tags
- `src/pages/`: index, about, work-with-me, search (Pagefind theme), contact, blog,
  projects, talks, appearances, videos, bluesky, newsletter, press, tags
- `src/config.ts`: description rewrite, achievement labels and colors
- `src/lib/og-image.ts`: OG palette
- New: `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, this report

To look around: `pnpm dev` and open http://localhost:4321.

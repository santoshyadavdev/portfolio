# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers reading technical content (Angular, NestJS, monorepos, AI tooling), conference and podcast organizers evaluating Santosh as a speaker or guest, and potential clients or employers assessing him for developer advocacy and engineering work. Visitors arrive from search, social links, and referrals from the Angular and CodeRabbit communities.

## Product Purpose

Personal portfolio and blog of Santosh Yadav, a Principal Developer Advocate at CodeRabbit. The site exists to prove credibility through published work: articles, talks, podcast episodes, videos, projects, awards, and testimonials, and to convert that credibility into speaking invitations, podcast appearances, consulting inquiries, and newsletter subscriptions.

## Positioning

Recognized expertise with public receipts: Google Developer Expert (Angular), GitHub Star, Microsoft MVP, Nx Champion, host of This is Tech Talks, author of the weeklyfive.io newsletter. The portfolio's differentiator is the depth of verifiable community proof rather than claims.

## Operating Context

Astro static site deployed on Cloudflare Pages. Content lives in Astro Content Collections (blog, talks, podcasts, projects). Search via Pagefind, theming via class-based dark mode with a manual toggle, command center modal on Cmd/Ctrl+K. Package manager pnpm. Development server `pnpm dev` on port 4321.

## Capabilities and Constraints

- Site conventions (binding, from CLAUDE.md): no emojis anywhere on the site, first-person conversational voice, no H1 in blog bodies, language required on fenced code blocks.
- OG images generated with satori + resvg using Inter from @fontsource.
- Optional integrations degrade gracefully without tokens: YouTube subscriber count, Twitter follower count, GitHub data, Umami analytics.
- The user's redesign brief (2026-09-14): remove all AI-generated tells from the design and copy, editorial neutral visual direction, whole site, facts in copy stay identical.

## Brand Commitments

- Real name and identity: Santosh Yadav. All awards, titles, and links are factual and must not be reworded into new claims.
- No emojis in any site copy or UI.
- First-person voice, conversational but authoritative.
- MIT licensed codebase.

## Evidence on Hand

All content is real and present in the repository: `src/content/blog/`, `src/content/talks/`, `src/content/podcasts/`, `src/content/projects/`, testimonials fetched from a data source in `src/lib/testimonials.ts`, newsletter items via `src/lib/newsletter.ts`. Personal illustration at `src/images/svg/undraw/santosh_yadav.svg`. Nothing needs fabricating.

## Product Principles

- Proof over claims: every section links to verifiable public work.
- Content leads: the design frames articles, talks, and projects; it never competes with them.
- Long-lived over trendy: the site is maintained for years; visual choices must age well.
- Accessibility is not optional: dark mode, keyboard navigation (Cmd+K), and reduced-motion support are existing behavior to preserve.

## Accessibility & Inclusion

Dark mode with manual toggle and system preference fallback, `prefers-reduced-motion` handling in hero animations, aria attributes on interactive components. Preserve or improve all three.

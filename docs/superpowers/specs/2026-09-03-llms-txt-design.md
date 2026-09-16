# llms.txt for santoshyadav.dev

## Overview

Add a dynamically generated `/llms.txt` endpoint to santoshyadav.dev following the [llmstxt.org](https://llmstxt.org) standard. This gives LLMs and AI agents a structured, concise overview of the site's content with links to individual pages.

## Motivation

AI agents increasingly browse websites to answer questions and assist users. The llms.txt standard provides a curated, markdown-formatted overview that fits in an LLM context window — unlike sitemaps or full HTML pages. Adding this makes the portfolio more discoverable and useful to coding agents, chat assistants, and search tools.

## Implementation

### 1. API Route: `src/pages/llms.txt.ts`

A TypeScript GET endpoint (same pattern as the existing `src/pages/rss.xml.js`) that:

- Queries all content collections: `blog`, `talks`, `projects`, `podcasts`, `press`, `course`
- Filters out drafts from each collection
- Sorts blog posts by `publishDate` descending (newest first)
- Returns `Content-Type: text/plain; charset=utf-8`

### 2. Output Format

Follows the llmstxt.org spec exactly:

```markdown
# Santosh Yadav

> Personal portfolio and blog of Santosh Yadav — Principal Developer Advocate at CodeRabbit, Google Developer Expert (Angular), GitHub Star, Microsoft MVP, and Nx Champion. Host of This is Tech Talks podcast.

Santosh writes about Angular, open source contributions, developer tools, career growth, and NestJS. The site includes blog posts, conference talks, open source projects, podcast episodes, press mentions, and courses.

## Blog Posts

- [Post Title](https://santoshyadav.dev/blog/slug): Post description

## Talks

- [Talk Title at Event](https://santoshyadav.dev/talks): Location — Description

## Projects

- [Project Title](project-url): Description

## Podcasts

- [Episode Title](https://santoshyadav.dev/my-podcast): Description

## Press

- [Article Title](external-url): Publication — Description

## Courses

- [Course Title](https://santoshyadav.dev/course/slug): Description

## Optional

- [About / My Journey](https://santoshyadav.dev/about): Santosh's journey from Mumbai to becoming a recognized developer advocate
- [Contact](https://santoshyadav.dev/contact): Contact information and social links
- [Newsletter](https://santoshyadav.dev/newsletter): Newsletter signup
- [Appearances](https://santoshyadav.dev/appearances): Conference and event appearances
- [Sponsors](https://santoshyadav.dev/sponsors): Open source sponsorship information
- [RSS Feed](https://santoshyadav.dev/rss.xml): RSS feed for blog posts
```

### 3. Discoverability

Add a `<link>` tag to the base layout (`src/layouts/base.astro` or equivalent `<head>` component):

```html
<link rel="describedby" href="/llms.txt" />
```

This follows the llmstxt.org recommendation for helping agents discover the file.

## Content Collection Queries

| Collection | Filter | Sort | Link Pattern |
|-----------|--------|------|-------------|
| `blog` | `draft !== true` | `publishDate` desc | `/blog/{slug}` |
| `talks` | `draft !== true` | `eventDate` desc | `/talks` (single page) |
| `projects` | `draft !== true` | none | `project.url` (external) |
| `podcasts` | `draft !== true` | `publishDate` desc | `/my-podcast` (single page) |
| `press` | `draft !== true` | `publishDate` desc | `press.url` (external) |
| `course` | `draft !== true` | `weight` asc | `/course/{slug}` |

## Scope

- Single new file: `src/pages/llms.txt.ts`
- One edit: add `<link rel="describedby">` to the base layout `<head>`
- No new dependencies
- No `.md` versions of individual pages (can be added later)

## Out of Scope

- Markdown versions of individual pages (`.md` alternates)
- `Link:` HTTP response headers (would require Cloudflare Workers config)
- `llms-full.txt` (concatenated full content variant)

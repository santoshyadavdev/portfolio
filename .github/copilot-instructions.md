# Copilot Instructions

## Project Overview

Astro-based portfolio and blog at santoshyadav.dev. Deployed on Cloudflare Pages. Uses Tailwind CSS, Content Collections, and pnpm.

## Blog Post Review Guidelines

When reviewing or generating blog content in `src/content/blog/`, follow the full conventions in `.github/skills/blog-review/SKILL.md`.

### Summary of Blog Conventions

**Frontmatter (required):**
- `title` — 5-12 words, descriptive
- `description` — 1-2 sentence SEO summary
- `author: "Santosh Yadav"`
- `publishDate` — ISO date (YYYY-MM-DD)
- `draft: false`
- `preview`, `coverSVG`, `socialImage` — path to 1200×630 PNG
- `categories` — 1-3, Title Case (Angular, Career, Open Source, NestJS)
- `tags` — 2-6, specific

**Writing style:**
- First person, conversational, confident
- No emojis ever
- Technical posts: professional + educational, ~40-50% code
- Personal posts: warm, vulnerable, honest
- No H1 in body; sections start with H2
- Code blocks always have language specifier
- Introduce code before showing it; explain after

**File naming:** `YYYY-MM-DD-slug.md` or `.mdx` (use .mdx only when importing components)

**Structure patterns:**
- Technical: Hook → Problem → Solution → Code → Conclusion
- Personal: Opening → Journey → Lessons → Gratitude → Outlook
- Always end with sponsor shoutout (when applicable)

**Anti-patterns to flag:**
- Emojis
- Code without explanation
- Orphan headings (heading immediately followed by another heading)
- Bare URLs in prose
- "Click here" link text
- Future publishDate without `draft: true`
- Broken image paths
- H1 (`#`) in post body

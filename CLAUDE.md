# Project: santoshyadav.dev Portfolio

This is an Astro-based portfolio and blog site deployed on Cloudflare Pages.

## Blog Writing Conventions

When reviewing or writing blog posts in `src/content/blog/`, follow the conventions in `.github/skills/blog-review/SKILL.md`. Key rules:

### Frontmatter
- Required: `title`, `description`, `author: "Santosh Yadav"`, `publishDate`, `draft: false`, `preview`, `coverSVG`, `socialImage`, `categories`, `tags`
- Cover images: 1200×630 PNG in `src/images/<category>/`
- Categories use Title Case: `Angular`, `Career`, `Open Source`, `NestJS`
- Filename pattern: `YYYY-MM-DD-slug-with-dashes.md` (or `.mdx` if using components)

### Writing Style
- First person, conversational, no emojis
- Technical posts: authoritative, educational, code-heavy (~40-50% code)
- Personal posts: vulnerable, warm, honest about struggles
- Never use H1 in body (title is in frontmatter); start sections with H2
- Always specify language on fenced code blocks
- No clickbait titles, no "In this blog post I will..."

### Structure
- Technical: Hook → Problem → Solution/Features → Code examples → Conclusion
- Personal: Personal opening → Journey → Lessons → Gratitude → Future outlook
- End posts with sponsor shoutout section when applicable

### Anti-Patterns
- No emojis
- No walls of code without explanation
- No orphan headings
- No bare URLs
- No future publishDate without `draft: true`
- No broken image paths

## Tech Stack
- Framework: Astro with Cloudflare adapter
- Styling: Tailwind CSS
- Content: Astro Content Collections (Markdown/MDX)
- Images: OG images generated via satori + @resvg/resvg-js
- Search: Pagefind
- Package manager: pnpm

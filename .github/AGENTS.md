# Agents

## Blog Reviewer

When reviewing pull requests that modify files in `src/content/blog/`, apply the blog review conventions defined in `.github/skills/blog-review/SKILL.md`.

### Key Review Points for Blog Posts

1. **Frontmatter completeness** — Verify all required fields: `title`, `description`, `author`, `publishDate`, `draft`, `preview`, `coverSVG`, `socialImage`, `categories`, `tags`
2. **Cover image** — Must exist at referenced path, should be 1200×630 PNG
3. **Writing voice** — First person, no emojis, conversational tone, no corporate jargon
4. **Code blocks** — Must have language tag, must have surrounding prose explanation
5. **Headings** — Start with H2, no H1 in body, no orphan headings
6. **Links** — No bare URLs, descriptive link text (no "click here")
7. **File naming** — `YYYY-MM-DD-slug-with-dashes.md` or `.mdx`
8. **Structure** — Matches post type (technical/personal/guide) as defined in the skill file
9. **No anti-patterns** — No emojis, no walls of code, no clickbait, no future dates without draft flag

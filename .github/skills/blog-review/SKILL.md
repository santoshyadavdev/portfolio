---
name: blog-review
description: "Reviews blog posts for santoshyadav.dev against established writing conventions, style patterns, and technical standards. Use when writing, editing, or reviewing any blog post for the portfolio site."
---

# Blog Post Review Skill

Review blog posts against the established style, structure, and conventions of santoshyadav.dev.

## When to Use

- Before publishing a new blog post
- When editing or proofreading draft content
- When converting content from another platform
- When the user asks "review my blog post" or "does this look right"

## Review Checklist

Evaluate the post against each section below. Report issues as **MUST FIX** (blocks publishing) or **SUGGESTION** (improvement, optional).

---

## 1. Frontmatter Validation

**Required fields:**
```yaml
title: string              # 5-12 words, descriptive, not clickbait
description: string        # 1-2 sentences, SEO-friendly summary
author: "Santosh Yadav"   # Always this exact string
publishDate: YYYY-MM-DD   # ISO date format
draft: false               # Must be false for publishing
preview: ../images/...     # Relative path to 1200x630 PNG
coverSVG: ../images/...    # Same as preview (or SVG variant)
socialImage: ../images/... # Same as preview (OG image)
categories: []             # 1-3 broad categories
tags: []                   # 2-6 specific tags
```

**Optional fields:**
```yaml
canonicalUrl: string       # Only for cross-posted content
atUri: string              # Bluesky AT protocol URI
updatedDate: date          # Only when updating existing post
extra: [mermaid|math|gallery|markmap]  # Special rendering needs
```

**Validation rules:**
- Cover image must exist at the referenced path
- Cover image should be 1200x630 PNG (OG standard)
- Categories use Title Case: `Angular`, `Career`, `Open Source`, `NestJS`
- Tags are more specific than categories
- `publishDate` must not be in the future unless `draft: true`

---

## 2. Content Structure

### Technical Posts (tutorials, deep-dives, feature announcements)

**Expected structure:**
1. Opening hook (1-3 sentences, direct statement or context)
2. Introduction/Problem statement
3. Solution/Feature breakdown (H2 sections)
4. Code examples with explanation
5. Practical applications or migration guidance
6. Conclusion with actionable takeaway
7. (Optional) Sponsor shoutout at end

**Rules:**
- Start with H2 (`##`) for top-level sections — never H1 (title is in frontmatter)
- Use H3 (`###`) for subsections within an H2
- Rarely go beyond H3; avoid H5+
- Each major section should have a clear purpose
- Code-heavy sections: explain before showing code, then explain after
- Include before/after comparisons for migration content

### Personal/Reflection Posts (career, journey, year reviews)

**Expected structure:**
1. Warm, personal opening ("Hey Friends" or personal hook)
2. Context/Why this post exists
3. Journey narrative (timeline or milestones)
4. Lessons learned (separate sections)
5. Gratitude section (named individuals with links)
6. Future outlook
7. (Optional) Sponsor shoutout

**Rules:**
- Can use shorter sections
- Vulnerability is a strength — honest about struggles
- Include specific names and links for people mentioned
- Keep to 1,500-2,500 words

### Guide/Comprehensive Posts

**Expected structure:**
1. Personal context establishing expertise
2. Categorized guidance (by audience level or role)
3. Specific actionable steps
4. Examples and resources
5. Conclusion

---

## 3. Writing Voice & Tone

**DO:**
- Write in first person singular ("I", "my")
- Address reader directly ("you", "your")
- Use collective "we" and "let's" for tutorials
- Use casual contractions ("it's", "you're", "don't", "won't")
- Be confident and opinionated ("I recommend...", "I suggest...")
- Weave personal anecdotes into technical content
- Be honest about struggles and growth

**DON'T:**
- Use emojis (never)
- Use clickbait or exaggerated claims
- Write in passive voice excessively
- Use corporate jargon ("leverage", "synergy", "paradigm shift")
- Be self-deprecating about technical ability
- Over-apologize or hedge unnecessarily

**Tone by post type:**
| Type | Tone |
|------|------|
| Technical | Professional, educational, authoritative |
| Personal | Vulnerable, warm, conversational |
| Advocacy | Enthusiastic, encouraging, inviting |

---

## 4. Code Blocks

**Rules:**
- Always specify language after opening fence: ` ```typescript `, ` ```bash `, etc.
- Common languages: `typescript`, `javascript`, `html`, `bash`, `json`, `css`, `scss`
- Introduce code before showing it ("Add the below code:", "Here's how it looks:")
- Use inline comments (`// ←`) to highlight important lines
- For comparisons, use clearly labeled "BEFORE" and "AFTER" sections
- Keep individual blocks under ~40 lines; split longer ones
- Include realistic mock data in examples
- Show progression: simple example → expanded → real-world

**Code-to-prose ratio:**
- Technical posts: ~40-50% code, 50-60% prose
- Personal posts: minimal or no code
- Guides: ~25-35% code

---

## 5. Images

**Cover/Banner:**
- Must be 1200×630 PNG
- Generated using satori-based OG image generator (dark bg, purple accent, title+description)
- Stored in `src/images/<category>/` with descriptive filename
- Same image used for `preview`, `coverSVG`, and `socialImage`

**Inline images (MDX posts):**
- Use `<BlogImage>` component: `<BlogImage src={importedImage} alt="description" />`
- Import at top of file: `import myImg from '../../images/category/filename.png'`
- Alt text must be descriptive (explains what image shows)
- Diagrams and screenshots are encouraged in technical posts

**Inline images (MD posts):**
- Standard markdown: `![alt text](url)`
- Remote URLs acceptable (cdn-images-1.medium.com, etc.)

---

## 6. Links & References

**Rules:**
- Use inline links: `[Display Text](url)`
- Twitter/X links use `x.com` (not `twitter.com` for new links)
- People mentions: `[Name](social-link)` with their platform of choice
- External tool/framework links to official docs
- No bare URLs in prose
- GitHub repos: link to specific file/line when relevant
- For video embeds in MDX: `import { YouTube } from '@astro-community/astro-embed-youtube'` then `<YouTube id="VIDEO_ID" />`

---

## 7. File Format & Naming

**Filename pattern:** `YYYY-MM-DD-slug-with-dashes.md` or `.mdx`

**When to use `.mdx` vs `.md`:**
- `.mdx` — when using components (`<BlogImage>`, `<YouTube>`, `<Accordion>`, custom)
- `.md` — plain markdown with no component imports

**Slug rules:**
- Lowercase
- Words separated by hyphens
- No special characters
- Descriptive but concise (3-8 words)
- No dates in slug (date is prefix)

---

## 8. Common Patterns to Include

**Sponsor shoutout (end of post):**
```markdown
Shout out to my GitHub Sponsors for supporting my work on Open Source.

- [CodeRabbit](https://www.coderabbit.ai/)
- [Sponsor Name](url)
```

**Gratitude section (personal posts):**
```markdown
A huge thanks to my teammates: [Name](link), [Name](link)...
And a special thanks to [Name](link) for [specific reason].
```

**Key insight blockquote:**
```markdown
> My biggest win this year was getting my self-confidence back.
```

**Interactive demo callout:**
```markdown
> **Want to see it in action?** I've built a [live demo app](url)
> showcasing [features].
```

---

## 9. Anti-Patterns to Flag

- **No emoji** — flag any emoji usage
- **No "In this blog post, I will..." opening** — go straight to the hook
- **No walls of code** — every code block needs surrounding explanation
- **No orphan headings** — a heading must have content before the next heading
- **No H1 in body** — title comes from frontmatter only
- **No duplicate content** — if canonicalUrl exists, ensure it's intentional cross-posting
- **No future publish dates** without `draft: true`
- **No broken image paths** — verify referenced images exist
- **No extremely long paragraphs** — break after 4-5 sentences max
- **No "Click here" link text** — links should be descriptive

---

## 10. Final Checks

Before approving a post for publishing:

1. [ ] Frontmatter is complete and valid
2. [ ] Cover image exists and is 1200×630
3. [ ] Title is engaging but not clickbait
4. [ ] Description works as a standalone summary
5. [ ] Structure matches post type (technical/personal/guide)
6. [ ] Code blocks have language tags
7. [ ] No orphan headings or empty sections
8. [ ] Links are functional (no bare URLs, descriptive text)
9. [ ] Voice matches established tone
10. [ ] Post has a clear conclusion or takeaway
11. [ ] Sponsor section present (if applicable)
12. [ ] No emojis anywhere in the content
13. [ ] `astro sync` passes without errors

# Work with Me — Design Spec

## Overview

Add a "Work with Me" section to santoshyadav.dev that communicates availability for collaboration, freelancing, and consulting. The section should be discoverable by both human visitors and AI agents.

## Goals

1. Clearly signal availability for paid collaboration and consulting
2. List service categories with descriptions so visitors understand what Santosh offers
3. Make the page discoverable by AI agents via `llms.txt` and JSON-LD structured data
4. Drive conversions to the existing Contact page

## Non-Goals

- Payment processing or booking system
- Testimonials on this page (they already exist elsewhere)
- Pricing information (keep flexible, discuss per engagement)

## Architecture

### New Files

| File | Purpose |
|------|---------|
| `src/pages/work-with-me.astro` | Dedicated page at `/work-with-me` |
| `src/components/workwithme.astro` | Homepage CTA section component |

### Modified Files

| File | Change |
|------|--------|
| `src/config.ts` | Add "Work with Me" to `NavigationLinks` before "Contact" |
| `src/pages/index.astro` | Import and render `WorkWithMe` component after `LatestTestimonials` |
| `src/pages/llms.txt.ts` | Add "Work with Me" section with services and page URL |

## Page Design: `/work-with-me`

### Layout

Uses the existing `Base` layout with `PageHero`, consistent with other pages (contact, about, talks).

### Sections (top to bottom)

#### 1. Page Hero

- Title: "Work with Me"
- Description: "Available for collaboration, consulting, and freelancing"
- Uses standard `PageHero` component with the site's default cover SVG and social image

#### 2. Introduction

A brief paragraph establishing availability and breadth of experience. Tone: confident, conversational, first-person (consistent with site voice). No emojis.

Example copy direction:
> I am available for collaboration, consulting, and freelancing engagements. With experience spanning developer advocacy, full-stack development, open source, and technical content creation, I bring a unique blend of engineering depth and communication skill to every project.

#### 3. Services Grid

A responsive grid: 2 columns on desktop (`md:`), 1 column on mobile. Each service is a card with an icon-like heading and 2-3 sentence description.

**Service Categories:**

1. **Software Consulting** — Architecture reviews, code audits, technology selection guidance, and hands-on development for teams building modern applications.

2. **Developer Advocacy & DevRel** — Developer relations strategy, community building, developer experience improvements, and advocacy program design.

3. **Technical Content Creation** — Blog posts, technical documentation, video tutorials, and course development for developer audiences.

4. **Conference Speaking & Workshops** — Keynotes, technical talks, and hands-on workshops at conferences, meetups, and corporate events.

5. **Open Source Strategy** — Guidance on building, maintaining, and contributing to open source projects. Community governance and sustainability planning.

6. **Team Training & Mentoring** — Upskilling teams on modern development practices, frameworks, and tooling through structured training and ongoing mentorship.

#### 4. Credibility Section

A horizontal row of badges/icons showing key recognitions:
- Google Developer Expert (Angular)
- GitHub Star
- Microsoft MVP
- Nx Champion

Uses the same styling approach as other site badges. Reinforces trust.

#### 5. CTA Section

Gradient background section (matching site patterns like the about page CTA):
- Text: "Ready to collaborate? Let's talk about your project."
- Primary button: "Get in Touch" → links to `/contact`
- Uses the site's purple-to-pink gradient button style

#### 6. JSON-LD Structured Data

Embedded in the page `<head>` via the existing SEO component pattern. Schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": {
    "@type": "Person",
    "name": "Santosh Yadav",
    "url": "https://santoshyadav.dev",
    "jobTitle": "Principal Developer Advocate",
    "knowsAbout": [
      "Angular", "NestJS", "Full-Stack Development",
      "Developer Advocacy", "Open Source"
    ]
  },
  "serviceType": [
    "Software Consulting",
    "Developer Advocacy",
    "Technical Content Creation",
    "Conference Speaking",
    "Open Source Strategy",
    "Team Training"
  ],
  "areaServed": "Worldwide",
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://santoshyadav.dev/contact"
  }
}
```

## Homepage Component: `WorkWithMe`

### Placement

After `<LatestTestimonials>` on the homepage. Testimonials provide social proof, which naturally leads into the availability CTA.

### Design

A compact section with:
- Background: matches the alternating section pattern on the homepage
- Headline: "Available for Collaboration"
- Subtext: 1-2 lines about being open for consulting, freelancing, and collaboration
- CTA button: "Work with Me" → links to `/work-with-me`

Follows the same max-width, padding, and typography patterns as other homepage sections (`max-w-7xl mx-auto px-2 sm:px-6 lg:px-8`).

## Navigation Update

In `src/config.ts`, add to `NavigationLinks` before the "Contact" entry:

```typescript
{ name: "Work with Me", href: "work-with-me" },
```

This places it as the second-to-last primary nav item, acting as a natural precursor to Contact.

## `llms.txt` Update

Add a new section after "Courses" and before "Optional":

```
## Work with Me

Santosh is available for collaboration, consulting, and freelancing. Services include software consulting, developer advocacy and DevRel, technical content creation, conference speaking and workshops, open source strategy, and team training and mentoring.

- [Work with Me](https://santoshyadav.dev/work-with-me): Collaboration and consulting services
```

Also add the Work with Me page to the Optional section for completeness.

## Styling

All styling uses existing Tailwind CSS classes and patterns already established in the site:
- Card shadows: `shadow-xl` with `hover:shadow-2xl` transitions
- Purple/pink gradient accents for CTAs
- Dark mode support via `dark:` variants
- Responsive grid: `grid-cols-1 md:grid-cols-2`

No new CSS or Tailwind configuration needed.

## Testing

- Visual check: page renders correctly in light and dark mode
- Navigation: link appears in primary nav and works
- Homepage: CTA section renders after testimonials
- `llms.txt`: new section appears in the output
- JSON-LD: structured data is valid (test with Google Rich Results Test)
- Responsive: layout works on mobile and desktop
- Build: `pnpm build` completes without errors

---
name: santoshyadav.dev
description: Editorial neutral portfolio: ink on paper, one green accent, serif display over sans body.
colors:
  primary: "#2f5d46"
  primary-hover: "#274b39"
  primary-soft: "#e2ece6"
  primary-dark-mode: "#9cc7ad"
  ink: "#1c1917"
  paper: "#fafaf9"
  surface: "#ffffff"
  surface-dark: "#292524"
  border: "#e7e5e4"
  border-dark: "#44403c"
  text-muted: "#57534e"
  text-muted-dark: "#a8a29e"
typography:
  display:
    fontFamily: "Spectral, Georgia, serif"
    fontWeight: 600
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontWeight: 400
rounded:
  md: "8px"
  lg: "12px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
---

# Design System: santoshyadav.dev

## Overview

**Creative North Star: "The Engineer's Periodical"**

The site reads like a well-set technical journal, not a product landing page. Ink on warm paper, one deep green accent used sparingly, and a serif display voice (Spectral) over a workhorse sans body (Inter). The content (articles, talks, projects) leads; the interface frames it and stays out of the way.

The visual anti-reference is the default AI-generated developer portfolio: purple-pink gradients, typewriter heroes, emoji badges, glass cards, and glow effects. None of those appear anywhere. Cards are bordered paper, depth comes from borders and one modal shadow, and every icon is a drawn glyph from the icon library.

**Key Characteristics:**
- Warm stone neutrals with a single deep green accent
- Spectral display headings over Inter body text
- Bordered flat cards; shadows only for floating layers (command center)
- No gradients, no emoji, no typewriter effects anywhere
- Dark mode is warm near-black stone, not cool slate

## Colors

A restrained editorial palette: one accent carries the whole site, neutrals do everything else.

### Primary
- **Deep Spruce** (#2f5d46): the single accent. Links, primary buttons, active states, timeline markers, focus rings. In dark mode the accent role flips to **Pale Spruce** (#9cc7ad).
- **Spruce Shadow** (#274b39): hover state for primary buttons and links.
- **Spruce Wash** (#e2ece6): soft accent background for secondary controls and highlights.

### Neutral
- **Ink** (#1c1917): primary text in light mode and page ground in dark mode.
- **Paper** (#fafaf9): page ground in light mode; section alternation uses it against white surfaces.
- **Surface** (#ffffff) / **Surface Dark** (#292524): card and panel backgrounds.
- **Border** (#e7e5e4) / **Border Dark** (#44403c): 1px card and divider borders.
- **Muted Text** (#57534e / #a8a29e in dark): metadata, captions, secondary text.

### Named Rules
**The One Accent Rule.** Green appears on links, primary actions, and active markers only. It never fills large surfaces, never tints backgrounds beyond the soft wash, and never pairs with a second saturated hue.

**The Warm Ground Rule.** Neutrals are always stone (warm), never gray (cool) or slate. Dark mode grounds are #1c1917/#292524, not blue-black.

## Typography

**Display Font:** Spectral (Georgia serif fallback)
**Body Font:** Inter (system sans fallback)
**Mono Font:** JetBrains Mono (system mono fallback), used only for `<kbd>` keys and code

**Character:** A screen-first serif gives the headings a literary, set-by-hand authority; Inter keeps dense technical content effortless to read.

### Hierarchy
- **Display** (Spectral 600, 48-72px, tracking -0.01em): hero name and page titles.
- **Headline** (Spectral 600, 24-30px): section headings and card titles.
- **Body** (Inter 400, 14-18px): paragraphs, descriptions, UI text. Prose measure stays within 65-75ch.
- **Metadata** (Inter 500, 12-14px): dates, tags, captions.

### Named Rules
**The No Costume Mono Rule.** JetBrains Mono is for keyboard hints and code only, never for decorative "technical" labels.

## Layout

One container everywhere: `max-w-6xl` (1152px) with `px-4 sm:px-6 lg:px-8` gutters. The homepage hero is a 7/5 two-column grid on large screens (content left, illustration right) stacking to a single column below 1024px. Sections alternate white and Paper (`#fafaf9` / dark `#0c0a09`) so adjacent bands read as distinct. Spacing rhythm: `py-12 sm:py-16 lg:py-20` on every top-level section, `py-16 sm:py-20 lg:py-24` on the homepage hero, `mt-8 lg:mt-10` between a heading and its content (more space above a heading than below it). Card rows are CSS Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`); cards do not carry their own widths. The footer is in-flow, not fixed.

## Elevation & Depth

Flat by default. Cards, chips, inputs, and nav carry a 1px border and no shadow; hover changes border color (Spruce, #9cc7ad light / #4d8a68 dark), never adds a glow. The only shadow in the system is the command center modal (`shadow-2xl`), which floats above the page by right of being an actual floating layer. Timeline depth comes from the accent-marked vertical rule, not effects.

### Named Rules
**The Border-Or-Shadow Rule.** Never both. Resting surfaces get a border; only true floating layers get shadows.

## Shapes

Radius vocabulary is 8px (rounded-lg) for small controls, buttons, and inline images; 12px (rounded-xl) for cards and the illustration panel; pills (9999px) reserved for small tags and badges. No rounded-full buttons, no blob or organic shapes.

## Components

### Buttons
- **Shape:** gently rounded (8px)
- **Primary:** Deep Spruce (#2f5d46) background, white text, 12px 24px padding, Inter 600
- **Hover / Focus:** Spruce Shadow (#274b39); focus ring 2px accent with 2px offset
- **Secondary:** transparent with 1px stone border, ink text; hover border turns accent
- **Tertiary (in-card actions):** text link with accent underline offset

### Chips
- **Style:** stone-100 background (dark stone-700), stone-600 text, 9999px radius
- **State:** hover shifts to Spruce Wash background and spruce text

### Cards / Containers
- **Corner Style:** 12px radius
- **Background:** white (dark #292524)
- **Border:** 1px stone-200 (dark stone-700)
- **Shadow Strategy:** none; hover tightens border to accent
- **Internal Padding:** 24px (p-6)

### Inputs / Fields
- **Style:** 1px stone border, white/dark-stone background, 8px radius
- **Focus:** 2px accent ring, transparent remainder

### Navigation
- **Style:** Inter 500, stone-500 links on white bar with 1px stone-200 bottom border and slight backdrop blur
- **Active:** ink text with 2px spruce underline, 8px offset
- **Mobile:** slide-down panel, full-width tap rows (44px+), same neutral treatment

### Command Center
- Cmd/Ctrl+K palette: rounded-2xl, shadow-2xl, no icon tiles, keyboard hints in JetBrains Mono kbd chips, accent highlight rows.

## Do's and Don'ts

### Do:
- **Do** use the accent green for exactly one thing per view region: the primary action or the active marker.
- **Do** let Spectral carry hierarchy; headings never need kickers, eyebrows, or uppercase labels above them.
- **Do** keep dark mode warm: stone grounds, pale spruce accent.
- **Do** use drawn mdi/icon-library glyphs at a single stroke weight when an icon is needed.

### Don't:
- **Don't** use gradients anywhere, including text fills, buttons, and backgrounds. Image scrims for legibility over photos are the only exception.
- **Don't** use emoji in UI, labels, copy, or data.
- **Don't** add shadows to resting cards or combine a border with a shadow.
- **Don't** introduce a second saturated color; program logos (YouTube red, Angular red) are content, not palette.
- **Don't** ship typewriter, pulsing, floating-blob, or ping animations. Scroll reveals that start visible are the only motion grammar.

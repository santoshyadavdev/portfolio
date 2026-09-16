# Work with Me Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Work with Me" page and homepage CTA section, discoverable by humans and AI agents, to santoshyadav.dev.

**Architecture:** New `/work-with-me` page with service categories, credibility badges, and JSON-LD structured data. New homepage component placed after testimonials. Updates to `llms.txt` and primary navigation. All styling uses existing Tailwind patterns.

**Tech Stack:** Astro, Tailwind CSS, JSON-LD (schema-dts), existing Base/PageHero layouts.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/pages/work-with-me.astro` | Create | Dedicated page with services grid, credibility, CTA, and JSON-LD |
| `src/components/workwithme.astro` | Create | Homepage CTA banner linking to `/work-with-me` |
| `src/config.ts` | Modify | Add "Work with Me" to `NavigationLinks` |
| `src/pages/index.astro` | Modify | Import and render `WorkWithMe` component |
| `src/pages/llms.txt.ts` | Modify | Add "Work with Me" section |

---

### Task 1: Add "Work with Me" to Navigation

**Files:**
- Modify: `src/config.ts:103-112` (NavigationLinks array)

- [ ] **Step 1: Add nav entry**

In `src/config.ts`, add `{ name: "Work with Me", href: "work-with-me" }` to `NavigationLinks` before the "Contact" entry:

```typescript
export const NavigationLinks = [
  { name: "Home", href: "" },
  { name: "Blog", href: "blog" },
  { name: "Projects", href: "projects" },
  { name: "Talks", href: "talks" },
  { name: "Videos", href: "videos" },
  { name: "Press", href: "press" },
  { name: "Newsletter", href: "newsletter" },
  { name: "Work with Me", href: "work-with-me" },
  { name: "Contact", href: "contact" },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/config.ts
git commit -m "feat: add Work with Me to primary navigation"
```

---

### Task 2: Create the `/work-with-me` Page

**Files:**
- Create: `src/pages/work-with-me.astro`

- [ ] **Step 1: Create the page file**

Create `src/pages/work-with-me.astro` with this content:

```astro
---
import type { Frontmatter } from "../config";
import { SiteMetadata, HeroAchievements } from "../config";
import Base from "../layouts/base.astro";
import PageHero from "../components/pagehero.astro";

const frontmatter: Frontmatter = {
  title: "Work with Me",
  description:
    "Available for collaboration, consulting, and freelancing engagements.",
  coverSVG: "../images/svg/undraw/santosh_yadav.svg",
  socialImage: "../images/santosh-og.jpg",
  publishDate: SiteMetadata.buildTime,
};

const services = [
  {
    title: "Software Consulting",
    description:
      "Architecture reviews, code audits, technology selection guidance, and hands-on development for teams building modern applications.",
    icon: "💻",
  },
  {
    title: "Developer Advocacy & DevRel",
    description:
      "Developer relations strategy, community building, developer experience improvements, and advocacy program design.",
    icon: "🎯",
  },
  {
    title: "Technical Content Creation",
    description:
      "Blog posts, technical documentation, video tutorials, and course development for developer audiences.",
    icon: "✍️",
  },
  {
    title: "Conference Speaking & Workshops",
    description:
      "Keynotes, technical talks, and hands-on workshops at conferences, meetups, and corporate events.",
    icon: "🎤",
  },
  {
    title: "Open Source Strategy",
    description:
      "Guidance on building, maintaining, and contributing to open source projects. Community governance and sustainability planning.",
    icon: "🌐",
  },
  {
    title: "Team Training & Mentoring",
    description:
      "Upskilling teams on modern development practices, frameworks, and tooling through structured training and ongoing mentorship.",
    icon: "🎓",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "Person",
    name: "Santosh Yadav",
    url: "https://santoshyadav.dev",
    jobTitle: "Principal Developer Advocate",
    knowsAbout: [
      "Angular",
      "NestJS",
      "Full-Stack Development",
      "Developer Advocacy",
      "Open Source",
    ],
  },
  serviceType: [
    "Software Consulting",
    "Developer Advocacy",
    "Technical Content Creation",
    "Conference Speaking",
    "Open Source Strategy",
    "Team Training",
  ],
  areaServed: "Worldwide",
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://santoshyadav.dev/contact",
  },
};
---

<Base frontmatter={frontmatter}>
  <header>
    <PageHero
      title={frontmatter.title}
      description={frontmatter.description}
      coverSVG={frontmatter.coverSVG}
      socialImage={frontmatter.socialImage}
    />
  </header>

  <main class="bg-white dark:bg-gray-900">
    <!-- Introduction -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center">
        I am available for collaboration, consulting, and freelancing
        engagements. With experience spanning developer advocacy, full-stack
        development, open source, and technical content creation, I bring a
        unique blend of engineering depth and communication skill to every
        project.
      </p>
    </section>

    <!-- Services Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
      <h2
        class="text-2xl md:text-4xl font-extrabold text-purple-800 dark:text-purple-200 text-center mb-10"
      >
        How I Can Help
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          services.map((service) => (
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8">
              <div class="text-3xl mb-4" aria-hidden="true">
                {service.icon}
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {service.title}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))
        }
      </div>
    </section>

    <!-- Credibility Badges -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
      <h2
        class="text-2xl md:text-4xl font-extrabold text-purple-800 dark:text-purple-200 text-center mb-8"
      >
        Recognized By
      </h2>
      <div class="flex flex-wrap justify-center gap-3">
        {
          HeroAchievements.map((achievement) => (
            <span
              class={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full border ${achievement.color}`}
            >
              {achievement.label}
            </span>
          ))
        }
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
        >
          Ready to collaborate?
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Let's talk about your project and find out how I can help.
        </p>
        <a
          href={import.meta.env.BASE_URL + "contact"}
          class="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          Get in Touch
          <svg
            class="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
    </section>
  </main>

  <!-- JSON-LD Structured Data -->
  <script is:inline set:html={JSON.stringify(jsonLd)} type="application/ld+json" />
</Base>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/work-with-me.astro
git commit -m "feat: add dedicated Work with Me page

Includes service categories, credibility badges, CTA to contact page,
and JSON-LD Service schema for AI/search engine discoverability."
```

---

### Task 3: Create the Homepage CTA Component

**Files:**
- Create: `src/components/workwithme.astro`

- [ ] **Step 1: Create the component**

Create `src/components/workwithme.astro` with this content:

```astro
---
---

<div class="bg-white dark:bg-gray-900">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="py-8 sm:py-12 lg:py-16 lg:max-w-none">
      <div class="text-center">
        <h2
          class="text-2xl md:text-4xl font-extrabold text-purple-800 dark:text-purple-200"
        >
          Available for Collaboration
        </h2>
        <p
          class="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
        >
          Looking for a software consultant, developer advocate, or technical
          content creator? I am open to freelancing and collaboration
          opportunities.
        </p>
        <div class="mt-8">
          <a
            href={import.meta.env.BASE_URL + "work-with-me"}
            class="inline-block px-6 py-3 rounded-md bg-purple-600 hover:bg-pink-600 text-white dark:bg-purple-300 dark:hover:bg-pink-300 dark:text-black font-bold text-base md:text-lg transition-colors duration-200"
          >
            Work with Me
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/workwithme.astro
git commit -m "feat: add Work with Me homepage CTA component"
```

---

### Task 4: Add Homepage Component to Index Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add import**

In `src/pages/index.astro`, add the import alongside the other component imports (after line 11, the `LatestNewsletter` import):

```typescript
import WorkWithMe from "../components/workwithme.astro";
```

- [ ] **Step 2: Render component after LatestTestimonials**

In the template section of `src/pages/index.astro`, add `<WorkWithMe />` after `<LatestTestimonials>`:

Find this line:

```astro
  <LatestTestimonials testimonials={testimonials.slice(0, 3)} />
```

Add after it:

```astro
  <WorkWithMe />
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: render Work with Me CTA on homepage after testimonials"
```

---

### Task 5: Update llms.txt

**Files:**
- Modify: `src/pages/llms.txt.ts`

- [ ] **Step 1: Add Work with Me section**

In `src/pages/llms.txt.ts`, add a "Work with Me" section after the Courses section and before the Optional section. Find this block:

```typescript
  // Optional section — secondary pages
  lines.push("## Optional");
```

Insert before it:

```typescript
  // Work with Me
  lines.push("## Work with Me");
  lines.push("");
  lines.push(
    "Santosh is available for collaboration, consulting, and freelancing. Services include software consulting, developer advocacy and DevRel, technical content creation, conference speaking and workshops, open source strategy, and team training and mentoring.",
  );
  lines.push("");
  lines.push(
    `- [Work with Me](${siteUrl}/work-with-me): Collaboration and consulting services`,
  );
  lines.push("");

```

- [ ] **Step 2: Add Work with Me to Optional section**

Find the line that adds the Sponsors entry to the Optional section:

```typescript
  lines.push(
    `- [Sponsors](${siteUrl}/sponsors): Open source sponsorship information`,
  );
```

Add after it:

```typescript
  lines.push(
    `- [Work with Me](${siteUrl}/work-with-me): Freelancing, consulting, and collaboration services`,
  );
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/llms.txt.ts
git commit -m "feat: add Work with Me section to llms.txt for AI discoverability"
```

---

### Task 6: Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Install dependencies**

```bash
pnpm install
```

- [ ] **Step 2: Run the build**

```bash
pnpm build
```

Expected: Build completes without errors. The `/work-with-me` page is generated.

- [ ] **Step 3: Verify the page was generated**

```bash
ls -la dist/work-with-me/index.html
```

Expected: File exists.

- [ ] **Step 4: Verify llms.txt includes the new section**

```bash
grep -A 3 "Work with Me" dist/llms.txt
```

Expected: Shows the "Work with Me" section heading and service description.

- [ ] **Step 5: Verify JSON-LD is in the page**

```bash
grep "application/ld+json" dist/work-with-me/index.html | grep "Service"
```

Expected: Shows the JSON-LD script tag with Service type.

- [ ] **Step 6: Verify nav link appears**

```bash
grep "work-with-me" dist/index.html
```

Expected: Shows the navigation link and the homepage CTA link.

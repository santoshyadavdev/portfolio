import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SiteMetadata } from "../config";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, "") ?? "https://santoshyadav.dev";

  const [blogPosts, talks, projects, podcasts, pressEntries, courses] =
    await Promise.all([
      getCollection("blog", ({ data }) => data.draft !== true),
      getCollection("talks", ({ data }) => data.draft !== true),
      getCollection("projects", ({ data }) => data.draft !== true),
      getCollection("podcasts", ({ data }) => data.draft !== true),
      getCollection("press", ({ data }) => data.draft !== true),
      getCollection("course", ({ data }) => data.draft !== true),
    ]);

  // Sort blog posts by publish date (newest first)
  const sortedBlog = blogPosts.sort(
    (a, b) => +b.data.publishDate - +a.data.publishDate,
  );

  // Sort talks by event date (newest first)
  const sortedTalks = talks.sort(
    (a, b) => +b.data.eventDate - +a.data.eventDate,
  );

  // Sort podcasts by publish date (newest first)
  const sortedPodcasts = podcasts.sort(
    (a, b) => +b.data.publishDate - +a.data.publishDate,
  );

  // Sort press by publish date (newest first)
  const sortedPress = pressEntries.sort(
    (a, b) => +b.data.publishDate - +a.data.publishDate,
  );

  // Sort courses by weight
  const sortedCourses = courses.sort(
    (a, b) => (a.data.weight ?? 0) - (b.data.weight ?? 0),
  );

  const lines: string[] = [];

  // H1 — required
  lines.push(`# ${SiteMetadata.author.name}`);
  lines.push("");

  // Blockquote summary
  lines.push(
    "> Personal portfolio and blog of Santosh Yadav — Principal Developer Advocate at CodeRabbit, Google Developer Expert (Angular), GitHub Star, Microsoft MVP, and Nx Champion. Host of This is Tech Talks podcast.",
  );
  lines.push("");

  // Additional context
  lines.push(
    "Santosh writes about Angular, open source contributions, developer tools, career growth, and NestJS. The site includes blog posts, conference talks, open source projects, podcast episodes, press mentions, and courses.",
  );
  lines.push("");

  // Blog Posts
  if (sortedBlog.length > 0) {
    lines.push("## Blog Posts");
    lines.push("");
    for (const post of sortedBlog) {
      const url = `${siteUrl}/blog/${post.slug}`;
      const desc = post.data.description;
      lines.push(`- [${post.data.title}](${url}): ${desc}`);
    }
    lines.push("");
  }

  // Talks
  if (sortedTalks.length > 0) {
    lines.push("## Talks");
    lines.push("");
    for (const talk of sortedTalks) {
      const desc = `${talk.data.event}, ${talk.data.location} — ${talk.data.description}`;
      lines.push(`- [${talk.data.title}](${siteUrl}/talks): ${desc}`);
    }
    lines.push("");
  }

  // Projects
  if (projects.length > 0) {
    lines.push("## Projects");
    lines.push("");
    for (const project of projects) {
      lines.push(
        `- [${project.data.title}](${project.data.url}): ${project.data.description}`,
      );
    }
    lines.push("");
  }

  // Podcasts
  if (sortedPodcasts.length > 0) {
    lines.push("## Podcasts");
    lines.push("");
    for (const podcast of sortedPodcasts) {
      const url = podcast.data.audioUrl || podcast.data.videoUrl || `${siteUrl}/my-podcast`;
      lines.push(
        `- [${podcast.data.title}](${url}): ${podcast.data.description}`,
      );
    }
    lines.push("");
  }

  // Press
  if (sortedPress.length > 0) {
    lines.push("## Press");
    lines.push("");
    for (const entry of sortedPress) {
      lines.push(
        `- [${entry.data.title}](${entry.data.url}): ${entry.data.publication} — ${entry.data.description}`,
      );
    }
    lines.push("");
  }

  // Courses
  if (sortedCourses.length > 0) {
    lines.push("## Courses");
    lines.push("");
    for (const course of sortedCourses) {
      const url = `${siteUrl}/course/${course.slug}`;
      lines.push(
        `- [${course.data.title}](${url}): ${course.data.description}`,
      );
    }
    lines.push("");
  }

  // Optional section — secondary pages
  lines.push("## Optional");
  lines.push("");
  lines.push(
    `- [About / My Journey](${siteUrl}/about): Santosh's journey from Mumbai to becoming a recognized developer advocate, GDE, and GitHub Star`,
  );
  lines.push(
    `- [Contact](${siteUrl}/contact): Contact information and social links`,
  );
  lines.push(
    `- [Newsletter](${siteUrl}/newsletter): Newsletter signup`,
  );
  lines.push(
    `- [Appearances](${siteUrl}/appearances): Conference and event appearances`,
  );
  lines.push(
    `- [Sponsors](${siteUrl}/sponsors): Open source sponsorship information`,
  );
  lines.push(
    `- [RSS Feed](${siteUrl}/rss.xml): RSS feed for blog posts`,
  );
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

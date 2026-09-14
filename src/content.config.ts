import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const files = (dir: string) =>
  glob({ pattern: "**/*.{md,mdx}", base: `./src/content/${dir}` });

const blogCollection = defineCollection({
  loader: files("blog"),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverSVG: z.string().optional(),
    preview: z.string().optional(),
    coverImage: z.string().optional(),
    socialImage: z.string().optional(),
    images: z.array(z.string()).optional(),
    gallery: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    extra: z
      .array(z.enum(["math", "markmap", "mermaid", "gallery"]))
      .optional(),
    minutesRead: z.string().optional(),
    canonicalUrl: z.string().optional(),
    atUri: z.string().optional(),
    noindex: z.boolean().optional(),
  }),
});

const docCollection = defineCollection({
  loader: files("doc"),
  schema: z.object({
    draft: z.boolean().optional(),
    section: z.string(),
    weight: z.number().default(0),
    title: z.string(),
    description: z.string(),
    images: z.array(z.string()).optional(),
    gallery: z.string().optional(),
  }),
});

const courseCollection = defineCollection({
  loader: files("course"),
  schema: z.object({
    draft: z.boolean().optional(),
    section: z.string(),
    weight: z.number().default(0),
    title: z.string(),
    description: z.string(),
    images: z.array(z.string()).optional(),
    gallery: z.string().optional(),
  }),
});

const talksCollection = defineCollection({
  loader: files("talks"),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    event: z.string(),
    eventDate: z.coerce.date(),
    location: z.string(),
    description: z.string(),
    slidesUrl: z.string().optional(),
    recordingUrl: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const videosCollection = defineCollection({
  loader: files("videos"),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    videoUrl: z.string(),
    platform: z.enum(["YouTube", "Vimeo", "other"]),
    duration: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const podcastsCollection = defineCollection({
  loader: files("podcasts"),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    episodeNumber: z.number().optional(),
    hostSlug: z.string().optional(),
    guestSlug: z.string().optional(),
    audioUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    guests: z.array(z.string()).optional(),
    platform: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projectsCollection = defineCollection({
  loader: files("projects"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    repoUrl: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    publishDate: z.coerce.date().optional(),
  }),
});

const pressCollection = defineCollection({
  loader: files("press"),
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    publication: z.string(),
    publishDate: z.coerce.date(),
    url: z.string(),
    description: z.string(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  doc: docCollection,
  course: courseCollection,
  talks: talksCollection,
  videos: videosCollection,
  podcasts: podcastsCollection,
  projects: projectsCollection,
  press: pressCollection,
};

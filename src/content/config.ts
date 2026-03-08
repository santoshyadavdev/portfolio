// 1. Import your utilities and schemas
import { z, defineCollection } from "astro:content";

// 2. Define your collections
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    publishDate: z.date(),
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
  }),
});

const docCollection = defineCollection({
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
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    event: z.string(),
    eventDate: z.date(),
    location: z.string(),
    description: z.string(),
    slidesUrl: z.string().optional(),
    recordingUrl: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const videosCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    videoUrl: z.string(),
    platform: z.enum(["YouTube", "Vimeo", "other"]),
    duration: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const podcastsCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
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
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    repoUrl: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    publishDate: z.date().optional(),
  }),
});

// 3. Export multiple collections to register them
export const collections = {
  blog: blogCollection,
  doc: docCollection,
  course: courseCollection,
  talks: talksCollection,
  videos: videosCollection,
  podcasts: podcastsCollection,
  projects: projectsCollection,
};

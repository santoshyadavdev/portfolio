import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOGImage } from "../../lib/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  const blogEntries = await getCollection("blog");

  // Filter out draft posts
  const publishedPosts = blogEntries.filter((entry) => !entry.data.draft);

  return publishedPosts.map((entry) => ({
    params: { slug: entry.slug },
    props: {
      title: entry.data.title,
      description: entry.data.description,
      author: entry.data.author,
      date: entry.data.publishDate,
    },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, description, author, date } = props as {
    title: string;
    description?: string;
    author?: string;
    date?: Date;
  };

  const pngBuffer = await generateOGImage({
    title,
    description,
    author,
    date,
  });

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

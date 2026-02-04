import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");
  
  const searchIndex = posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      slug: post.slug,
      title: post.data.title,
      description: post.data.description,
      content: post.body,
      tags: post.data.tags || [],
      categories: post.data.categories || [],
      author: post.data.author || "",
      publishDate: post.data.publishDate.toString(),
    }));

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

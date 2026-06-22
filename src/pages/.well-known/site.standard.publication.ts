import type { APIRoute } from "astro";
import { StandardSite } from "../../config";

export const GET: APIRoute = () => {
  return new Response(StandardSite.publicationAtUri, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

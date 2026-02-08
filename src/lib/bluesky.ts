// Raw API response interfaces for Bluesky's app.bsky.feed.getAuthorFeed

export interface BlueskyAuthor {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

export interface BlueskyImageEmbed {
  $type: "app.bsky.embed.images#view";
  images: Array<{
    thumb: string;
    fullsize: string;
    alt?: string;
  }>;
}

export interface BlueskyExternalEmbed {
  $type: "app.bsky.embed.external#view";
  external: {
    uri: string;
    title: string;
    description: string;
    thumb?: string;
  };
}

export interface BlueskyRecordEmbed {
  $type: "app.bsky.embed.record#view";
  record: unknown;
}

export interface BlueskyRecordWithMediaEmbed {
  $type: "app.bsky.embed.recordWithMedia#view";
  record: unknown;
  media: BlueskyImageEmbed | BlueskyExternalEmbed;
}

export type BlueskyEmbed =
  | BlueskyImageEmbed
  | BlueskyExternalEmbed
  | BlueskyRecordEmbed
  | BlueskyRecordWithMediaEmbed;

export interface BlueskyPostRecord {
  $type: "app.bsky.feed.post";
  text: string;
  createdAt: string;
  embed?: unknown;
  reply?: unknown;
}

export interface BlueskyPostView {
  uri: string;
  cid: string;
  author: BlueskyAuthor;
  record: BlueskyPostRecord;
  embed?: BlueskyEmbed;
  likeCount?: number;
  repostCount?: number;
  replyCount?: number;
  indexedAt: string;
}

export interface BlueskyFeedItem {
  post: BlueskyPostView;
  reply?: unknown;
  reason?: unknown;
}

export interface BlueskyFeedResponse {
  feed: BlueskyFeedItem[];
  cursor?: string;
}

// Simplified/transformed post interface for use in components

export interface BlueskyPostImage {
  thumb: string;
  fullsize: string;
  alt?: string;
}

export interface BlueskyPostExternalLink {
  uri: string;
  title: string;
  description: string;
  thumb?: string;
}

export interface BlueskyPost {
  uri: string;
  url: string;
  authorHandle: string;
  authorDisplayName: string;
  authorAvatar?: string;
  text: string;
  createdAt: Date;
  likeCount: number;
  repostCount: number;
  replyCount: number;
  images?: BlueskyPostImage[];
  externalLink?: BlueskyPostExternalLink;
}

/**
 * Extracts the post ID from a Bluesky AT URI
 * URI format: at://did:plc:xxxx/app.bsky.feed.post/postid
 */
function extractPostId(uri: string): string {
  const parts = uri.split("/");
  return parts[parts.length - 1];
}

/**
 * Constructs a web URL for a Bluesky post
 */
function buildPostUrl(handle: string, uri: string): string {
  const postId = extractPostId(uri);
  return `https://bsky.app/profile/${handle}/post/${postId}`;
}

/**
 * Transforms a raw API post into a simplified BlueskyPost object
 */
function transformPost(feedItem: BlueskyFeedItem): BlueskyPost {
  const { post } = feedItem;
  const { author, record, embed } = post;

  const transformedPost: BlueskyPost = {
    uri: post.uri,
    url: buildPostUrl(author.handle, post.uri),
    authorHandle: author.handle,
    authorDisplayName: author.displayName || author.handle,
    authorAvatar: author.avatar,
    text: record.text,
    createdAt: new Date(record.createdAt),
    likeCount: post.likeCount ?? 0,
    repostCount: post.repostCount ?? 0,
    replyCount: post.replyCount ?? 0,
  };

  // Process embeds
  if (embed) {
    if (embed.$type === "app.bsky.embed.images#view") {
      const imageEmbed = embed as BlueskyImageEmbed;
      transformedPost.images = imageEmbed.images.map((img) => ({
        thumb: img.thumb,
        fullsize: img.fullsize,
        alt: img.alt,
      }));
    } else if (embed.$type === "app.bsky.embed.external#view") {
      const externalEmbed = embed as BlueskyExternalEmbed;
      transformedPost.externalLink = {
        uri: externalEmbed.external.uri,
        title: externalEmbed.external.title,
        description: externalEmbed.external.description,
        thumb: externalEmbed.external.thumb,
      };
    } else if (embed.$type === "app.bsky.embed.recordWithMedia#view") {
      const recordWithMedia = embed as BlueskyRecordWithMediaEmbed;
      if (recordWithMedia.media.$type === "app.bsky.embed.images#view") {
        const imageEmbed = recordWithMedia.media as BlueskyImageEmbed;
        transformedPost.images = imageEmbed.images.map((img) => ({
          thumb: img.thumb,
          fullsize: img.fullsize,
          alt: img.alt,
        }));
      } else if (
        recordWithMedia.media.$type === "app.bsky.embed.external#view"
      ) {
        const externalEmbed = recordWithMedia.media as BlueskyExternalEmbed;
        transformedPost.externalLink = {
          uri: externalEmbed.external.uri,
          title: externalEmbed.external.title,
          description: externalEmbed.external.description,
          thumb: externalEmbed.external.thumb,
        };
      }
    }
  }

  return transformedPost;
}

/**
 * Fetches posts from a Bluesky user's feed via the public API.
 * Filters out replies and reposts, returning only original posts.
 *
 * @returns Array of processed BlueskyPost objects or empty array on failure
 */
export async function getBlueskyPosts(): Promise<BlueskyPost[]> {
  const actor = "santoshyadav.dev";
  const limit = 30; // Fetch extra to account for filtering

  try {
    const url = new URL(
      "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed",
    );
    url.searchParams.set("actor", actor);
    url.searchParams.set("limit", limit.toString());

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Bluesky API error: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const data = (await response.json()) as BlueskyFeedResponse;

    if (!data.feed || !Array.isArray(data.feed)) {
      console.error("Unexpected Bluesky API response structure");
      return [];
    }

    // Filter out replies and reposts, then transform
    const posts = data.feed
      .filter((item) => {
        // Filter out replies (posts that are in reply to another post)
        if (item.reply) {
          return false;
        }
        // Filter out reposts (items with a reason field indicate repost/quote)
        if (item.reason) {
          return false;
        }
        return true;
      })
      .map(transformPost)
      .slice(0, 20); // Limit to ~20 most recent posts

    return posts;
  } catch (error) {
    console.error("Failed to fetch Bluesky posts:", error);
    return [];
  }
}

// Social statistics fetcher for displaying follower/subscriber counts
// Follows patterns established in bluesky.ts and github.ts

export interface SocialStats {
  bluesky?: number;
  github?: number;
  youtube?: number;
  twitter?: number;
}

interface BlueskyProfileResponse {
  did: string;
  handle: string;
  displayName?: string;
  followersCount?: number;
  followsCount?: number;
  postsCount?: number;
}

interface GitHubUserResponse {
  login: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface YouTubeChannelResponse {
  items?: Array<{
    statistics?: {
      subscriberCount?: string;
      viewCount?: string;
      videoCount?: string;
    };
  }>;
}

interface TwitterUserResponse {
  data?: {
    public_metrics?: {
      followers_count?: number;
      following_count?: number;
      tweet_count?: number;
    };
  };
}

/**
 * Fetches Bluesky follower count using the public API.
 * No authentication required.
 *
 * @returns Follower count or null on failure
 */
export async function getBlueskyFollowerCount(): Promise<number | null> {
  const actor = "santoshyadav.dev";

  try {
    const url = new URL(
      "https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile",
    );
    url.searchParams.set("actor", actor);

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Bluesky profile API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = (await response.json()) as BlueskyProfileResponse;

    if (typeof data.followersCount === "number") {
      return data.followersCount;
    }

    console.error("Unexpected Bluesky profile response structure");
    return null;
  } catch (error) {
    console.error("Failed to fetch Bluesky follower count:", error);
    return null;
  }
}

/**
 * Fetches GitHub follower count using the public API.
 * No authentication required for public profile data.
 *
 * @returns Follower count or null on failure
 */
export async function getGitHubFollowerCount(): Promise<number | null> {
  const username = "santoshyadavdev";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "santoshyadav-portfolio",
      },
    });

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = (await response.json()) as GitHubUserResponse;

    if (typeof data.followers === "number") {
      return data.followers;
    }

    console.error("Unexpected GitHub response structure");
    return null;
  } catch (error) {
    console.error("Failed to fetch GitHub follower count:", error);
    return null;
  }
}

/**
 * Fetches YouTube subscriber count using the YouTube Data API v3.
 * Requires YOUTUBE_API_KEY environment variable.
 *
 * @returns Subscriber count or null if API key missing or on failure
 */
export async function getYouTubeSubscriberCount(): Promise<number | null> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    // Silently skip if no API key - this is expected in many environments
    return null;
  }

  // Channel ID for TechTalksWithSantosh
  // Can be found from the channel URL or YouTube Studio
  const channelId = "UChvYTafHRgXKb0VbYGeG0nw";

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/channels");
    url.searchParams.set("part", "statistics");
    url.searchParams.set("id", channelId);
    url.searchParams.set("key", apiKey);

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `YouTube API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = (await response.json()) as YouTubeChannelResponse;

    const subscriberCount = data.items?.[0]?.statistics?.subscriberCount;
    if (subscriberCount) {
      return parseInt(subscriberCount, 10);
    }

    console.error("Unexpected YouTube API response structure");
    return null;
  } catch (error) {
    console.error("Failed to fetch YouTube subscriber count:", error);
    return null;
  }
}

/**
 * Fetches Twitter/X follower count using the X API v2.
 * Requires TWITTER_BEARER_TOKEN environment variable.
 *
 * @returns Follower count or null if bearer token missing or on failure
 */
export async function getTwitterFollowerCount(): Promise<number | null> {
  const bearerToken = import.meta.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    // Silently skip if no bearer token - this is expected in many environments
    return null;
  }

  const username = "santoshyadavdev";

  try {
    const url = new URL(
      `https://api.twitter.com/2/users/by/username/${username}`,
    );
    url.searchParams.set("user.fields", "public_metrics");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        `Twitter API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = (await response.json()) as TwitterUserResponse;

    const followersCount = data.data?.public_metrics?.followers_count;
    if (typeof followersCount === "number") {
      return followersCount;
    }

    console.error("Unexpected Twitter API response structure");
    return null;
  } catch (error) {
    console.error("Failed to fetch Twitter follower count:", error);
    return null;
  }
}

/**
 * Fetches social stats from all platforms in parallel.
 * Gracefully handles failures - returns null for any platform that fails
 * or lacks required credentials.
 *
 * @returns Combined social stats object
 */
export async function getSocialStats(): Promise<SocialStats> {
  const [bluesky, github, youtube, twitter] = await Promise.all([
    getBlueskyFollowerCount(),
    getGitHubFollowerCount(),
    getYouTubeSubscriberCount(),
    getTwitterFollowerCount(),
  ]);

  const stats: SocialStats = {};

  if (bluesky !== null) {
    stats.bluesky = bluesky;
  }
  if (github !== null) {
    stats.github = github;
  }
  if (youtube !== null) {
    stats.youtube = youtube;
  }
  if (twitter !== null) {
    stats.twitter = twitter;
  }

  return stats;
}

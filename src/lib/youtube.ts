const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_CHANNEL_ID = "UChvYTafHRgXKb0VbYGeG0nw";
export const YOUTUBE_TALKS_PLAYLIST_ID = "PLIcBJ5O4Mr10rK4Fv4uetG4mzn31Pw2oL";

interface YouTubeSearchResponse {
  items?: Array<{
    id?: {
      videoId?: string;
    };
    snippet?: {
      liveBroadcastContent?: string;
    };
  }>;
}

interface YouTubeVideosResponse {
  items?: Array<{
    id?: string;
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      liveBroadcastContent?: string;
      thumbnails?: {
        maxres?: { url?: string };
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
    liveStreamingDetails?: {
      scheduledStartTime?: string;
      actualStartTime?: string;
      actualEndTime?: string;
    };
    contentDetails?: {
      duration?: string;
    };
  }>;
}

interface YouTubeChannelsResponse {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
}

interface YouTubePlaylistItemsResponse {
  nextPageToken?: string;
  items?: Array<{
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      resourceId?: {
        videoId?: string;
      };
      thumbnails?: {
        maxres?: { url?: string };
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
  }>;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
  duration: string;
  platform: "YouTube";
}

export interface UpcomingStream extends YouTubeVideo {
  scheduledStartTime: string;
  isLive: boolean;
  liveBroadcastContent: string;
}

function getBestThumbnail(
  thumbnails?: {
    maxres?: { url?: string };
    high?: { url?: string };
    medium?: { url?: string };
    default?: { url?: string };
  },
  videoId?: string,
): string {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "")
  );
}

function formatDuration(isoDuration?: string): string {
  if (!isoDuration) {
    return "";
  }

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) {
    return "";
  }

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function buildVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function createYouTubeUrl(path: string, apiKey: string): URL {
  const url = new URL(`${YOUTUBE_API_BASE_URL}/${path}`);
  url.searchParams.set("key", apiKey);
  return url;
}

/**
 * Fetches upcoming/live streams for the configured channel.
 * Uses search.list for discovery (maxResults=5 for quota efficiency), then
 * videos.list for enriched metadata.
 */
export async function getUpcomingStreams(): Promise<UpcomingStream[]> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  const maxResults = 5;

  if (!apiKey) {
    return [];
  }

  try {
    const fetchSearchVideoIds = async (
      eventType: "upcoming" | "live",
    ): Promise<string[]> => {
      const searchUrl = createYouTubeUrl("search", apiKey);
      searchUrl.searchParams.set("part", "snippet");
      searchUrl.searchParams.set("channelId", YOUTUBE_CHANNEL_ID);
      searchUrl.searchParams.set("eventType", eventType);
      searchUrl.searchParams.set("type", "video");
      searchUrl.searchParams.set("order", "date");
      searchUrl.searchParams.set("maxResults", String(maxResults));

      const searchResponse = await fetch(searchUrl.toString(), {
        headers: {
          Accept: "application/json",
        },
      });

      if (!searchResponse.ok) {
        console.error(
          `YouTube search.list (${eventType}) error: ${searchResponse.status} ${searchResponse.statusText}`,
        );
        return [];
      }

      const searchData = (await searchResponse.json()) as YouTubeSearchResponse;
      return (
        searchData.items
          ?.map((item) => item.id?.videoId)
          .filter((videoId): videoId is string => Boolean(videoId)) ?? []
      );
    };

    const [liveVideoIds, upcomingVideoIds] = await Promise.all([
      fetchSearchVideoIds("live"),
      fetchSearchVideoIds("upcoming"),
    ]);

    const discoveredVideoIds = [
      ...new Set([...liveVideoIds, ...upcomingVideoIds]),
    ].slice(0, maxResults);

    if (discoveredVideoIds.length === 0) {
      return [];
    }

    const videosUrl = createYouTubeUrl("videos", apiKey);
    videosUrl.searchParams.set("part", "snippet,liveStreamingDetails");
    videosUrl.searchParams.set("id", discoveredVideoIds.join(","));

    const videosResponse = await fetch(videosUrl.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    if (!videosResponse.ok) {
      console.error(
        `YouTube videos.list error: ${videosResponse.status} ${videosResponse.statusText}`,
      );
      return [];
    }

    const videosData = (await videosResponse.json()) as YouTubeVideosResponse;

    const streams =
      videosData.items
        ?.map((item): UpcomingStream | null => {
          const id = item.id;
          const snippet = item.snippet;
          const liveDetails = item.liveStreamingDetails;

          if (!id || !snippet?.title) {
            return null;
          }

          const scheduledStartTime =
            liveDetails?.scheduledStartTime ||
            liveDetails?.actualStartTime ||
            snippet.publishedAt;

          if (!scheduledStartTime) {
            return null;
          }

          const liveBroadcastContent = snippet.liveBroadcastContent || "none";
          const isLive =
            liveBroadcastContent === "live" ||
            (Boolean(liveDetails?.actualStartTime) &&
              !Boolean(liveDetails?.actualEndTime));

          if (!["upcoming", "live"].includes(liveBroadcastContent) && !isLive) {
            return null;
          }

          return {
            id,
            title: snippet.title,
            description: snippet.description || "",
            thumbnail: getBestThumbnail(snippet.thumbnails, id),
            publishedAt: snippet.publishedAt || scheduledStartTime,
            url: buildVideoUrl(id),
            duration: isLive ? "Live" : "",
            platform: "YouTube",
            scheduledStartTime,
            isLive,
            liveBroadcastContent,
          };
        })
        .filter((stream): stream is UpcomingStream => Boolean(stream))
        .sort(
          (a, b) =>
            new Date(a.scheduledStartTime).getTime() -
            new Date(b.scheduledStartTime).getTime(),
        ) ?? [];

    return streams;
  } catch (error) {
    console.error("Failed to fetch upcoming streams:", error);
    return [];
  }
}

/**
 * Fetches all uploaded videos for the configured channel.
 * Uses channels.list + playlistItems.list for quota-efficient retrieval.
 */
export async function getChannelVideos(
  limit?: number,
): Promise<YouTubeVideo[]> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  const normalizedLimit =
    typeof limit === "number" && limit > 0 ? Math.floor(limit) : undefined;

  if (!apiKey) {
    return [];
  }

  try {
    const channelsUrl = createYouTubeUrl("channels", apiKey);
    channelsUrl.searchParams.set("part", "contentDetails");
    channelsUrl.searchParams.set("id", YOUTUBE_CHANNEL_ID);

    const channelResponse = await fetch(channelsUrl.toString(), {
      headers: {
        Accept: "application/json",
      },
    });

    if (!channelResponse.ok) {
      console.error(
        `YouTube channels.list error: ${channelResponse.status} ${channelResponse.statusText}`,
      );
      return [];
    }

    const channelData =
      (await channelResponse.json()) as YouTubeChannelsResponse;
    const uploadsPlaylistId =
      channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      console.error("Uploads playlist ID not found in channels.list response");
      return [];
    }

    const playlistItems: Array<{
      videoId: string;
      title: string;
      description: string;
      publishedAt: string;
      thumbnail: string;
    }> = [];

    let nextPageToken: string | undefined;

    do {
      const playlistUrl = createYouTubeUrl("playlistItems", apiKey);
      playlistUrl.searchParams.set("part", "snippet");
      playlistUrl.searchParams.set("playlistId", uploadsPlaylistId);
      const pageSize = normalizedLimit
        ? Math.min(50, Math.max(1, normalizedLimit - playlistItems.length))
        : 50;
      playlistUrl.searchParams.set("maxResults", String(pageSize));
      if (nextPageToken) {
        playlistUrl.searchParams.set("pageToken", nextPageToken);
      }

      const playlistResponse = await fetch(playlistUrl.toString(), {
        headers: {
          Accept: "application/json",
        },
      });

      if (!playlistResponse.ok) {
        console.error(
          `YouTube playlistItems.list error: ${playlistResponse.status} ${playlistResponse.statusText}`,
        );
        return [];
      }

      const playlistData =
        (await playlistResponse.json()) as YouTubePlaylistItemsResponse;

      const currentItems =
        playlistData.items
          ?.map((item) => {
            const snippet = item.snippet;
            const videoId = snippet?.resourceId?.videoId;

            if (!snippet?.title || !videoId || !snippet.publishedAt) {
              return null;
            }

            return {
              videoId,
              title: snippet.title,
              description: snippet.description || "",
              publishedAt: snippet.publishedAt,
              thumbnail: getBestThumbnail(snippet.thumbnails, videoId),
            };
          })
          .filter(
            (
              item,
            ): item is {
              videoId: string;
              title: string;
              description: string;
              publishedAt: string;
              thumbnail: string;
            } => Boolean(item),
          ) ?? [];

      playlistItems.push(...currentItems);
      if (normalizedLimit && playlistItems.length >= normalizedLimit) {
        break;
      }
      nextPageToken = playlistData.nextPageToken;
    } while (nextPageToken);

    if (playlistItems.length === 0) {
      return [];
    }

    const videosToProcess = normalizedLimit
      ? playlistItems.slice(0, normalizedLimit)
      : playlistItems;

    const durationByVideoId = new Map<string, string>();
    for (let index = 0; index < videosToProcess.length; index += 50) {
      const batchIds = videosToProcess
        .slice(index, index + 50)
        .map((item) => item.videoId);

      const videosUrl = createYouTubeUrl("videos", apiKey);
      videosUrl.searchParams.set("part", "contentDetails");
      videosUrl.searchParams.set("id", batchIds.join(","));

      const videosResponse = await fetch(videosUrl.toString(), {
        headers: {
          Accept: "application/json",
        },
      });

      if (!videosResponse.ok) {
        console.error(
          `YouTube videos.list error: ${videosResponse.status} ${videosResponse.statusText}`,
        );
        continue;
      }

      const videosData = (await videosResponse.json()) as YouTubeVideosResponse;
      for (const item of videosData.items || []) {
        if (item.id) {
          durationByVideoId.set(
            item.id,
            formatDuration(item.contentDetails?.duration),
          );
        }
      }
    }

    return videosToProcess.map((item) => ({
      id: item.videoId,
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail,
      publishedAt: item.publishedAt,
      url: buildVideoUrl(item.videoId),
      duration: durationByVideoId.get(item.videoId) || "",
      platform: "YouTube",
    }));
  } catch (error) {
    console.error("Failed to fetch channel videos:", error);
    return [];
  }
}

/**
 * Fetches videos from a specific YouTube playlist by ID.
 * Skips the channels.list call and uses the provided playlist ID directly.
 */
export async function getPlaylistVideos(
  playlistId: string,
  limit?: number,
): Promise<YouTubeVideo[]> {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  const normalizedLimit =
    typeof limit === "number" && limit > 0 ? Math.floor(limit) : undefined;

  if (!apiKey) {
    return [];
  }

  try {
    const playlistItems: Array<{
      videoId: string;
      title: string;
      description: string;
      publishedAt: string;
      thumbnail: string;
    }> = [];

    let nextPageToken: string | undefined;

    do {
      const playlistUrl = createYouTubeUrl("playlistItems", apiKey);
      playlistUrl.searchParams.set("part", "snippet");
      playlistUrl.searchParams.set("playlistId", playlistId);
      const pageSize = normalizedLimit
        ? Math.min(50, Math.max(1, normalizedLimit - playlistItems.length))
        : 50;
      playlistUrl.searchParams.set("maxResults", String(pageSize));
      if (nextPageToken) {
        playlistUrl.searchParams.set("pageToken", nextPageToken);
      }

      const playlistResponse = await fetch(playlistUrl.toString(), {
        headers: {
          Accept: "application/json",
        },
      });

      if (!playlistResponse.ok) {
        console.error(
          `YouTube playlistItems.list error: ${playlistResponse.status} ${playlistResponse.statusText}`,
        );
        return [];
      }

      const playlistData =
        (await playlistResponse.json()) as YouTubePlaylistItemsResponse;

      const currentItems =
        playlistData.items
          ?.map((item) => {
            const snippet = item.snippet;
            const videoId = snippet?.resourceId?.videoId;

            if (!snippet?.title || !videoId || !snippet.publishedAt) {
              return null;
            }

            return {
              videoId,
              title: snippet.title,
              description: snippet.description || "",
              publishedAt: snippet.publishedAt,
              thumbnail: getBestThumbnail(snippet.thumbnails, videoId),
            };
          })
          .filter(
            (
              item,
            ): item is {
              videoId: string;
              title: string;
              description: string;
              publishedAt: string;
              thumbnail: string;
            } => Boolean(item),
          ) ?? [];

      playlistItems.push(...currentItems);
      if (normalizedLimit && playlistItems.length >= normalizedLimit) {
        break;
      }
      nextPageToken = playlistData.nextPageToken;
    } while (nextPageToken);

    if (playlistItems.length === 0) {
      return [];
    }

    const videosToProcess = normalizedLimit
      ? playlistItems.slice(0, normalizedLimit)
      : playlistItems;

    const durationByVideoId = new Map<string, string>();
    for (let index = 0; index < videosToProcess.length; index += 50) {
      const batchIds = videosToProcess
        .slice(index, index + 50)
        .map((item) => item.videoId);

      const videosUrl = createYouTubeUrl("videos", apiKey);
      videosUrl.searchParams.set("part", "contentDetails");
      videosUrl.searchParams.set("id", batchIds.join(","));

      const videosResponse = await fetch(videosUrl.toString(), {
        headers: {
          Accept: "application/json",
        },
      });

      if (!videosResponse.ok) {
        console.error(
          `YouTube videos.list error: ${videosResponse.status} ${videosResponse.statusText}`,
        );
        continue;
      }

      const videosData = (await videosResponse.json()) as YouTubeVideosResponse;
      for (const item of videosData.items || []) {
        if (item.id) {
          durationByVideoId.set(
            item.id,
            formatDuration(item.contentDetails?.duration),
          );
        }
      }
    }

    return videosToProcess.map((item) => ({
      id: item.videoId,
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail,
      publishedAt: item.publishedAt,
      url: buildVideoUrl(item.videoId),
      duration: durationByVideoId.get(item.videoId) || "",
      platform: "YouTube",
    }));
  } catch (error) {
    console.error("Failed to fetch playlist videos:", error);
    return [];
  }
}

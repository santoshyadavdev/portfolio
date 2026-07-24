import { XMLParser } from "fast-xml-parser";

export interface NewsletterItem {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  guid: string;
  thumbnail?: string;
}

interface RssItem {
  title?: string;
  link?: string;
  description?: string;
  pubDate?: string;
  guid?: string | { "#text": string };
  "media:thumbnail"?: { "@_url": string } | string;
  enclosure?: { "@_url": string };
  "content:encoded"?: string;
}

function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : undefined;
}

interface RssFeed {
  rss?: {
    channel?: {
      item?: RssItem | RssItem[];
    };
  };
}

/**
 * Fetches and parses newsletter items from the Beehiiv RSS feed.
 *
 * @returns Array of NewsletterItem objects or empty array on failure
 */
export async function getNewsletterItems(): Promise<NewsletterItem[]> {
  const feedUrl = "https://rss.beehiiv.com/feeds/pTujNhmKoB.xml";

  try {
    const response = await fetch(feedUrl, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      console.error(
        `Newsletter feed error: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
    });

    const parsed = parser.parse(xml) as RssFeed;

    const channel = parsed?.rss?.channel;
    if (!channel) {
      console.error("Unexpected newsletter feed structure");
      return [];
    }

    const rawItems = channel.item
      ? Array.isArray(channel.item)
        ? channel.item
        : [channel.item]
      : [];

    return rawItems.map((item): NewsletterItem => {
      const guid =
        typeof item.guid === "object" ? item.guid["#text"] : (item.guid ?? "");
      const mediaThumbnail =
        typeof item["media:thumbnail"] === "object"
          ? item["media:thumbnail"]["@_url"]
          : item["media:thumbnail"];

      const contentImage = item["content:encoded"]
        ? extractFirstImage(item["content:encoded"])
        : undefined;

      const thumbnail =
        mediaThumbnail ??
        contentImage ??
        (typeof item.enclosure === "object"
          ? item.enclosure["@_url"]
          : undefined);

      return {
        title: item.title ?? "",
        link: item.link ?? "",
        description: item.description ?? "",
        pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
        guid,
        thumbnail,
      };
    });
  } catch (error) {
    console.error("Failed to fetch newsletter items:", error);
    return [];
  }
}

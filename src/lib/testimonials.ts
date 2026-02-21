export interface SocialLink {
  platform: string;
  url: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  authorLogin: string;
  authorName: string;
  authorAvatarUrl: string;
  socialLinks: SocialLink[];
  createdAt: Date;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  name?: string | null;
}

interface GitHubIssue {
  number: number;
  title: string;
  body: string | null;
  created_at: string;
  user: GitHubUser | null;
}

/**
 * Fetches open issues from the testimonial repository.
 *
 * @returns Array of GitHub issues or empty array on failure
 */
async function fetchTestimonialIssues(): Promise<GitHubIssue[]> {
  const token = import.meta.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      "https://api.github.com/repos/santoshyadavdev/testimonial/issues?state=open",
      { headers },
    );

    if (!response.ok) {
      console.warn(
        `GitHub testimonials API error: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    return (await response.json()) as GitHubIssue[];
  } catch (error) {
    console.warn("Failed to fetch testimonial issues:", error);
    return [];
  }
}

/**
 * Identifies the social platform from a URL string.
 */
function identifyPlatform(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname === "twitter.com" || hostname === "www.twitter.com" || hostname === "x.com" || hostname === "www.x.com") return "twitter";
    if (hostname === "linkedin.com" || hostname === "www.linkedin.com") return "linkedin";
    if (hostname === "peerlist.io" || hostname === "www.peerlist.io") return "peerlist";
    if (hostname === "github.com" || hostname === "www.github.com") return "github";
    if (hostname === "bsky.app" || hostname === "www.bsky.app") return "bluesky";
  } catch {
    // Invalid URL - fall through to default
  }
  return "link";
}

/**
 * Parses a GitHub issue body to extract testimonial data.
 * Returns null if consent is not granted.
 */
export function parseIssueBody(
  body: string,
): { quote: string; socialLinks: SocialLink[]; hasConsent: boolean } | null {
  const lines = body.split("\n");

  // Find all lines that start with "## https://"
  const socialLinkLines = lines.filter((line) =>
    /^##\s+https?:\/\//.test(line.trim()),
  );

  const socialLinks: SocialLink[] = socialLinkLines.map((line) => {
    const url = line.trim().replace(/^##\s+/, "").trim();
    return { platform: identifyPlatform(url), url };
  });

  // Extract quote: all text before the first social link line (## https://...)
  const firstSocialIndex = lines.findIndex((line) =>
    /^##\s+https?:\/\//.test(line.trim()),
  );

  const quoteLines =
    firstSocialIndex > -1 ? lines.slice(0, firstSocialIndex) : lines;

  // Remove leading/trailing ## markers and whitespace
  const quote = quoteLines
    .map((line) => line.replace(/^#+\s*/, "").replace(/\s*#+$/, "").trim())
    .filter((line) => line.length > 0)
    .join(" ")
    .trim();

  // Check for consent: look for [x], [X], or [✔️] before "Yes" (case-insensitive)
  const hasConsent = /\[(?:x|X|✔️)\]\s*Yes/i.test(body);

  if (!hasConsent) {
    return null;
  }

  return { quote, socialLinks, hasConsent };
}

/**
 * Fetches and returns all testimonials with consent, sorted by most recent first.
 *
 * @returns Typed Testimonial array
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const issues = await fetchTestimonialIssues();

  const testimonials: Testimonial[] = [];

  for (const issue of issues) {
    if (!issue.body || !issue.user) continue;

    const parsed = parseIssueBody(issue.body);
    if (!parsed) continue;

    testimonials.push({
      id: issue.number,
      quote: parsed.quote,
      authorLogin: issue.user.login,
      authorName: issue.user.name || issue.user.login,
      authorAvatarUrl: issue.user.avatar_url,
      socialLinks: parsed.socialLinks,
      createdAt: new Date(issue.created_at),
    });
  }

  // Sort by creation date descending (most recent first)
  testimonials.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return testimonials;
}

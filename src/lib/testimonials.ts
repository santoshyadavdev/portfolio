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
// Returns the issues array on success (possibly empty), or null when the
// request fails, so callers can distinguish "no testimonials" from an outage.
async function fetchTestimonialIssues(): Promise<GitHubIssue[] | null> {
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
      return null;
    }

    return (await response.json()) as GitHubIssue[];
  } catch (error) {
    console.warn("Failed to fetch testimonial issues:", error);
    return null;
  }
}

/**
 * Identifies the social platform from a URL string.
 */
function identifyPlatform(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (
      hostname === "twitter.com" ||
      hostname === "www.twitter.com" ||
      hostname === "x.com" ||
      hostname === "www.x.com"
    )
      return "twitter";
    if (hostname === "linkedin.com" || hostname === "www.linkedin.com")
      return "linkedin";
    if (hostname === "peerlist.io" || hostname === "www.peerlist.io")
      return "peerlist";
    if (hostname === "github.com" || hostname === "www.github.com")
      return "github";
    if (hostname === "bsky.app" || hostname === "www.bsky.app")
      return "bluesky";
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
    const url = line
      .trim()
      .replace(/^##\s+/, "")
      .trim();
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
    .map((line) =>
      line
        .replace(/^#+\s*/, "")
        .replace(/\s*#+$/, "")
        .trim(),
    )
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
 * Fetches a GitHub user's profile to get their display name.
 */
async function fetchGitHubUserName(
  login: string,
  headers: Record<string, string>,
): Promise<string | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers,
    });
    if (!response.ok) return null;
    const user = (await response.json()) as { name?: string | null };
    return user.name || null;
  } catch {
    return null;
  }
}

/**
 * Fetches and returns all testimonials with consent, sorted by most recent first.
 *
 * @returns Typed Testimonial array
 */
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 3,
    quote:
      "I am happy to write this testimonial for my ex-colleague and friend who is having exceptional skills in Angular-related technologies. He was a highly motivated, proactive, and talented developer, who always exceeded his boundaries. His ability to learn new things quickly and apply them to his work was truly inspiring.",
    authorLogin: "HimanshuGoel",
    authorName: "Himanshu Goel",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/6235979?v=4",
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/himanshugoelmca" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/himanshu-goel-mca/",
      },
    ],
    createdAt: new Date("2023-03-16T13:20:43Z"),
  },
  {
    id: 2,
    quote:
      "Been knowing Santosh for more than a year now. I am nobody to give him a testimony for his development skills but I will surely say that he's a great human being who is working so hard for the open source community! His contribution to the community is tremendous and not quantifiable.",
    authorLogin: "designerdada",
    authorName: "Designer Dada",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/5697992?v=4",
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/designerdada" },
      { platform: "peerlist", url: "https://peerlist.io/designerdada" },
    ],
    createdAt: new Date("2023-03-07T12:43:49Z"),
  },
  {
    id: 1,
    quote:
      "Santosh is a very talented, yet down to earth individual. I am constantly amazed by his tireless community building efforts. He is a role-model for one and all and there is something to learn from him for everyone. His persistence to always remain involved in learning and sharing is unparallel.",
    authorLogin: "plug-n-play",
    authorName: "Amandeep Singh Bajwa",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/6245927?v=4",
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/learn_n_share" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/amandeep-singh-bajwa",
      },
    ],
    createdAt: new Date("2023-03-07T09:34:39Z"),
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  const issues = await fetchTestimonialIssues();
  // Only fall back on a fetch failure (null). A successful empty result means
  // there are genuinely no testimonials to show.
  if (issues === null) {
    return FALLBACK_TESTIMONIALS;
  }
  if (issues.length === 0) {
    return [];
  }

  const token = import.meta.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

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

  // Fetch real display names in parallel for any author whose name fell back to login
  await Promise.all(
    testimonials.map(async (t) => {
      if (t.authorName === t.authorLogin) {
        const realName = await fetchGitHubUserName(t.authorLogin, headers);
        if (realName) t.authorName = realName;
      }
    }),
  );

  // Sort by creation date descending (most recent first)
  testimonials.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return testimonials;
}

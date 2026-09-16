export interface Sponsor {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  monthlyAmount?: number;
}

export interface SponsorsResult {
  sponsors: Sponsor[];
  totalMonthlyAmount: number;
}

interface SponsorNode {
  sponsorable: {
    __typename: string;
    login: string;
    name: string | null;
    avatarUrl: string;
    url: string;
  };
  tier?: {
    monthlyPriceInDollars: number;
  };
}

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

interface SponsorshipConnection {
  nodes: SponsorNode[];
  pageInfo: PageInfo;
}

interface ViewerData {
  viewer: {
    sponsorshipsAsSponsor: SponsorshipConnection;
  };
}

/**
 * Fetches the list of sponsors (users/orgs that the authenticated user sponsors) from GitHub.
 * Requires GITHUB_TOKEN environment variable with 'read:user' scope.
 */
export async function getSponsors(): Promise<SponsorsResult> {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN not found. Skipping sponsor data fetch.");
    return { sponsors: [], totalMonthlyAmount: 0 };
  }

  const sponsors: Sponsor[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  try {
    while (hasNextPage) {
      const query = `
        query($cursor: String) {
          viewer {
            sponsorshipsAsSponsor(first: 100, after: $cursor) {
              nodes {
                tier {
                  monthlyPriceInDollars
                }
                sponsorable {
                  __typename
                  ... on User {
                    login
                    name
                    avatarUrl
                    url
                  }
                  ... on Organization {
                    login
                    name
                    avatarUrl
                    url
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { cursor: endCursor },
        }),
      });

      if (!response.ok) {
        console.error(
          `GitHub API error: ${response.status} ${response.statusText}`,
        );
        return { sponsors: [], totalMonthlyAmount: 0 };
      }

      const data = (await response.json()) as { data: ViewerData };

      if (!data.data?.viewer?.sponsorshipsAsSponsor) {
        console.error("Unexpected API response structure");
        return { sponsors: [], totalMonthlyAmount: 0 };
      }

      const connection = data.data.viewer.sponsorshipsAsSponsor;

      connection.nodes.forEach((node) => {
        const { login, name, avatarUrl, url } = node.sponsorable;
        const monthlyAmount = node.tier?.monthlyPriceInDollars;
        sponsors.push({ login, name, avatarUrl, url, monthlyAmount });
      });

      hasNextPage = connection.pageInfo.hasNextPage;
      endCursor = connection.pageInfo.endCursor;
    }

    const totalMonthlyAmount = sponsors.reduce(
      (sum, sponsor) => sum + (sponsor.monthlyAmount || 0),
      0,
    );

    return { sponsors, totalMonthlyAmount };
  } catch (error) {
    console.error("Failed to fetch sponsors:", error);
    return { sponsors: [], totalMonthlyAmount: 0 };
  }
}

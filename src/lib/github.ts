export interface Sponsor {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
}

interface SponsorNode {
  sponsorable: {
    __typename: string;
    login: string;
    name: string | null;
    avatarUrl: string;
    url: string;
  };
}

interface MySponsorNode {
  sponsorEntity: {
    __typename: string;
    login: string;
    name: string | null;
    avatarUrl: string;
    url: string;
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

interface MySponsorshipConnection {
  nodes: MySponsorNode[];
  pageInfo: PageInfo;
}

interface ViewerData {
  viewer: {
    sponsorshipsAsSponsor: SponsorshipConnection;
  };
}

interface MySponsorsData {
  viewer: {
    sponsorshipsAsMaintainer: MySponsorshipConnection;
  };
}

/**
 * Fetches the list of sponsors (users/orgs that the authenticated user sponsors) from GitHub.
 * Requires GITHUB_TOKEN environment variable with 'read:user' scope.
 *
 * @returns Array of sponsor data or empty array if token is missing or API call fails
 */
export async function getSponsors(): Promise<Sponsor[]> {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN not found. Skipping sponsor data fetch.");
    return [];
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
        return [];
      }

      const data = (await response.json()) as { data: ViewerData };

      if (!data.data?.viewer?.sponsorshipsAsSponsor) {
        console.error("Unexpected API response structure");
        return [];
      }

      const connection = data.data.viewer.sponsorshipsAsSponsor;

      connection.nodes.forEach((node) => {
        const { login, name, avatarUrl, url } = node.sponsorable;
        sponsors.push({ login, name, avatarUrl, url });
      });

      hasNextPage = connection.pageInfo.hasNextPage;
      endCursor = connection.pageInfo.endCursor;
    }

    return sponsors;
  } catch (error) {
    console.error("Failed to fetch sponsors:", error);
    return [];
  }
}

/**
 * Fetches the list of people/orgs who sponsor the authenticated user from GitHub.
 * Requires GITHUB_TOKEN environment variable with 'read:user' scope.
 *
 * @returns Array of sponsor data or empty array if token is missing or API call fails
 */
export async function getMySponsors(): Promise<Sponsor[]> {
  const token = import.meta.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN not found. Skipping my sponsors data fetch.");
    return [];
  }

  const sponsors: Sponsor[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  try {
    while (hasNextPage) {
      const query = `
        query($cursor: String) {
          viewer {
            sponsorshipsAsMaintainer(first: 100, after: $cursor) {
              nodes {
                sponsorEntity {
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
        return [];
      }

      const data = (await response.json()) as {
        data?: MySponsorsData;
        errors?: unknown[];
      };

      if (data.errors) {
        console.error("GitHub GraphQL errors:", data.errors);
        return [];
      }

      if (!data.data?.viewer?.sponsorshipsAsMaintainer) {
        console.error(
          "Unexpected API response structure for my sponsors:",
          JSON.stringify(data),
        );
        return [];
      }

      const connection = data.data.viewer.sponsorshipsAsMaintainer;

      // Custom URL overrides for specific sponsors
      const customUrls: Record<string, string> = {
        coderabbitai: "https://www.coderabbit.ai/",
      };

      connection.nodes.forEach((node) => {
        if (node.sponsorEntity) {
          const { login, name, avatarUrl, url } = node.sponsorEntity;
          const customUrl = customUrls[login.toLowerCase()] || url;
          sponsors.push({ login, name, avatarUrl, url: customUrl });
        }
      });

      hasNextPage = connection.pageInfo.hasNextPage;
      endCursor = connection.pageInfo.endCursor;
    }

    return sponsors;
  } catch (error) {
    console.error("Failed to fetch my sponsors:", error);
    return [];
  }
}

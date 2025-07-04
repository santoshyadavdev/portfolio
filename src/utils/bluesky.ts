// Bluesky API utilities
export interface BlueskyPost {
  uri: string;
  cid: string;
  record: {
    text: string;
    createdAt: string;
    langs?: string[];
  };
  author: {
    did: string;
    handle: string;
    displayName?: string;
    avatar?: string;
  };
  replyCount?: number;
  repostCount?: number;
  likeCount?: number;
  indexedAt: string;
}

export interface BlueskyFeedResponse {
  feed: {
    post: BlueskyPost;
  }[];
  cursor?: string;
}

/**
 * Fetch recent posts from Bluesky for a given user
 */
export async function getBlueskyPosts(actor: string, limit: number = 10): Promise<BlueskyPost[]> {
  try {
    // Use the public Bluesky API endpoint
    const response = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${actor}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const data: BlueskyFeedResponse = await response.json();
    
    // Extract posts from the feed
    return data.feed.map(item => item.post);
    
  } catch (error) {
    console.error('Error fetching Bluesky posts:', error);
    
    // Return mock data for development/fallback
    return getMockBlueskyPosts(limit);
  }
}

/**
 * Mock data for development and fallback
 */
function getMockBlueskyPosts(limit: number): BlueskyPost[] {
  const mockPosts: BlueskyPost[] = [
    {
      uri: "at://mock1",
      cid: "mock-cid-1",
      record: {
        text: "Excited to share my latest Angular project! Working on some amazing new features with standalone components. #Angular #WebDev",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 3,
      repostCount: 12,
      likeCount: 45,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      uri: "at://mock2",
      cid: "mock-cid-2", 
      record: {
        text: "Just finished a great session on tree shaking in Angular! The performance improvements are incredible when done right. 🚀",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 5,
      repostCount: 18,
      likeCount: 67,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
    },
    {
      uri: "at://mock3",
      cid: "mock-cid-3",
      record: {
        text: "Loving the new Astro 5.0 features! The performance and developer experience keep getting better. Time to update my portfolio site.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 2,
      repostCount: 8,
      likeCount: 34,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
      uri: "at://mock4",
      cid: "mock-cid-4",
      record: {
        text: "Speaking at the upcoming Angular conference! Will be talking about micro-frontends and monorepo strategies. Who's attending? 🎤",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 8,
      repostCount: 25,
      likeCount: 89,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString()
    },
    {
      uri: "at://mock5",
      cid: "mock-cid-5",
      record: {
        text: "Great discussion about the future of web development on my YouTube channel. Thanks to everyone who joined the live stream! 📺",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 12,
      repostCount: 15,
      likeCount: 78,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    },
    {
      uri: "at://mock6",
      cid: "mock-cid-6",
      record: {
        text: "Working on some exciting new open source contributions. The Angular community continues to amaze me! 💪 #OpenSource",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 4,
      repostCount: 11,
      likeCount: 56,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
    },
    {
      uri: "at://mock7", 
      cid: "mock-cid-7",
      record: {
        text: "Just released a new tutorial on Nx workspaces. Check it out if you're looking to scale your Angular applications! 🔗",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 6,
      repostCount: 19,
      likeCount: 92,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString()
    },
    {
      uri: "at://mock8",
      cid: "mock-cid-8", 
      record: {
        text: "Reflecting on my journey as a GDE and GitHub Star. Grateful for the amazing opportunities to help the developer community! 🙏",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 5 days ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 15,
      repostCount: 32,
      likeCount: 156,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
    },
    {
      uri: "at://mock9",
      cid: "mock-cid-9",
      record: {
        text: "Coffee, code, and contemplation. Perfect way to start the weekend! What are you all working on? ☕ #WeekendVibes",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(), // 6 days ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 23,
      repostCount: 8,
      likeCount: 67,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString()
    },
    {
      uri: "at://mock10",
      cid: "mock-cid-10",
      record: {
        text: "Excited to announce my collaboration with the Angular team on some upcoming features. Can't share details yet, but stay tuned! 🤐✨",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(), // 7 days ago
        langs: ["en"]
      },
      author: {
        did: "did:plc:mock",
        handle: "santoshyadav.dev",
        displayName: "Santosh Yadav",
        avatar: "../images/undraw/santosh_yadav.jpg"
      },
      replyCount: 18,
      repostCount: 41,
      likeCount: 203,
      indexedAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString()
    }
  ];

  return mockPosts.slice(0, limit);
}
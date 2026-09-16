import type { CollectionEntry } from "astro:content";

export type Frontmatter = CollectionEntry<"blog">["data"];

export type PageMeta = Pick<
  Frontmatter,
  | "title"
  | "description"
  | "author"
  | "publishDate"
  | "updatedDate"
  | "coverSVG"
  | "coverImage"
  | "socialImage"
  | "tags"
  | "canonicalUrl"
  | "atUri"
  | "noindex"
>;

export interface TagType {
  tag: string;
  count: number;
  pages: CollectionEntry<"blog">[];
}

export const SiteMetadata = {
  title:
    "Santosh Yadav - Principal Developer Advocate & Open Source Contributor",
  description:
    "Principal Developer Advocate at CodeRabbit, writing and teaching about Angular, monorepos and code review tooling. Google Developer Expert for Angular, GitHub Star, Microsoft MVP, Nx Champion, and host of the This is Tech Talks podcast.",
  author: {
    name: "Santosh Yadav",
    twitter: "@SantoshYadavDev",
    url: "https://santoshyadav.dev",
    email: "santosh.yadav198613@gmail.com",
    summary: "Software Engineer.",
  },
  org: {
    name: "Santosh Yadav",
    twitter: "@SantoshYadavDev",
    url: "https://santoshyadav.dev",
    email: "santosh.yadav198613@gmail.com",
    summary: "GDE Angular, GitHub Star.",
  },
  location: "Stade, Germany",
  social: [
    {
      name: "Email",
      link: "mailto:santosh.yadav198613@gmail.com",
      icon: "mdi:email-open-outline",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/santoshyadavdev/",
      icon: "mdi:linkedin",
    },
    {
      name: "Github",
      link: "https://github.com/santoshyadavdev",
      icon: "mdi:github",
    },
    {
      name: "Youtube",
      link: "https://www.youtube.com/@TechTalksWithSantosh",
      icon: "mdi:youtube",
    },
    {
      name: "Bluesky",
      link: "https://bsky.app/profile/santoshyadav.dev",
      icon: "bluesky",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/santoshyadavdev",
      icon: "mdi:twitter",
    },
  ],
  buildTime: new Date(),
};

export const HeroRoles = [
  "Google Developer Expert",
  "GitHub Star",
  "Microsoft MVP",
  "Nx Champion",
];

export const Logo = "../images/santosh-og.jpg";
export const LogoImage = "../images/astro/full-logo-light.png";
export const FeaturedSVG = "../images/svg/undraw/santosh_yadav.svg";
export const DefaultSVG = "../images/svg/undraw/undraw_my_feed.svg";
export const DefaultImage = "../images/undraw/undraw_my_feed.png";

export const NavigationLinks = [
  { name: "Home", href: "" },
  { name: "Blog", href: "blog" },
  { name: "Projects", href: "projects" },
  { name: "Talks", href: "talks" },
  { name: "Videos", href: "videos" },
  { name: "Press", href: "press" },
  { name: "Newsletter", href: "newsletter" },
  { name: "Work with Me", href: "work-with-me" },
  { name: "Contact", href: "contact" },
];

export const SecondaryNavigationLinks = [
  { name: "My Journey", href: "about" },
  { name: "My Podcast", href: "my-podcast" },
  { name: "Appearances", href: "appearances" },
  { name: "Calendar", href: "calendar" },
  { name: "Course", href: "course/angular-getting-started" },
  { name: "Open Source Support", href: "sponsors" },
];

const defaultCategory = {
  coverSVG: "../images/svg/undraw/undraw_instant_information.svg",
  socialImage: "../images/undraw/undraw_instant_information.png",
};

export function categoryDetail(category: string | undefined) {
  const normalizedCategory = category ?? "General";
  return {
    ...defaultCategory,
    category: normalizedCategory,
    description: "Category " + normalizedCategory,
  };
}

export const DefaultAuthor = {
  name: "Santosh Yadav",
  description: "GDE Angular, GitHub Star.",
  contact: "santosh.yadav198613@gmail.com",
  image: "../images/santosh-og.jpg",
};

export const PAGE_SIZE = 6;

export const StandardSite = {
  did: "did:plc:7sagqfh4v4t6zl7bdwbikdc2",
  publicationRkey: "3movlwuuiny2s",
  get publicationAtUri() {
    return `at://${this.did}/site.standard.publication/${this.publicationRkey}`;
  },
};

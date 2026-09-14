import { getCollection, type CollectionEntry } from "astro:content";

export type Frontmatter = CollectionEntry<"blog">["data"];

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
  repository: "",
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

export const HeroAchievements = [
  {
    label: "Google Developer Expert",
    color:
      "text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-600",
  },
  {
    label: "GitHub Star",
    color:
      "text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-600",
  },
  {
    label: "Microsoft MVP",
    color:
      "text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-600",
  },
  {
    label: "Nx Champion",
    color:
      "text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-600",
  },
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

export const CategoryDetail = [
  {
    category: "instructions",
    coverSVG: "../images/svg/undraw/undraw_instruction_manual.svg",
    socialImage: "../images/undraw/undraw_instruction_manual.png",
    description: "Guidelines on using this starter.",
  },
  {
    category: "information",
    coverSVG: "../images/svg/undraw/undraw_instant_information.svg",
    socialImage: "../images/undraw/undraw_instant_information.png",
    description: "Information articles.",
  },
];

export function categoryDetail(category: string | undefined) {
  const details = CategoryDetail.filter((cat) => cat.category == category);

  if (details.length == 1) {
    return details[0];
  }
  return {
    category: "General",
    coverSVG: "../images/svg/undraw/undraw_instant_information.svg",
    socialImage: "../images/undraw/undraw_instant_information.png",
    description: "Category " + category,
  };
}
export const AuthorDetail = [
  {
    name: "Santosh Yadav",
    description: "GDE Angular, GitHub Star.",
    contact: "santosh.yadav198613@gmail.com",
    image: "../images/santosh-og.jpg",
  },
];

export const DefaultAuthor = {
  name: "Santosh Yadav",
  description: "GDE Angular, GitHub Star.",
  contact: "santosh.yadav198613@gmail.com",
  image: "../images/santosh-og.jpg",
};

export function authorDetail(author: string | undefined) {
  const details = AuthorDetail.filter((person) => person.name == author);

  if (details.length == 1) {
    return details[0];
  }
  return DefaultAuthor;
}

export const PAGE_SIZE = 6;

// Standard.site (AT Protocol) configuration
// See: https://standard.site/docs/quick-start/
export const StandardSite = {
  did: "did:plc:7sagqfh4v4t6zl7bdwbikdc2",
  publicationRkey: "3movlwuuiny2s",
  get publicationAtUri() {
    return `at://${this.did}/site.standard.publication/${this.publicationRkey}`;
  },
};

export const GITHUB_EDIT_URL = `https://github.com/santoshyadavdev/portfolio/blob/main`;

export type Sidebar = Record<string, { text: string; link: string }[]>;

export const SIDEBAR: Sidebar = {
  Courses: [
    { text: "Angular Angular Started", link: "course/angular-getting-started" },
    { text: "Angular 16", link: "course/angular" },
  ],
};

export async function getPosts() {
  const posts = await getCollection("blog", ({ data }) => {
    return data.draft !== true;
  });
  return posts.sort((a, b) =>
    a.data.publishDate && b.data.publishDate
      ? +b.data.publishDate - +a.data.publishDate
      : 0,
  );
}

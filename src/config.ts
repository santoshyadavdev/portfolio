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
    "Principal Developer Advocate at CodeRabbit. Unlocking developer productivity through intelligent Code Reviews and scalable Monorepo strategies. Recognized as a Google Developer Expert (Angular), GitHub Star, Nx Champion, and Microsoft MVP. 🎙️ Host of This is Tech Talks. I bridge the gap between complex engineering and developer success, dedicated to empowering the next generation of developers.",
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
      icon: "skill-icons:linkedin",
    },
    {
      name: "Github",
      link: "https://github.com/santoshyadavdev",
      icon: "mdi:github",
    },
    {
      name: "Youtube",
      link: "https://www.youtube.com/@TechTalksWithSantosh",
      icon: "logos:youtube-icon",
    },
    {
      name: "Bluesky",
      link: "https://bsky.app/profile/santoshyadav.dev",
      icon: "logos:bluesky",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/santoshyadavdev",
      icon: "pajamas:twitter",
    },
  ],
  buildTime: new Date(),
};

export const HeroRoles = [
  "Developer Advocate",
  "Angular Expert",
  "GDE & GitHub Star",
  "Podcast Host",
];

export const HeroAchievements = [
  {
    label: "Google Developer Expert",
    color:
      "text-green-700 dark:text-green-400 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/30",
  },
  {
    label: "GitHub Star ⭐",
    color:
      "text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30",
  },
  {
    label: "Microsoft MVP",
    color:
      "text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30",
  },
  {
    label: "Nx Champion 🏆",
    color:
      "text-teal-700 dark:text-teal-400 border-teal-300 dark:border-teal-700 bg-teal-50 dark:bg-teal-900/30",
  },
];

export const Logo = "../images/svg/undraw/santosh_yadav.svg";
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

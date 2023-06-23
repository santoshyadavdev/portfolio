import type { MarkdownInstance } from 'astro'
import type { CollectionEntry } from 'astro:content'

export type Frontmatter = CollectionEntry<'blog'>['data']

export interface TagType {
  tag: string
  count: number
  pages: CollectionEntry<'blog'>[]
}

export const SiteMetadata = {
  title: 'Santosh Yadav',
  description: 'Santosh Yadav GDE Angular, GitHub Star.',
  author: {
    name: 'Santosh Yadav',
    twitter: '@SantoshYadavDev',
    url: 'https://santoshyadav.dev',
    email: 'santosh.yadav198613@gmail.com',
    summary: 'Software Engineer.',
  },
  org: {
    name: 'Santosh Yadav',
    twitter: '@SantoshYadavDev',
    url: 'https://santoshyadav.dev',
    email: 'santosh.yadav198613@gmail.com',
    summary: 'GDE Angular, GitHub Star.',
  },
  repository: '',
  social: [
    {
      name: 'Email',
      link: 'mailto:santosh.yadav198613@gmail.com',
      icon: 'envelope',
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/santoshyadavdev/',
      icon: 'linkedin',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/santoshyadavdev',
      icon: 'twitter',
    },
    {
      name: 'Github',
      link: 'https://github.com/santoshyadavdev',
      icon: 'github',
    },
  ],
  buildTime: new Date(),
}

export const Logo = '../images/svg/undraw/santosh_yadav.svg'
export const LogoImage = '../images/astro/full-logo-light.png'
export const FeaturedSVG = '../images/svg/undraw/santosh_yadav.svg'
export const DefaultSVG = '../images/svg/undraw/undraw_my_feed.svg'
export const DefaultImage = '../images/undraw/undraw_my_feed.png'

export const NavigationLinks = [
  { name: 'Home', href: '' },
  { name: 'Blog', href: 'blog' },
  { name: 'Contact', href: 'contact' },
]

export const CategoryDetail = [
  {
    category: 'instructions',
    coverSVG: '../images/svg/undraw/undraw_instruction_manual.svg',
    socialImage: '../images/undraw/undraw_instruction_manual.png',
    description: 'Guidelines on using this starter.',
  },
  {
    category: 'information',
    coverSVG: '../images/svg/undraw/undraw_instant_information.svg',
    socialImage: '../images/undraw/undraw_instant_information.png',
    description: 'Information articles.',
  },
]

export function categoryDetail(category: string | undefined) {
  const details = CategoryDetail.filter(cat => cat.category == category)

  if (details.length == 1) {
    return details[0]
  }
  return {
    category: 'General',
    coverSVG: '../images/svg/undraw/undraw_instant_information.svg',
    socialImage: '../images/undraw/undraw_instant_information.png',
    description: 'Category ' + category,
  }
}
export const AuthorDetail = [
  {
    name: 'Santosh Yadav',
    description: 'GDE Angular, GitHub Star.',
    contact: 'santosh.yadav198613@gmail.com',
    image: '../images/undraw/santosh_yadav.jpg',
  },
]

export const DefaultAuthor = {
  name: 'Santosh Yadav',
  description: 'GDE Angular, GitHub Star.',
  contact: 'santosh.yadav198613@gmail.com',
  image: '../images/undraw/santosh_yadav.jpg',
}

export function authorDetail(author: string | undefined) {
  const details = AuthorDetail.filter(person => person.name == author)

  if (details.length == 1) {
    return details[0]
  }
  return DefaultAuthor
}

export const PAGE_SIZE = 6

export const GITHUB_EDIT_URL = `https://github.com/SantoshyadavDev`

export const COMMUNITY_INVITE_URL = `https://discord.gg/REY2x8SJYk`

export type Sidebar = Record<string, { text: string; link: string }[]>

export const SIDEBAR: Sidebar = {
  'Section Header': [
    { text: 'Introduction', link: 'doc/introduction' },
    { text: 'Page 2', link: 'doc/page-2' },
    { text: 'Page 3', link: 'doc/page-3' },
  ],
  'Another Section': [{ text: 'Page 4', link: 'doc/page-4' }],
}

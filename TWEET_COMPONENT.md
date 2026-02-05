# Tweet Embedding Component

This repository includes a Tweet component that allows you to easily embed tweets in MDX files.

## Installation

The `@astro-community/astro-embed-twitter` package has been added as a dependency.

## Usage

To embed a tweet in your MDX files:

1. Import the Tweet component at the top of your MDX file:

```mdx
import Tweet from "../../components/tweet.astro";
```

2. Use the component with the full tweet URL in the `id` prop:

```mdx
<Tweet id="https://twitter.com/username/status/1234567890" />
```

Note: Despite the prop being named `id`, you must provide the complete Twitter URL, not just the tweet ID.

### Optional Parameters

- `theme`: Set the theme to `'light'` (default) or `'dark'`

```mdx
<Tweet id="https://twitter.com/username/status/1234567890" theme="dark" />
```

## Example

```mdx
---
title: My Blog Post
---

import Tweet from "../../components/tweet.astro";

# My Blog Post

Check out this interesting tweet:

<Tweet id="https://twitter.com/Angular/status/1742529670275174842" />
```

## Notes

- The component fetches tweet data at build time using Twitter's oEmbed API
- Make sure you use the full Twitter URL (not just the tweet ID)
- The tweet will be rendered as static HTML in the final build

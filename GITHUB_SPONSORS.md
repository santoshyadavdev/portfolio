# GitHub Sponsors Integration

This portfolio site includes integration with GitHub Sponsors to display people and organizations you sponsor.

## Setup

To enable the sponsors page, you need to configure a GitHub personal access token:

1. Create a GitHub Personal Access Token at https://github.com/settings/tokens/new
2. Grant the token the `read:user` scope (required to read your sponsorships)
3. Set the token as an environment variable:

```bash
export GITHUB_TOKEN=your_token_here
```

For deployment environments (Vercel, Netlify, etc.), add `GITHUB_TOKEN` to your environment variables configuration.

## How It Works

The sponsors page (`/sponsors`) uses the GitHub GraphQL API to fetch a list of users and organizations you actively sponsor. The data is fetched at build time, so:

- No GitHub API calls are made when users visit the page
- The sponsors list updates each time you rebuild/redeploy your site
- If the token is missing or invalid, the page displays gracefully with an empty state

## API Details

The integration:

- Uses the `sponsorshipsAsSponsor` GraphQL field
- Supports pagination for cases where you sponsor more than 100 accounts
- Handles both User and Organization sponsorables
- Gracefully degrades if the API is unavailable

## Files

- `src/lib/github.ts` - GitHub API integration and TypeScript interfaces
- `src/components/sponsorcard.astro` - Individual sponsor card component
- `src/pages/sponsors.astro` - Sponsors listing page
- `src/env.d.ts` - TypeScript environment variable definitions

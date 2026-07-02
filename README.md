# Caio Landgraf — Portfolio

A minimalist, production-grade personal portfolio built with Next.js 15+, TypeScript, and Tailwind CSS. Designed to communicate technical excellence through simplicity.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components, ISR)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui patterns, Radix UI primitives
- **Animation:** Framer Motion (subtle transitions)
- **Content:** MDX blog posts with syntax highlighting (Shiki)
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/caiolandgraf/portfolio-caio)

Or deploy manually:

```bash
npm run build
```

The project includes `vercel.json` configured for the `gru1` (São Paulo) region.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | No | GitHub API token for higher rate limits on stats |
| `NEXT_PUBLIC_SITE_URL` | No | Override site URL for SEO (defaults to `content/profile.ts`) |

## Project Structure

```
content/                  # All personal data — edit here, not in components
├── profile.ts            # Name, title, bio, metrics, social links, navigation
├── experience.ts         # Work experience and timeline
├── skills.ts             # Skills by category
├── projects/index.ts     # Featured and open-source projects
├── posts/*.mdx           # Blog posts
├── articles/index.ts     # External technical writing
├── talks/index.ts        # Talks and podcasts
├── integrations.ts       # GitHub and YouTube config
└── types.ts              # Shared TypeScript types

src/
├── app/                  # Next.js App Router pages
├── components/         # UI, layout, sections, blog
└── lib/                  # Utilities, MDX, GitHub, YouTube, SEO
```

## Configuration Guide

All content is centralized in the `content/` directory. **Never hardcode personal information in components.**

### Profile & Metrics

Edit `content/profile.ts`:

```typescript
export const profile = {
  name: "Caio Landgraf",
  title: "Senior Software Engineer (L5), Google Cloud",
  // ...
};

export const metrics = [
  { id: "years", label: "Years Experience", value: 9 },
  // ...
];

export const socialLinks = [
  { id: "github", label: "GitHub", href: "https://github.com/...", icon: "github" },
  // ...
];
```

### Experience

Edit `content/experience.ts`. Each entry follows this shape:

```typescript
{
  id: "unique-id",
  company: "Company Name",
  role: "Job Title",
  period: "Jan 2020 — Present",
  location: "Remote",
  description: "What you did...",
  highlights: ["Achievement 1", "Achievement 2"],
  technologies: ["Go", "GCP"],
  current: true,
}
```

### Skills

Edit `content/skills.ts`. Add or remove categories and skills:

```typescript
{
  id: "cloud",
  name: "Cloud",
  skills: ["AWS", "Google Cloud", "Docker"],
}
```

### Projects

Edit `content/projects/index.ts`:

```typescript
{
  id: "my-project",
  name: "Project Name",
  description: "Short description",
  technologies: ["Go", "TypeScript"],
  github: "https://github.com/...",
  demo: "https://demo.url",
  image: "/images/projects/my-project.png",
  featured: true,
  openSource: true,
  stars: 10,
}
```

### Blog Posts

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "Post Title"
slug: "post-slug"
description: "Brief description for SEO"
cover: "/images/blog/cover.png"
date: "2025-06-15"
tags: ["Go", "Architecture"]
author: "Caio Landgraf"
published: true
---

Your content here...
```

The post appears automatically on `/blog` and the homepage preview.

### Talks

Edit `content/talks/index.ts`:

```typescript
{
  id: "talk-id",
  title: "Talk Title",
  event: "Conference Name",
  date: "2025",
  description: "What the talk covered",
  link: "https://...",
}
```

### Technical Articles (External)

Edit `content/articles/index.ts` for articles published on other platforms.

### Social Links

Add new networks in `content/profile.ts` → `socialLinks`. Supported icons: `github`, `linkedin`, `youtube`, `instagram`, `x`, `email`, `website`.

### GitHub & YouTube Integration

Edit `content/integrations.ts`:

```typescript
export const githubConfig = {
  username: "caiolandgraf",
  pinnedRepos: ["grove", "gest"],
};

export const youtubeConfig = {
  channelHandle: "@caiolandgraf",
  channelUrl: "https://www.youtube.com/@caiolandgraf",
  channelId: "UC2nc0hIo8M_k0VPl905_I9w",
};
```

By default the site reads the channel's public RSS feed, which returns the
latest ~15 videos. To display **all** videos, set a `YOUTUBE_API_KEY`
environment variable — the site will then page through the YouTube Data API
and list the entire uploads playlist.

To find your `channelId`, open your channel page and view source, or run:

```bash
curl -s "https://www.youtube.com/@yourhandle" | grep -oE '"externalId":"UC[^"]+"'
```

## Features

- Dark mode only (refined palette)
- Command palette (`⌘K`)
- Smooth scroll navigation
- Back to top button
- Blog with MDX, syntax highlighting, table of contents
- Related posts, share buttons
- RSS feed at `/api/rss`
- Sitemap and robots.txt
- OpenGraph and Twitter Cards
- JSON-LD structured data
- GitHub stats integration
- YouTube feed integration
- Contact form API
- Custom 404 and error pages
- ISR with 1-hour revalidation

## Placeholders

Items marked with `[PLACEHOLDER: ...]` in content files need to be updated with your verified information:

- Google Cloud experience details
- Email address
- YouTube channel ID for RSS feed
- Some talks and articles

## License

Private — All rights reserved.

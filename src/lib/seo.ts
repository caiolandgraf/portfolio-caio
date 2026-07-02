import type { Metadata } from "next";
import { profile } from "@content/profile";
import { seo } from "@content/seo";

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return profile.siteUrl;
}

const siteUrl = getSiteUrl();

export const siteConfig = {
  name: profile.name,
  url: siteUrl,
  title: seo.title,
  description: seo.description,
  author: profile.name,
  locale: seo.locale,
  links: {
    github: "https://github.com/caiolandgraf",
    linkedin: "https://www.linkedin.com/in/caiolandgraf",
    youtube: "https://www.youtube.com/@caiolandgraf",
    tabnews: "https://www.tabnews.com.br/caiolandgraf",
  },
} as const;

function absoluteUrl(path = ""): string {
  return `${siteConfig.url}${path}`;
}

function ogImagePath(path = ""): string {
  if (path === "/blog") return "/blog/opengraph-image";
  if (path.startsWith("/blog/")) return `${path}/opengraph-image`;
  return "/opengraph-image";
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: seo.title,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: [...seo.keywords],
    authors: seo.authors.map((author) => ({
      name: author.name,
      url: author.url,
    })),
    creator: seo.creator,
    publisher: seo.publisher,
    applicationName: siteConfig.name,
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteConfig.url,
      types: {
        "application/rss+xml": `${siteConfig.url}/api/rss`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: ogImagePath(),
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: seo.twitter.site,
      creator: seo.twitter.handle,
      title: seo.title,
      description: seo.description,
      images: [ogImagePath()],
    },
    category: "technology",
  };
}

export function createPageMetadata({
  title,
  description,
  path = "",
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}): Metadata {
  const pageDescription = description ?? seo.description;
  const canonical = absoluteUrl(path);
  const imagePath = ogImagePath(path);
  const ogTitle = title ? `${title} | ${siteConfig.name}` : seo.title;

  return {
    ...(title ? { title } : {}),
    description: pageDescription,
    keywords: tags?.length ? [...seo.keywords, ...tags] : [...seo.keywords],
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    openGraph: {
      type,
      locale: seo.locale,
      url: canonical,
      siteName: siteConfig.name,
      title: ogTitle,
      description: pageDescription,
      images: [{ url: imagePath, width: 1200, height: 630, alt: ogTitle }],
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [siteConfig.name],
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: seo.twitter.site,
      creator: seo.twitter.handle,
      title: ogTitle,
      description: pageDescription,
      images: [imagePath],
    },
  };
}

// Legacy alias
export const createMetadata = createPageMetadata;

export function createPersonJsonLd(avatarUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteConfig.url,
    image: avatarUrl,
    jobTitle: profile.title,
    description: seo.description,
    knowsAbout: seo.keywords,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.youtube,
      siteConfig.links.tabnews,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Google",
      url: "https://www.google.com",
    },
  };
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: seo.description,
    inLanguage: "en-US",
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
  };
}

export function createBlogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    url: `${siteConfig.url}/blog`,
    description: "Technical writing on software engineering, architecture, and developer tooling.",
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
  };
}

export function createArticleJsonLd({
  title,
  description,
  date,
  slug,
  author,
  imageUrl,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  author: string;
  imageUrl?: string;
}) {
  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: imageUrl ?? absoluteUrl(ogImagePath(`/blog/${slug}`)),
    author: {
      "@type": "Person",
      name: author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
    isPartOf: {
      "@type": "Blog",
      name: `${siteConfig.name} Blog`,
      url: `${siteConfig.url}/blog`,
    },
  };
}

export function createBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EiCode",
    url: "https://eicode.com.br",
    founder: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
  };
}

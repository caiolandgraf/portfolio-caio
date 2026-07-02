import readingTime from "reading-time";
import { tabnewsConfig } from "@content/tabnews";

export interface TabNewsPost {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  tabcoins: number;
  url: string;
  body?: string;
  sourceUrl?: string | null;
  readingTime?: string;
}

interface TabNewsApiPost {
  id: string;
  slug: string;
  title: string;
  body?: string;
  status: string;
  parent_id: string | null;
  published_at: string;
  owner_username: string;
  tabcoins: number;
  source_url: string | null;
}

const REVALIDATE = 3600;

function mapPost(post: TabNewsApiPost): TabNewsPost {
  const url = `${tabnewsConfig.profileUrl}/${post.slug}`;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    publishedAt: post.published_at,
    tabcoins: post.tabcoins,
    url,
    body: post.body,
    sourceUrl: post.source_url,
    readingTime: post.body ? readingTime(post.body).text : undefined,
  };
}

async function fetchFromApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${tabnewsConfig.apiBase}${path}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function getTabNewsPosts(): Promise<TabNewsPost[]> {
  const data = await fetchFromApi<TabNewsApiPost[]>(
    `/contents/${tabnewsConfig.username}?with_children=false&per_page=${tabnewsConfig.maxPosts}`,
  );

  if (!data) return [];

  return data
    .filter((post) => post.status === "published" && post.title && !post.parent_id)
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
    )
    .map(mapPost);
}

export async function getTabNewsPost(slug: string): Promise<TabNewsPost | null> {
  const data = await fetchFromApi<TabNewsApiPost>(
    `/contents/${tabnewsConfig.username}/${slug}`,
  );

  if (!data || data.status !== "published") return null;
  return mapPost(data);
}

export async function getRelatedTabNewsPosts(
  slug: string,
  limit = 3,
): Promise<TabNewsPost[]> {
  const posts = await getTabNewsPosts();
  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}

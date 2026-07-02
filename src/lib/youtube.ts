import { youtubeConfig } from "@content/integrations";

export interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
}

const REVALIDATE = 3600;
const SHORT_MAX_SECONDS = 60;

function thumbFor(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function decodeXml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function isShortRssEntry(entry: string): boolean {
  const linkMatch = entry.match(/<link rel="alternate" href="([^"]+)"/);
  return linkMatch?.[1]?.includes("/shorts/") ?? false;
}

function parseDurationSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function parseYouTubeRSS(xml: string): YouTubeVideo[] {
  const items: YouTubeVideo[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];

    if (isShortRssEntry(entry)) continue;

    const getTag = (tag: string) => {
      const m = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return m?.[1]?.trim() ?? "";
    };

    const videoId = getTag("yt:videoId") || getTag("id").split(":").pop() || "";
    const title = decodeXml(getTag("title"));
    const published = getTag("published");

    if (videoId && title) {
      items.push({
        id: videoId,
        title,
        publishedAt: published,
        thumbnail: thumbFor(videoId),
        url: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }
  }

  return items;
}

async function fetchViaRSS(channelId: string): Promise<YouTubeVideo[]> {
  const res = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    { next: { revalidate: REVALIDATE } },
  );
  if (!res.ok) return [];
  return parseYouTubeRSS(await res.text());
}

interface PlaylistItemsResponse {
  items?: {
    snippet: {
      title: string;
      publishedAt: string;
      resourceId: { videoId: string };
    };
  }[];
  nextPageToken?: string;
}

interface VideosListResponse {
  items?: {
    id: string;
    contentDetails: { duration: string };
  }[];
}

async function fetchLongFormIds(
  videoIds: string[],
  apiKey: string,
): Promise<Set<string>> {
  const longFormIds = new Set<string>();

  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("id", batch.join(","));
    url.searchParams.set("key", apiKey);

    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) continue;

    const data = (await res.json()) as VideosListResponse;
    for (const item of data.items ?? []) {
      if (parseDurationSeconds(item.contentDetails.duration) > SHORT_MAX_SECONDS) {
        longFormIds.add(item.id);
      }
    }
  }

  return longFormIds;
}

async function fetchAllViaAPI(
  channelId: string,
  apiKey: string,
): Promise<YouTubeVideo[]> {
  const uploadsPlaylist = `UU${channelId.slice(2)}`;
  const videos: YouTubeVideo[] = [];
  let pageToken = "";

  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("playlistId", uploadsPlaylist);
    url.searchParams.set("key", apiKey);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url, { next: { revalidate: REVALIDATE } });
    if (!res.ok) break;

    const data = (await res.json()) as PlaylistItemsResponse;
    for (const item of data.items ?? []) {
      const { snippet } = item;
      const videoId = snippet.resourceId.videoId;
      videos.push({
        id: videoId,
        title: snippet.title,
        publishedAt: snippet.publishedAt,
        thumbnail: thumbFor(videoId),
        url: `https://www.youtube.com/watch?v=${videoId}`,
      });
    }

    pageToken = data.nextPageToken ?? "";
  } while (pageToken);

  if (videos.length === 0) return [];

  const longFormIds = await fetchLongFormIds(
    videos.map((v) => v.id),
    apiKey,
  );

  return videos.filter((video) => longFormIds.has(video.id));
}

export async function getYouTubeVideos(): Promise<YouTubeVideo[]> {
  const { channelId } = youtubeConfig;
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    if (apiKey) {
      const all = await fetchAllViaAPI(channelId, apiKey);
      if (all.length > 0) return all;
    }
    return await fetchViaRSS(channelId);
  } catch {
    return [];
  }
}

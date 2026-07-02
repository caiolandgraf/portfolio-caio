import { profile } from "@content/profile";
import { getGitHubAvatarUrl } from "@/lib/github-avatar";

async function toDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") ?? "image/jpeg";

    return `data:${contentType};base64,${Buffer.from(buffer).toString("base64")}`;
  } catch {
    return null;
  }
}

export async function getOgAvatarSrc(): Promise<string> {
  const avatarUrl = await getGitHubAvatarUrl();
  const dataUri = await toDataUri(avatarUrl);

  if (dataUri) return dataUri;

  const fallbackDataUri = await toDataUri(profile.avatarFallback);
  if (fallbackDataUri) return fallbackDataUri;

  return profile.avatarFallback;
}

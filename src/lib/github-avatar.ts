import { githubConfig } from "@content/integrations";
import { profile } from "@content/profile";

const GITHUB_API = "https://api.github.com";
const REVALIDATE = 86_400; // 24h

interface GitHubUserResponse {
  avatar_url: string;
}

export async function getGitHubAvatarUrl(): Promise<string> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${githubConfig.username}`, {
      next: { revalidate: REVALIDATE },
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    });

    if (res.ok) {
      const data = (await res.json()) as GitHubUserResponse;
      if (data.avatar_url) return data.avatar_url;
    }
  } catch {
    // fall through to fallback
  }

  return profile.avatarFallback;
}

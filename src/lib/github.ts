import { githubConfig } from "@content/integrations";

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export interface GitHubStats {
  user: GitHubUser;
  pinnedRepos: GitHubRepo[];
  topLanguages: { name: string; count: number }[];
  totalStars: number;
}

const GITHUB_API = "https://api.github.com";

async function fetchGitHub<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${GITHUB_API}${endpoint}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function getGitHubStats(): Promise<GitHubStats | null> {
  const user = await fetchGitHub<GitHubUser>(`/users/${githubConfig.username}`);
  if (!user) return null;

  const repos = await fetchGitHub<GitHubRepo[]>(
    `/users/${githubConfig.username}/repos?sort=stars&per_page=100`,
  );

  const pinnedRepos =
    repos?.filter((repo) =>
      (githubConfig.pinnedRepos as readonly string[]).includes(repo.name),
    ) ?? [];

  const languageMap = new Map<string, number>();
  repos?.forEach((repo) => {
    if (repo.language) {
      languageMap.set(repo.language, (languageMap.get(repo.language) ?? 0) + 1);
    }
  });

  const topLanguages = Array.from(languageMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const totalStars =
    repos?.reduce((sum, repo) => sum + repo.stargazers_count, 0) ?? 0;

  return { user, pinnedRepos, topLanguages, totalStars };
}

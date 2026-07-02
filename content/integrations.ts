export const githubConfig = {
  username: "caiolandgraf",
  pinnedRepos: ["grove", "gest", "result-pattern", "pam", "dwight", "chain"],
} as const;

export const youtubeConfig = {
  channelHandle: "@caiolandgraf",
  channelUrl: "https://www.youtube.com/@caiolandgraf",
  // Public channel ID (used for the RSS feed — returns the latest ~15 videos).
  channelId: "UC2nc0hIo8M_k0VPl905_I9w",
  // Set the YOUTUBE_API_KEY env var to fetch ALL videos via the YouTube Data API.
  // Without it, the site falls back to the RSS feed (latest videos only).
} as const;

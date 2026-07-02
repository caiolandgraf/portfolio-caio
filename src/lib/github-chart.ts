import { githubConfig } from "@content/integrations";

/** Dark contribution chart — gray empty cells, accent blue activity levels. */
export function getContributionChartUrl(username: string = githubConfig.username) {
  return `https://ghchart.xqsit94.in/dark:3B82F6/${username}`;
}

import { githubRequest } from "./request.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubRateLimit,
} from "./types/mod.ts";

export async function githubRateLimit(
  opts:
    & GitHubApi
    & GitHubCredentials,
): Promise<GitHubRateLimit> {
  const { endpoint, accessToken } = opts;
  const url = new URL(
    `${endpoint}/rate_limit`,
  );
  const { resources, rate: _deprecated } = await githubRequest<GitHubRateLimit & { rate: never }>({
    url,
    method: "GET",
    accessToken,
  });

  return { resources }
}

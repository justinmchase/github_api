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
) {
  const { endpoint, accessToken } = opts;
  const url = new URL(
    `${endpoint}/rate_limit`,
  );
  return await githubRequest<GitHubRateLimit>({
    url,
    method: "GET",
    accessToken,
  });
}

import type { GitHubClient } from "../client.ts";
import type { GitHubApp } from "../types/app.ts";

export async function get(
  opts: {
    client: GitHubClient;
  },
): Promise<GitHubApp> {
  const { client } = opts;
  return await client.request<GitHubApp>({
    api: `app`,
    method: "GET",
  });
}

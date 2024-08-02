import type { GitHubClient } from "./client.ts";
import type { GitHubRateLimit } from "./types/mod.ts";

export async function githubRateLimit(
  opts: { client: GitHubClient },
): Promise<GitHubRateLimit> {
  const { client } = opts;
  const { resources } = await client.request<GitHubRateLimit & { rate: never }>(
    {
      api: `rate_limit`,
    },
  );

  return { resources };
}

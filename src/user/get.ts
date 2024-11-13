import type { GitHubClient } from "../client.ts";
import type { GitHubUser } from "../types/user.ts";

export async function get(
  opts: {
    client: GitHubClient;
  },
): Promise<GitHubUser> {
  const { client } = opts;
  return await client.request<GitHubUser>({
    api: `user`,
    method: "GET",
  });
}

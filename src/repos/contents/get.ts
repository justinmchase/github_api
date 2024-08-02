import type { GitHubClient } from "../../client.ts";
import type { GitHubContent, GitHubRepository } from "../../types/mod.ts";

export async function get(
  opts:
    & { path: string }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<GitHubContent> {
  const {
    path,
    repository: { name, owner: { login } },
    client,
  } = opts;
  const api = `repos/${login}/${name}/contents/${path}`;
  return await client.request<GitHubContent>({
    api,
    method: "GET",
  });
}

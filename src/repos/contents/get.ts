import { GitHubClient } from "../../client.ts";
import { GitHubContent } from "../../types/content.ts";
import { GitHubRepository } from "../../types/mod.ts";

export async function get(
  opts:
    & { path: string }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
) {
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

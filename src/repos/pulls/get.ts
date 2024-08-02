import type { GitHubClient } from "../../client.ts";
import type { GitHubPullRequest } from "../../types/pulls.ts";
import type { GitHubRepository } from "../../types/repository.ts";

export async function get(
  opts:
    & { number: number }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<GitHubPullRequest> {
  const { number, repository: { name, owner: { login } }, client } = opts;
  return await client.request<GitHubPullRequest>({
    api: `repos/${login}/${name}/pulls/${number}`,
  });
}

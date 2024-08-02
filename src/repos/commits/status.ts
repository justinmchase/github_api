import type { GitHubClient } from "../../client.ts";
import type { GitHubCommitStatus, GitHubRepository } from "../../types/mod.ts";

export async function status(
  opts:
    & { ref: string }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<GitHubCommitStatus> {
  const { ref, repository: { name, owner: { login } }, client } = opts;
  return await client.request<GitHubCommitStatus>({
    api: `repos/${login}/${name}/commits/${ref}/status`,
  });
}

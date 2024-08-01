import { GitHubClient } from "../../client.ts";
import { GitHubRepository } from "../../types/repository.ts";
import { GitHubCommitStatus } from "../../types/commit.ts";

export async function status(
  opts:
    & { ref: string }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
) {
  const { ref, repository: { name, owner: { login } }, client } = opts;
  return await client.request<GitHubCommitStatus>({
    api: `repos/${login}/${name}/commits/${ref}/status`,
  });
}

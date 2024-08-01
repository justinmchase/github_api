import { GitHubClient } from "../../client.ts";
import { GitHubPullRequest } from "../../types/pulls.ts";
import { GitHubRepository } from "../../types/repository.ts";


export async function get(
  opts:
    & { number: number }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
) {
  const { number, repository: { name, owner: { login } }, client } = opts;
  return await client.request<GitHubPullRequest>({
    api: `repos/${login}/${name}/pulls/${number}`,
  });
}

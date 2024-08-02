import type { GitHubClient } from "../../../client.ts";
import type { GitHubRepository, GitHubWorkflow } from "../../../types/mod.ts";

export async function list(
  opts:
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<GitHubWorkflow[]> {
  const { repository: { name, owner: { login } }, client } = opts;
  return await client.requestAll({
    api: `repos/${login}/${name}/actions/workflows`,
    map: ({ workflows }) => workflows as GitHubWorkflow[],
  });
}

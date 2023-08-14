import { GitHubClient } from "../../../client.ts";
import { GitHubRepository } from "../../../mod.ts";
import { GitHubWorkflow } from "../../../types/mod.ts";

export async function list(
  opts:
    & { repository: GitHubRepository }
    & { client: GitHubClient },
) {
  const { repository: { name, owner: { login } }, client } = opts;
  return await client.requestAll({
    api: `repos/${login}/${name}/actions/workflows`,
    map: ({ workflows }) => workflows as GitHubWorkflow[],
  });
}

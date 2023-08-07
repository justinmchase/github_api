import { GitHubClient } from "../../../client.ts";
import { GitHubRepository } from "../../../mod.ts";
import { GitHubWorkflow } from "../../../types/mod.ts";

type WorkflowMap<T> = (repos: GitHubWorkflow[]) => T[];

export async function list<T>(
  opts:
    & { map?: WorkflowMap<T> }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
) {
  const { map, repository: { name, owner: { login } }, client } = opts;
  return await client.requestAll<T>({
    api: `/repos/${login}/${name}/actions/workflows`,
    map,
  });
}

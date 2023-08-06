import { GitHubClient } from "../../../client.ts";
import { GitHubOwner } from "../../../mod.ts";
import { GitHubWorkflow } from "../../../types/mod.ts";

type WorkflowMap<T> = (repos: GitHubWorkflow[]) => T[];

export async function list<T>(
  opts:
    & { map?: WorkflowMap<T> }
    & { repository: string }
    & { client: GitHubClient }
    & GitHubOwner,
) {
  const { map, owner, repository, client } = opts;
  return await client.requestAll<T>({
    api: `/repos/${owner}/${repository}/actions/workflows`,
    map,
  });
}

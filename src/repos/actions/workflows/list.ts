import { GitHubClient } from "../../../client.ts";
import { GitHubWorkflow } from "../../../types/mod.ts";

type WorkflowMap<T> = (repos: GitHubWorkflow[]) => T[];

export async function githubActionsListWorkflows<T>(
  opts:
    & { map?: WorkflowMap<T> }
    & { repository: string }
    & { client: GitHubClient },
) {
  const { map, repository, client } = opts;
  return await client.requestAll<T>({
    api: `/repos/${repository}/actions/workflows`,
    map,
  });
}

import { GitHubClient } from "../../../../client.ts";
import {
  GitHubOrg,
  GitHubRepository,
  GitHubVariable,
  GitHubVariableVisibility,
} from "../../../../types/mod.ts";

export async function githubOrgsActionsVariableSetRepositories(
  opts:
    & { variable: GitHubVariable; repositories: Pick<GitHubRepository, 'id'>[] }
    & GitHubOrg
    & { client: GitHubClient },
) {
  const { variable, repositories, organization, client } = opts;
  if (variable.visibility !== GitHubVariableVisibility.Selected) {
    throw new Error(
      `Organization variable must have visibility ${GitHubVariableVisibility.Selected} in order to have repositories associated with it`,
    );
  }
  return await client.request({
    api: `orgs/${organization}/actions/variables/${variable.name}/repositories`,
    method: "PUT",
    body: {
      selected_repository_ids: repositories.map((r) => r.id),
    },
  });
}

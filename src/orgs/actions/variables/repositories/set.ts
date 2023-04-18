import { githubRequest } from "../../../../request.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubOrg,
  GitHubRepository,
  GitHubVariable,
  GitHubVariableVisibility,
} from "../../../../types/mod.ts";

export async function githubOrgsActionsVariableSetRepositories(
  opts:
    & { variable: GitHubVariable; repositories: GitHubRepository[] }
    & GitHubOrg
    & GitHubApi
    & GitHubCredentials,
) {
  const { variable, repositories, endpoint, organization, accessToken } = opts;
  if (variable.visibility !== GitHubVariableVisibility.Selected) {
    throw new Error(
      `Organization variable must have visibility ${GitHubVariableVisibility.Selected} in order to have repositories associated with it`,
    );
  }
  const url = new URL(
    `${endpoint}/orgs/${organization}/actions/variables/${variable.name}/repositories`,
  );
  return await githubRequest({
    url,
    method: "PUT",
    body: {
      selected_repository_ids: repositories.map((r) => r.id),
    },
    accessToken,
  });
}

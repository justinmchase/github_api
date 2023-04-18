import { githubRequestAll } from "../../../../request.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubOrg,
  GitHubRepository,
  GitHubVariable,
  GitHubVariableVisibility,
} from "../../../../types/mod.ts";

export async function githubOrgsActionsVariableListRepositories(
  opts:
    & { variable: GitHubVariable }
    & GitHubOrg
    & GitHubApi
    & GitHubCredentials,
) {
  const { variable, endpoint, organization, accessToken } = opts;
  if (variable.visibility !== GitHubVariableVisibility.Selected) {
    throw new Error(
      `Organization variable must have visibility ${GitHubVariableVisibility.Selected} in order to have repositories associated with it`,
    );
  }
  const url = new URL(
    `${endpoint}/orgs/${organization}/actions/variables/${variable.name}/repositories`,
  );
  return await githubRequestAll<GitHubRepository>({
    url,
    fn: ({ repositories }) => repositories as GitHubRepository[],
    accessToken,
  });
}

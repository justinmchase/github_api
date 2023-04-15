import { githubRequestAll } from "../../request.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubOrg,
  GitHubVariable,
} from "../../types.ts";

export async function githubOrgsActionsListVariables(
  opts: GitHubOrg & GitHubApi & GitHubCredentials,
) {
  const { endpoint, organization, accessToken } = opts;
  const url = new URL(`${endpoint}/orgs/${organization}/actions/variables`);
  return await githubRequestAll<GitHubVariable>({
    url,
    fn: ({ variables }) => variables as GitHubVariable[],
    accessToken,
  });
}

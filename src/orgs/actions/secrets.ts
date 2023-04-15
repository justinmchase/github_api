import { githubRequestAll } from "../../request.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubOrg,
  GitHubSecret,
} from "../../types.ts";

export async function githubOrgsActionsListSecrets(
  opts: GitHubOrg & GitHubApi & GitHubCredentials,
) {
  const { endpoint, organization, accessToken } = opts;
  const url = new URL(`${endpoint}/orgs/${organization}/actions/secrets`);
  return await githubRequestAll<GitHubSecret>({
    url,
    fn: ({ secrets }) => secrets as GitHubSecret[],
    accessToken,
  });
}

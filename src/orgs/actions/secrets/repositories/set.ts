import { githubRequest } from "../../../../request.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubOrg,
  GitHubRepository,
  GitHubSecret,
  GitHubSecretVisibility,
} from "../../../../types/mod.ts";

export async function githubOrgsActionsSecretSetRepositories(
  opts:
    & { secret: GitHubSecret; repositories: GitHubRepository[] }
    & GitHubOrg
    & GitHubApi
    & GitHubCredentials,
) {
  const { secret, repositories, endpoint, organization, accessToken } = opts;
  if (secret.visibility !== GitHubSecretVisibility.Selected) {
    throw new Error(
      `Secret must have visibility ${GitHubSecretVisibility.Selected} in order to have repositories associated with it`,
    );
  }
  const url = new URL(
    `${endpoint}/orgs/${organization}/actions/secrets/${secret.name}/repositories`,
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

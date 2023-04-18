import { githubRequestAll } from "../../../../request.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubOrg,
  GitHubRepository,
  GitHubSecret,
  GitHubSecretVisibility,
} from "../../../../types/mod.ts";

export async function githubOrgsActionsSecretListRepositories(
  opts: { secret: GitHubSecret } & GitHubOrg & GitHubApi & GitHubCredentials,
) {
  const { secret, endpoint, organization, accessToken } = opts;
  if (secret.visibility !== GitHubSecretVisibility.Selected) {
    throw new Error(
      `Organization secret must have visibility ${GitHubSecretVisibility.Selected} in order to have repositories associated with it`,
    );
  }
  const url = new URL(
    `${endpoint}/orgs/${organization}/actions/secrets/${secret.name}/repositories`,
  );
  return await githubRequestAll<GitHubRepository>({
    url,
    fn: ({ repositories }) => repositories as GitHubRepository[],
    accessToken,
  });
}

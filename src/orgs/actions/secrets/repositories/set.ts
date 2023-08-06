import { GitHubClient } from "../../../../client.ts";
import {
  GitHubOrg,
  GitHubRepository,
  GitHubSecret,
  GitHubSecretVisibility,
} from "../../../../types/mod.ts";

export async function set(
  opts:
    & { secret: GitHubSecret; repositories: Pick<GitHubRepository, "id">[] }
    & GitHubOrg
    & { client: GitHubClient },
) {
  const { secret, repositories, organization, client } = opts;
  if (secret.visibility !== GitHubSecretVisibility.Selected) {
    throw new Error(
      `Secret must have visibility ${GitHubSecretVisibility.Selected} in order to have repositories associated with it`,
    );
  }

  return await client.request({
    api: `orgs/${organization}/actions/secrets/${secret.name}/repositories`,
    method: "PUT",
    body: {
      selected_repository_ids: repositories.map((r) => r.id),
    },
  });
}

import type { GitHubClient } from "../../../../client.ts";
import type {
  GitHubOrg,
  GitHubRepository,
  GitHubSecret,
} from "../../../../types/mod.ts";
import { GitHubSecretVisibility } from "../../../../types/mod.ts";

export async function list(
  opts:
    & { secret: GitHubSecret }
    & GitHubOrg
    & { client: GitHubClient },
): Promise<GitHubRepository[]> {
  const { secret, organization, client } = opts;
  if (secret.visibility !== GitHubSecretVisibility.Selected) {
    throw new Error(
      `Organization secret must have visibility ${GitHubSecretVisibility.Selected} in order to have repositories associated with it`,
    );
  }

  return await client.requestAll<GitHubRepository>({
    api: `orgs/${organization}/actions/secrets/${secret.name}/repositories`,
    map: ({ repositories }) => repositories as GitHubRepository[],
  });
}

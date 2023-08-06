import { GitHubClient } from "../../../client.ts";
import { GitHubOrg, GitHubSecret } from "../../../types/mod.ts";

export async function list(
  opts:
    & GitHubOrg
    & { client: GitHubClient },
) {
  const { organization, client } = opts;
  return await client.requestAll<GitHubSecret>({
    api: `orgs/${organization}/actions/secrets`,
    map: ({ secrets }) => secrets as GitHubSecret[],
  });
}

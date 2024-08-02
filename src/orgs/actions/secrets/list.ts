import type { GitHubClient } from "../../../client.ts";
import type { GitHubOrg, GitHubSecret } from "../../../types/mod.ts";

export async function list(
  opts:
    & GitHubOrg
    & { client: GitHubClient },
): Promise<GitHubSecret[]> {
  const { organization, client } = opts;
  return await client.requestAll<GitHubSecret>({
    api: `orgs/${organization}/actions/secrets`,
    map: ({ secrets }) => secrets as GitHubSecret[],
  });
}

import { GitHubClient } from "../../../client.ts";
import { GitHubOrg, GitHubVariable } from "../../../types/mod.ts";

export async function list(
  opts:
    & GitHubOrg
    & { client: GitHubClient },
) {
  const { organization, client } = opts;
  return await client.requestAll<GitHubVariable>({
    api: `orgs/${organization}/actions/variables`,
    map: ({ variables }) => variables as GitHubVariable[],
  });
}

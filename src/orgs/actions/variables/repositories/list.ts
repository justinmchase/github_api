import { GitHubClient } from "../../../../client.ts";
import {
  GitHubOrg,
  GitHubRepository,
  GitHubVariable,
  GitHubVariableVisibility,
} from "../../../../types/mod.ts";

export async function list(
  opts:
    & { variable: GitHubVariable }
    & GitHubOrg
    & { client: GitHubClient },
) {
  const { variable, organization, client } = opts;
  if (variable.visibility !== GitHubVariableVisibility.Selected) {
    throw new Error(
      `Organization variable must have visibility ${GitHubVariableVisibility.Selected} in order to have repositories associated with it`,
    );
  }

  return await client.requestAll<GitHubRepository>({
    api: `orgs/${organization}/actions/variables/${variable.name}/repositories`,
    map: ({ repositories }) => repositories as GitHubRepository[],
  });
}

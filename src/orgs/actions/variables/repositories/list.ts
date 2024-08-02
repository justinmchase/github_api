import type { GitHubClient } from "../../../../client.ts";
import type {
  GitHubOrg,
  GitHubRepository,
  GitHubVariable,
} from "../../../../types/mod.ts";
import { GitHubVariableVisibility } from "../../../../types/mod.ts";

export async function list(
  opts:
    & { variable: GitHubVariable }
    & GitHubOrg
    & { client: GitHubClient },
): Promise<GitHubRepository[]> {
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

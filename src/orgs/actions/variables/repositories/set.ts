import type { GitHubClient } from "../../../../client.ts";
import type {
  GitHubOrg,
  GitHubRepository,
  GitHubVariable,
} from "../../../../types/mod.ts";
import { GitHubVariableVisibility } from "../../../../types/mod.ts";

export async function set(
  opts:
    & { variable: GitHubVariable; repositories: Pick<GitHubRepository, "id">[] }
    & GitHubOrg
    & { client: GitHubClient },
): Promise<void> {
  const { variable, repositories, organization, client } = opts;
  if (variable.visibility !== GitHubVariableVisibility.Selected) {
    throw new Error(
      `Organization variable must have visibility ${GitHubVariableVisibility.Selected} in order to have repositories associated with it`,
    );
  }
  await client.request({
    api: `orgs/${organization}/actions/variables/${variable.name}/repositories`,
    method: "PUT",
    body: {
      selected_repository_ids: repositories.map((r) => r.id),
    },
  });
}

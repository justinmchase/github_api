import type { GitHubClient } from "../../../../client.ts";
import type { GitHubRepository } from "../../../../types/mod.ts";

export async function create(
  opts:
    & {
      runId: number;
      environmentName: string;
      state?: "approved" | "rejected";
      comment: string;
    }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<void> {
  const {
    runId,
    environmentName,
    state,
    comment,
    repository: { name, owner: { login } },
    client,
  } = opts;
  const api =
    `repos/${login}/${name}/actions/runs/${runId}/deployment_protection_rule`;
  await client.request<void>({
    api,
    method: "POST",
    body: {
      environment_name: environmentName,
      state,
      comment,
    },
  });
}

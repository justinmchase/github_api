import type { SerializableRecord } from "../../../../../deps/serializable.ts";
import type { GitHubClient } from "../../../../client.ts";
import type { GitHubRepository } from "../../../../types/mod.ts";

export async function create(
  opts:
    & {
      workflowId: number;
      ref: string;
      inputs: SerializableRecord;
    }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<void> {
  const {
    workflowId,
    ref,
    inputs,
    repository: { name, owner: { login } },
    client,
  } = opts;
  const api =
    `repos/${login}/${name}/actions/workflows/${workflowId}/dispatches`;
  await client.request({
    api,
    method: "POST",
    body: {
      ref,
      inputs,
    },
  });
}

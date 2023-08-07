import { SerializableRecord } from "../../../../../deps/serializable.ts";
import { GitHubClient } from "../../../../client.ts";
import { GitHubRepository } from "../../../../types/mod.ts";

export async function create(
  opts:
    & {
      workflowId: number;
      ref: string;
      inputs: SerializableRecord;
    }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
) {
  const {
    workflowId,
    ref,
    inputs,
    repository: { name, owner: { login } },
    client,
  } = opts;
  const api =
    `repos/${login}/${name}/actions/workflows/${workflowId}/dispatches`;
  return await client.request<void>({
    api,
    method: "POST",
    body: {
      ref,
      inputs,
    },
  });
}

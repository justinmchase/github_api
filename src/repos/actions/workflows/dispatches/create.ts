import { SerializableRecord } from "../../../../../deps/serializable.ts";
import { GitHubClient } from "../../../../client.ts";
import { GitHubCommitComment, GitHubOwner } from "../../../../types/mod.ts";

export async function create(
  opts:
    & {
      repository: string;
      workflowId: number;
      ref: string;
      inputs: SerializableRecord;
    }
    & { client: GitHubClient }
    & GitHubOwner,
) {
  const { workflowId, ref, inputs, repository, owner, client } = opts;
  const api =
    `repos/${owner}/${repository}/actions/workflows/${workflowId}/dispatches`;
  return await client.request<GitHubCommitComment>({
    api,
    method: "POST",
    body: {
      ref,
      inputs,
    },
  });
}

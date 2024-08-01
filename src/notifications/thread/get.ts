import { GitHubClient } from "../../client.ts";
import { GitHubNotification } from "../../mod.ts";

export async function get(
  opts:
    & { threadId: number }
    & { client: GitHubClient },
) {
  const { threadId, client } = opts;
  return await client.request<GitHubNotification>({
    api: `notifications/threads/${threadId}`,
    method: "GET",
  });
}

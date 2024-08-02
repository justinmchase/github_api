import type { GitHubClient } from "../../client.ts";
import type { GitHubNotification } from "../../mod.ts";

export async function get(
  opts:
    & { threadId: number }
    & { client: GitHubClient },
): Promise<GitHubNotification> {
  const { threadId, client } = opts;
  return await client.request<GitHubNotification>({
    api: `notifications/threads/${threadId}`,
    method: "GET",
  });
}

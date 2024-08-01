import { GitHubClient } from "../../client.ts";
import { GitHubNotification } from "../../mod.ts";

// Marks a thread as "read." Marking a thread as "read" is equivalent to clicking a notification in your notification inbox
export async function read(
  opts:
    & { threadId: number }
    & { client: GitHubClient },
) {
  const { threadId, client } = opts;
  return await client.request({
    api: `notifications/threads/${threadId}`,
    method: "PATCH",
  });
}

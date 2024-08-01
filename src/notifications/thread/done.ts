import { GitHubClient } from "../../client.ts";
import { GitHubNotification } from "../../mod.ts";

// Marks a thread as "done." Marking a thread as "done" is equivalent to marking a notification in your notification inbox on GitHub as done:
export async function done(
  opts:
    & { threadId: number }
    & { client: GitHubClient },
) {
  const { threadId, client } = opts;
  return await client.request<GitHubNotification>({
    api: `notifications/threads/${threadId}`,
    method: "DELETE",
  });
}

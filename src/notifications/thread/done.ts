import type { GitHubClient } from "../../client.ts";
import type { GitHubNotification } from "../../types/mod.ts";

// Marks a thread as "done." Marking a thread as "done" is equivalent to marking a notification in your notification inbox on GitHub as done:
export async function done(
  opts:
    & { threadId: number }
    & { client: GitHubClient },
): Promise<void> {
  const { threadId, client } = opts;
  await client.request<GitHubNotification>({
    api: `notifications/threads/${threadId}`,
    method: "DELETE",
  });
}

import type { GitHubClient } from "../../client.ts";

// Marks a thread as "read." Marking a thread as "read" is equivalent to clicking a notification in your notification inbox
export async function read(
  opts:
    & { threadId: number }
    & { client: GitHubClient },
): Promise<void> {
  const { threadId, client } = opts;
  await client.request({
    api: `notifications/threads/${threadId}`,
    method: "PATCH",
  });
}

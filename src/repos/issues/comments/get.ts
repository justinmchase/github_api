// curl -L \
//   -H "Accept: application/vnd.github+json" \
//   -H "Authorization: Bearer <YOUR-TOKEN>" \
//   -H "X-GitHub-Api-Version: 2022-11-28" \
//   https://api.github.com/repos/OWNER/REPO/issues/comments/COMMENT_ID

import type { GitHubClient } from "../../../client.ts";
import type {
  GitHubIssueComment,
  GitHubRepository,
} from "../../../types/mod.ts";

export async function get(
  opts:
    & { number: number }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<GitHubIssueComment> {
  const { number, repository: { name, owner: { login } }, client } = opts;
  return await client.request<GitHubIssueComment>({
    api: `repos/${login}/${name}/issues/comments/${number}`,
  });
}

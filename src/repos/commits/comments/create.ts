import type { GitHubClient } from "../../../client.ts";
import type {
  GitHubCommitComment,
  GitHubRepository,
} from "../../../types/mod.ts";

export async function create(
  opts:
    & { commitSha: string }
    & { body: string; path?: string; position?: number; line?: number }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<GitHubCommitComment> {
  const {
    body,
    path,
    position,
    line,
    commitSha,
    repository: { name, owner: { login } },
    client,
  } = opts;
  return await client.request<GitHubCommitComment>({
    api: `repos/${login}/${name}/commits/${commitSha}/comments`,
    method: "POST",
    body: {
      body,
      path,
      position,
      line,
    },
  });
}

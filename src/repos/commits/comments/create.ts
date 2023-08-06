import { GitHubClient } from "../../../client.ts";
import { GitHubCommitComment, GitHubOwner } from "../../../types/mod.ts";

export async function githubReposCommitsCommentsCreate(
  opts:
    & { repository: string; commitSha: string }
    & { body: string; path?: string; position?: number; line?: number }
    & GitHubOwner
    & { client: GitHubClient },
) {
  const { body, path, position, line, commitSha, repository, owner, client } =
    opts;
  return await client.request<GitHubCommitComment>({
    api: `repos/${owner}/${repository}/commits/${commitSha}/comments`,
    method: "POST",
    body: {
      body,
      path,
      position,
      line,
    },
  });
}

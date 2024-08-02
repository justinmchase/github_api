import type { GitHubClient } from "../../../client.ts";
import type { GitHubCheckRun, GitHubRepository } from "../../../types/mod.ts";

export async function list(
  opts:
    & { ref: string }
    & { repository: GitHubRepository }
    & { client: GitHubClient },
): Promise<GitHubCheckRun[]> {
  const { ref, repository: { name, owner: { login } }, client } = opts;
  return await client.requestAll({
    api: `repos/${login}/${name}/commits/${ref}/check-runs`,
    map: ({ check_runs }) => check_runs as GitHubCheckRun[],
  });
}

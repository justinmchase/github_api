import type { GitHubClient } from "../client.ts";
import type { GitHubNotification } from "../types/mod.ts";

export async function list(
  opts:
    & {
      all?: boolean;
      participating?: boolean;
      since?: Date;
      before?: Date;
      max?: number;
    }
    & { progress?: (total: number, count: number) => void }
    & { client: GitHubClient },
): Promise<GitHubNotification[]> {
  const { client, progress } = opts;
  const parameters = new URLSearchParams();
  if (opts.all !== undefined) parameters.set("all", `${opts.all}`);
  if (opts.participating !== undefined) {
    parameters.set("participating", `${opts.participating}`);
  }
  if (opts.before !== undefined) {
    parameters.set("before", opts.before.toISOString());
  }
  if (opts.since !== undefined) {
    parameters.set("since", opts.since.toISOString());
  }
  let total = 0;
  return await client.requestAll<GitHubNotification>({
    api: `notifications`,
    parameters,
    max: opts.max,
    map: (repositories) => {
      if (progress) {
        total += repositories.length;
        progress(total, repositories.length);
      }
      return repositories as GitHubNotification[];
    },
  });
}

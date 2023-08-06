import { GitHubClient } from "../../client.ts";
import { GitHubOrg, GitHubRepository } from "../../types/mod.ts";

type RepositoryMap<T> = (repos: GitHubRepository[]) => T[];

export async function list<T>(
  opts:
    & { map?: RepositoryMap<T> }
    & GitHubOrg
    & { client: GitHubClient },
) {
  const { map, organization, client } = opts;
  return await client.requestAll<T>({
    api: `orgs/${organization}/repos`,
    map,
  });
}

import { GitHubClient } from "../../client.ts";
import {
  GitHubRepository,
  GitHubOrg,
} from "../../types/mod.ts";

type RepositoryMap<T> = (repos: GitHubRepository[]) => T[];

export async function githubOrgsListRepos<T>(opts:
  & { map?: RepositoryMap<T> }
  & GitHubOrg
  & { client: GitHubClient }
) {
  const { map, organization, client } = opts;
  return await client.requestAll<T>({
    api: `orgs/${organization}/repos`,
    map,
  });
}

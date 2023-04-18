import { githubRequest, githubRequestAll } from "../request.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubOrder,
  GitHubOrg,
  Page,
  PageOpts,
} from "../types/mod.ts";
import { GitHubRepository } from "../types/repository.ts";

export enum GitHubSearchRepositoriesSort {
  Stars = "stars",
  Forks = "forks",
  HelpWantedIssues = "help-wanted-issues",
  Updated = "updated",
}

type GitHubSearchRepositoriesOpts = {
  q: string;
  sort?: GitHubSearchRepositoriesSort;
  order?: GitHubOrder;
};

/**
 * This function requires an organization argument to scope it, otherwise you could potentially return an enormous number of results.
 * @param opts The options for this query
 * @returns All repositories matching the query
 */
export async function githubSearchRepositoriesAll(
  opts:
    & GitHubSearchRepositoriesOpts
    & GitHubOrg
    & GitHubApi
    & GitHubCredentials,
) {
  const { q, sort, order, organization, endpoint, accessToken } = opts;
  const url = new URL(`${endpoint}/search/repositories`);
  url.searchParams.set("q", `${q} org:${organization}`);
  if (sort) url.searchParams.set("sort", sort);
  if (order) url.searchParams.set("order", order);
  return await githubRequestAll<GitHubRepository>({
    url,
    fn: ({ items }) => items as GitHubRepository[],
    accessToken,
  });
}

/**
 * A single page of results
 * @param opts The options for the query
 * @returns The total count and single page of respoitories
 */
export async function githubSearchRepositories(
  opts:
    & GitHubSearchRepositoriesOpts
    & PageOpts
    & GitHubOrg
    & GitHubApi
    & GitHubCredentials,
) {
  const { q, sort, order, endpoint, accessToken, page, perPage } = opts;
  const url = new URL(`${endpoint}/search/repositories`);
  url.searchParams.set("q", q);
  if (sort) url.searchParams.set("sort", sort);
  if (order) url.searchParams.set("order", order);
  if (page) url.searchParams.set("page", `${page + 1}`);
  if (perPage) url.searchParams.set("per_page", `${perPage}`);
  const { total_count, items } = await githubRequest<
    Page & { incomplete_results: boolean; items: GitHubRepository[] }
  >({
    url,
    accessToken,
  });
  return {
    total: total_count,
    items,
  };
}

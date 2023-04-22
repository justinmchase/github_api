import { GitHubClient } from "../client.ts";
import {
  GitHubOrder,
  GitHubOrg,
  Page,
  PageOpts,
  GitHubRepository,
} from "../types/mod.ts";

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
    & { client: GitHubClient }
) {
  const { q, sort, order, organization, client } = opts;
  const parameters = new URLSearchParams([
    ["q", `${q} org:${organization}`],
    ...sort ? [["sort", sort]] : [],
    ...order ? [["order", order]] : [],
  ]);
  return await client.requestAll<GitHubRepository>({
    api: "search/repositories",
    parameters,
    map: ({ items }) => items as GitHubRepository[],
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
    & { client: GitHubClient }
) {
  const { q, sort, order, page, perPage, client } = opts;
  const parameters = new URLSearchParams([
    ["q", q],
    ...sort ? [["sort", sort]] : [],
    ...order ? [["order", order]] : [],
    ...page ? [["page", `${page + 1}`]] : [],
    ...perPage ? [["per_page", `${perPage}`]] : [],
  ]);
  return await client.request<
    Page & { incomplete_results: boolean; items: GitHubRepository[] }
  >({
    api: "search/repositories",
    parameters,
  });
}

import { retry } from "std/async/mod.ts";
import { GitHubApiError } from "./error.ts";
import { GitHubCredentials } from "./types/mod.ts";

type GitHubRequestAllOpts<T> = GitHubRequestOpts & {
  fn: (result: Record<string, unknown>) => T[];
};

type GitHubRequestOpts = GitHubCredentials & {
  url: URL;
  version?: "2022-11-28";
  method?: "GET" | "POST" | "PUT" | "DELETE";
  accept?: string;
  body?: unknown; // todo: Serializable
  fetch?: typeof fetch;
};

export async function githubRequestAll<T>(
  opts: GitHubRequestAllOpts<T>,
): Promise<T[]> {
  const { url, fn } = opts;
  const results: T[] = [];
  const perPage = 100;
  let page = 0;
  let total = 0;
  do {
    url.searchParams.set("page", `${page + 1}`);
    url.searchParams.set("per_page", `${perPage}`);
    const result = await githubRequest<{ total_count: number }>(opts);
    const { total_count } = result;
    results.push(...fn(result));
    total = total_count;
    page += 1;
  } while ((page * perPage) < total);
  return results;
}

export async function githubRequest<T>(opts: GitHubRequestOpts): Promise<T> {
  const {
    url,
    method = "GET",
    accept = "application/vnd.github+json",
    version = "2022-11-28",
    accessToken,
    body,
    fetch: fn = fetch,
  } = opts;

  const res = await retry(async () =>
    await fn(url, {
      method,
      headers: {
        "Accept": accept,
        "X-GitHub-Api-Version": version,
        "Authorization": `Bearer ${accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  );
  const { ok, status } = res;
  if (!ok) {
    throw new GitHubApiError(
      url.toString(),
      status,
    );
  }

  if (status === 204) {
    return {} as T;
  } else {
    const results = await res.json();
    return results as T;
  }
}

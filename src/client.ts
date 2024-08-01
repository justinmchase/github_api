import { async, log } from "../deps/std.ts";
import {
  GitHubApi,
  GitHubCredentials,
  GitHubRequest,
  GitHubRequestAll,
} from "./mod.ts";
import { GitHubApiError } from "./error.ts";

type Next = (() => Promise<Response>) | (() => Response);

export class GitHubClient {
  private next = 0;
  private readonly endpoint: string;
  private readonly version: string;
  private readonly accessToken: string;
  private readonly logger: log.Logger;
  constructor(opts: GitHubApi & GitHubCredentials) {
    const { accessToken, endpoint, version } = opts;
    this.endpoint = endpoint ?? "https://api.github.com";
    this.version = version ?? "2022-11-28";
    this.accessToken = accessToken;
    this.logger = log.getLogger("github");
  }

  public async requestAll<T>(
    opts: GitHubRequestAll<T>,
  ): Promise<T[]> {
    const { max, map } = opts;
    const results: T[] = [];
    const perPage = max !== undefined ? Math.min(max, 50) : 50;
    const parameters = new URLSearchParams(opts.parameters ?? []);
    let page = 0;
    let total = Number.NaN;
    do {
      parameters.set("page", `${page + 1}`);
      parameters.set("per_page", `${perPage}`);
      const result = await this.request<{ total_count: number } | T[]>({
        ...opts,
        parameters,
      });

      if (!Array.isArray(result)) {
        const { total_count } = result;
        if (total_count !== undefined) {
          total = total_count;
        } else {
          total = Number.NaN;
        }
      }

      // Some apis just return an array of results, others return
      // an object with total_count and a property which contains
      // the array of results. The caller of this api should
      // provide a map function in the latter case which maps the
      // result object to an T[]
      const items = map?.(result) ?? result as T[] ?? [] as T[];
      results.push(...items);
      page += 1;

      // Some apis do not provide a total_count, instead we must
      // rely on the page having less items then the perPage
      // count to detect the end of the set
      if (items.length < perPage) {
        break;
      }

      // If a maximum is specified then we should stop when we reach it
      if (max !== undefined && items.length >= max) {
        break;
      }

    } while (Number.isNaN(total) || (page * perPage) < total);

    return results;
  }

  public async request<T>(opts: GitHubRequest): Promise<T> {
    const {
      method = "GET",
      api,
      parameters,
      accept = "application/vnd.github+json",
      userAgent = "deno.land/x/github_api",
      body,
      fetch: fn = fetch,
    } = opts;
    const url = new URL(`${this.endpoint}/${api}`);
    if (parameters) parameters.forEach((v, k) => url.searchParams.set(k, v));
    const res = await this.retry(async () =>
      await this.throttle(async () =>
        await fn(url, {
          method,
          headers: {
            "Accept": accept,
            "X-GitHub-Api-Version": this.version,
            "Authorization": `Bearer ${this.accessToken}`,
            "User-Agent": userAgent,
          },
          body: body ? JSON.stringify(body) : undefined,
        })
      )
    );
    const { status } = res;
    this.logger.debug(`[${status}] ${url}`, { url, status });
    if ([204, 205].includes(status)) {
      return {} as T;
    } else {
      return await res.json() as T;
    }
  }

  private async retry(fn: Next) {
    let i = 0;
    let lastStatus = 0;
    return await async.retry(async () => {
      if (i > 0) {
        this.logger.debug(`[${lastStatus}] retry (${i})...`, {
          status: lastStatus,
          retry: i,
        });
      }
      const res = await fn();
      const { ok, status, url } = res;
      if (!ok) {
        i++;
        lastStatus = status;
        const body = await res.json();
        throw new GitHubApiError(
          url.toString(),
          status,
          body,
        );
      }
      return res;
    });
  }

  private now() {
    // we need to round up to the next second to avoid being just inside the
    // rate limit boundary
    const now = Date.now();
    return now - (now % 1000) + 1000;
  }

  private async throttle(
    fn: Next,
  ) {
    const before = this.now();
    const ms = Math.max(0, this.next - before);
    if (ms > 0) {
      if (ms > 1000) {
        this.logger.debug(`throttling for ${(ms / 1000).toFixed(0)}s...`);
      }
      await async.delay(ms);
    }

    const response = await fn();

    const after = this.now();
    const { status, headers } = response;
    const limit = headers.get("x-ratelimit-limit");
    const remaining = headers.get("x-ratelimit-remaining");
    const reset = headers.get("x-ratelimit-reset");
    const resource = headers.get("x-ratelimit-resource");
    const used = headers.get("x-ratelimit-used");
    this.logger.debug(`ratelimit`, {
      limit,
      remaining,
      reset,
      resource,
      used,
    });

    // Handle throttle headers...
    // If this is provided then utilize it.
    const headerRetryAfter = headers.get("retry-after");

    // If the error is 403, then wait until the x-ratelimit-reset is reached before trying again.
    const headerRateLimitReset = headers.get("x-ratelimit-reset");

    // wait for N seconds
    const retryAfter = after +
      (headerRetryAfter ? (parseInt(headerRetryAfter) * 1000) : 0);

    // wait until epoch in seconds, if 403 was recieved
    const rateLimitReset = (status === 403 && headerRateLimitReset)
      ? (parseInt(headerRateLimitReset) * 1000)
      : after;

    // Wait for a minimum of 1s between requests
    const minLimit = after + 1000;

    // Utilize the largest delay
    this.next = Math.max(retryAfter, rateLimitReset, minLimit);

    return response;
  }
}

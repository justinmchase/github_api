import type { Serializable } from "../../deps/serializable.ts";

export type GitHubRequest = {
  api: string;
  parameters?: URLSearchParams;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  accept?: string;
  userAgent?: string;
  body?: Serializable;
  fetch?: typeof fetch;
};

export type GitHubRequestAll<T> = GitHubRequest & {
  // deno-lint-ignore no-explicit-any
  map?: (result: any) => T[];
};

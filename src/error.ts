import { Serializable } from "serializable/mod.ts";

export class GitHubApiError extends Error {
  constructor(
    public readonly url: string,
    public readonly status: number,
    public readonly body: Serializable
  ) {
    super(`Error calling github api [${status}] ${url}`);
  }
}

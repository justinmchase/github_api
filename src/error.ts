export class GitHubApiError extends Error {
  constructor(
    public readonly url: string,
    public readonly status: number,
  ) {
    super(`Error calling github api [${status}] ${url}`);
  }
}

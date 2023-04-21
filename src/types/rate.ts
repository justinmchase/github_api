export type GitHubRateLimit = {
  resources: {
    core: {
      limit: number,
      remaining: number,
      reset: number,
      used: number,
    },
    search: {
      limit: number,
      remaining: number,
      reset: number,
      used: number,
    },
    graphql: {
      limit: number,
      remaining: number,
      reset: number,
      used: number,
    },
    integration_manifest: {
      limit: number,
      remaining: number,
      reset: number,
      used: number,
    },
    code_scanning_upload: number,
    limit: number,
    remaining: number,
    reset: number,
    used: number,
  }
};

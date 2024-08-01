import { GitHubClient } from "../../../client.ts";
import { GitHubRepository } from "../../../mod.ts";
import { GitHubPullRequest } from "../../../types/pulls.ts";
import { GitHubReview } from "../../../types/review.ts";

type GitHubPullRequestReviewCreateOpts = {
  event: "APPROVE" | "REQUEST_CHANGES" | "COMMENT"
  body?: string
  comments?: {
    path: string
    position: number
    body: string
  }[]
}

export async function create(
  opts:
    & GitHubPullRequestReviewCreateOpts
    & { repository: GitHubRepository }
    & { pr: GitHubPullRequest }
    & { client: GitHubClient },
) {
  const {
    event,
    body = "",
    comments = [],
    pr: { number, head: { sha: commit_id } },
    repository: { name, owner: { login } },
    client,
  } = opts;
  return await client.request<GitHubReview>({
    api: `repos/${login}/${name}/pulls/${number}/reviews`,
    method: "POST",
    body: {
      commit_id,
      event,
      body,
      comments
    },
  });
}

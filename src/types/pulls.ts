import { GitHubCommit } from "./commit.ts";
import { DateTimeString } from "./date.ts";
import { GitHubLabel } from "./label.ts";
import { GitHubLink } from "./link.ts";
import { GitHubMilestone } from "./milestone.ts";
import { GitHubTeam } from "./team.ts";
import { GitHubUser } from "./user.ts";

export type GitHubPullRequest = {
  url: string
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  commits_url: string
  review_comments_url: string
  review_comment_url: string
  comments_url: string
  statuses_url: string
  number: number
  state: "open" | "closed",
  locked: boolean
  title: string
  user: GitHubUser
  body: string
  labels: GitHubLabel[]
  milestone: GitHubMilestone
  active_lock_reason: string
  created_at: DateTimeString
  updated_at: DateTimeString
  closed_at: DateTimeString
  merged_at: DateTimeString
  merge_commit_sha: string
  assignee: GitHubUser
  assignees: GitHubUser[]
  requested_reviewers: GitHubUser[]
  requested_teams: GitHubTeam[]
  head: GitHubCommit
  base: GitHubCommit
  _links: {
    self: GitHubLink
    html: GitHubLink
    issue: GitHubLink
    comments: GitHubLink
    review_comments: GitHubLink
    review_comment: GitHubLink
    commits: GitHubLink
    statuses: GitHubLink
  },
  author_association: "OWNER"
  auto_merge: boolean | null
  draft: boolean
  merged: boolean
  mergeable: boolean
  rebaseable: boolean
  mergeable_state: "clean"
  merged_by: GitHubUser
  comments: number
  review_comments: number
  maintainer_can_modify: boolean
  commits: number
  additions: number
  deletions: number
  changed_files: number
}
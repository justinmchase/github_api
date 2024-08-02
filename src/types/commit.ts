import type { DateTimeString } from "./date.ts";
import type { GitHubRepository } from "./repository.ts";
import type { GitHubUser } from "./user.ts";

export type GitHubCommit = {
  label: string;
  ref: string;
  sha: string;
  user: GitHubUser;
  repo: GitHubRepository;
};

export type GitHubCommitStatus = {
  state: "success" | "pending" | "error" | "failure";
  statuses: GitHubCommitStatusDetail[];
  sha: string;
  total_count: number;
  repository: GitHubRepository;
  commit_url: string;
  url: string;
};

export type GitHubCommitStatusDetail = {
  url: string;
  avatar_url: string;
  id: number;
  node_id: string;
  state: "success" | "pending" | "error" | "failure";
  description: string;
  target_url: string;
  context: string;
  created_at: DateTimeString;
  updated_at: DateTimeString;
};

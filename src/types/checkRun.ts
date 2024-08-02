import type { GitHubApp } from "./app.ts";
import type { DateTimeString } from "./date.ts";
import type { GitHubPullRequest } from "./pulls.ts";

export type GitHubCheckRun = {
  id: number;
  head_sha: string;
  node_id: string;
  external_id: string;
  url: string;
  html_url: string;
  details_url: string;
  status: string;
  conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required";
  started_at: DateTimeString;
  completed_at: DateTimeString;
  output: {
    title: string;
    summary: string;
    text: string;
    annotations_count: number;
    annotations_url: string;
  };
  name: string;
  check_suite: {
    id: number;
  };
  app: GitHubApp;
  pull_requests: GitHubPullRequest[];
};

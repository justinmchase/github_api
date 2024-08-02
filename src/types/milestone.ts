import type { DateTimeString } from "./date.ts";
import type { GitHubUser } from "./user.ts";

export type GitHubMilestone = {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: "open";
  title: string;
  description: string;
  creator: GitHubUser;
  open_issues: number;
  closed_issues: number;
  created_at: DateTimeString;
  updated_at: DateTimeString;
  closed_at: DateTimeString;
  due_on: DateTimeString;
};

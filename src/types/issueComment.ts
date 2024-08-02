import type { DateTimeString } from "./date.ts";
import type { GitHubUser } from "./user.ts";

export type GitHubIssueComment = {
  id: number;
  node_id: string;
  url: string;
  html_url: string;
  body: string;
  user: GitHubUser;
  created_at: DateTimeString;
  updated_at: DateTimeString;
  issue_url: string;
  author_association: "COLLABORATOR";
};

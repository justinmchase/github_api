import type { GitHubUser } from "./user.ts";
import type { GitHubLink } from "./link.ts";
import type { DateTimeString } from "./date.ts";

export enum GitHubReviewState {
  ChangesRequested = "CHANGES_REQUESTED",
  Approve = "APPROVED",
  Dismissed = "DISMISSED",
  Pending = "PENDING",
}

export type GitHubReview = {
  id: number;
  node_id: string;
  user: GitHubUser;
  body: string;
  state: GitHubReviewState;
  html_url: string;
  pull_request_url: string;
  _links: {
    html: GitHubLink;
    pull_request: GitHubLink;
  };
  submitted_at: DateTimeString;
  commit_id: string;
  author_association:
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
};

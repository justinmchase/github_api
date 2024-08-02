import type { GitHubReactions } from "./reactions.ts";
import type { GitHubUser } from "./user.ts";

export enum GitHubAuthorAssociation {
  Collaborator = "COLLABORATOR",
  Contributor = "CONTRIBUTOR",
  FirstTimer = "FIRST_TIMER",
  FirstTimeContributor = "FIRST_TIME_CONTRIBUTOR",
  Mannequin = "MANNEQUIN",
  Member = "MEMBER",
  None = "NONE",
  Owner = "OWNER",
}

export type GitHubCommitComment = {
  html_url: string;
  url: string;
  id: number;
  node_id: string;
  body: string;
  path?: string;
  position?: number;
  line?: number;
  commit_id: string;
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  author_association: GitHubAuthorAssociation;
  reactions: GitHubReactions;
};

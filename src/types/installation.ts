import { GitHubOrganization } from "./organization.ts";
import { GitHubInstallationPermissions } from "./permissions.ts";
import { GitHubRepository } from "./repository.ts";
import { GitHubUser } from "./user.ts";

export enum GithubInstallationActions {
  Deleted = "deleted",
  Created = "created",
}

export interface GitHubInstallationEvent {
  action: GithubInstallationActions;
  installation: GitHubInstallation;
}

export interface GitHubInstallation {
  id: number;
  app_id: number;
  target_type: "User" | "Organization";
  target_id: number;
  account: GitHubUser | GitHubOrganization;
  repository_selection: "selected";
  access_tokens_url: string;
  repositories_url: string;
  html_url: string;
  app_slug: string;
  permissions: GitHubInstallationPermissions;
  events: string[];
  created_at: string;
  updated_at: string;
  single_file_name: string | null;
  has_multiple_single_files: boolean;
  single_file_paths: string[];
  suspended_by: string | null;
  suspended_at: string | null;
  repositories: GitHubRepository[];
  sender?: GitHubUser;
}

import { GitHubEventName } from "./event.ts";
import { GitHubOrganization } from "./organization.ts";
import { GitHubInstallationPermissions } from "./permissions.ts";
import { GitHubUser } from "./user.ts";

export type GitHubApp = {
  id: number;
  slug: string;
  node_id: string;
  owner: GitHubUser | GitHubOrganization;
  name: string;
  description: string;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: GitHubInstallationPermissions;
  events: GitHubEventName[];
};

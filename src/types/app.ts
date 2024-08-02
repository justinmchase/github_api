import type { GitHubEventName } from "./event.ts";
import type { GitHubOrganization } from "./organization.ts";
import type { GitHubInstallationPermissions } from "./permissions.ts";
import type { GitHubUser } from "./user.ts";

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

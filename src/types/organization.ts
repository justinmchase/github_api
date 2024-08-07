import type { GitHubPermission } from "./permissions.ts";

export type GitHubOrganization = {
  type: "Organization";
  id: number;
  login: string;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  twitter_username: string;
  is_verified: boolean;
  has_organization_projects: boolean;
  has_repository_projects: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  total_private_repos: number;
  owned_private_repos: number;
  private_gists: number;
  disk_usage: number;
  collaborators: number;
  billing_email: string;
  plan: {
    name: string;
    space: number;
    private_repos: number;
    filled_seats: number;
    seats: number;
  };
  default_repository_permission: GitHubPermission;
  members_can_create_repositories: boolean;
  two_factor_requirement_enabled: boolean;
  members_allowed_repository_creation_type: "all";
  members_can_create_public_repositories: boolean;
  members_can_create_private_repositories: boolean;
  members_can_create_internal_repositories: boolean;
  members_can_create_pages: boolean;
  members_can_create_public_pages: boolean;
  members_can_create_private_pages: boolean;
  members_can_fork_private_repositories: boolean;
  web_commit_signoff_required: boolean;
  updated_at: string;
  archived_at: string | null;
  dependency_graph_enabled_for_new_repositories: boolean;
  dependabot_alerts_enabled_for_new_repositories: boolean;
  dependabot_security_updates_enabled_for_new_repositories: boolean;
  advanced_security_enabled_for_new_repositories: boolean;
  secret_scanning_enabled_for_new_repositories: boolean;
  secret_scanning_push_protection_enabled_for_new_repositories: boolean;
  secret_scanning_push_protection_custom_link: boolean;
  secret_scanning_push_protection_custom_link_enabled: string;
};

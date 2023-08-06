export type GitHubPermission = "read" | "write";
export type GitHubInstallationPermissions = {
  contents: GitHubPermission;
  metadata: GitHubPermission;
  deployments: GitHubPermission;
};

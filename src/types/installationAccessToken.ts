import type { DateTimeString } from "./date.ts";
import type { GitHubInstallationPermissions } from "./permissions.ts";
import type { GitHubRepository } from "./repository.ts";

export type GitHubInstallationAccessToken = {
  token: string;
  expires_at: DateTimeString;
  permissions: GitHubInstallationPermissions;
  repository_selection: "selected";
  repositories: GitHubRepository[];
};

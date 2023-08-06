import { GithubAccountType } from "./account.ts";

export enum GithubInstallationActions {
  Deleted = "deleted",
  Created = "created",
}

export interface GitHubInstallationEvent {
  action: GithubInstallationActions;
  id: number;
  targetId: number;
  type: GithubAccountType;
  repositories: number[];
}

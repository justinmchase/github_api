import { GitHubInstallationEvent } from "./installation.ts";
import { GitHubOrganization } from "./organization.ts";
import { GitHubPingEvent } from "./ping.ts";
import { GitHubRepository } from "./repository.ts";
import { GitHubUser } from "./user.ts";

export type GitHubEventCommon = {
  action?: string;
  sender?: GitHubUser;
  repository?: GitHubRepository;
  organization?: GitHubOrganization;
};

export type GitHubEvent =
  & GitHubEventCommon
  & (
    | GitHubPingEvent
    | GitHubInstallationEvent
  );

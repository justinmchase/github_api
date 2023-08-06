import { GitHubInstallationEvent } from "./installation.ts";
import { GitHubPingEvent } from "./ping.ts";
import { GitHubRepository } from "./repository.ts";
import { GitHubOrg } from "./types.ts";
import { GitHubUser } from "./user.ts";

export type GitHubEventCommon = {
  action?: string;
  sender?: GitHubUser;
  repository?: GitHubRepository;
  organization?: GitHubOrg;
};

export type GitHubEvent =
  & GitHubEventCommon
  & (
    | GitHubPingEvent
    | GitHubInstallationEvent
  );

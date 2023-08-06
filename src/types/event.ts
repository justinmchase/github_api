import { GitHubInstallationEvent } from "./installation.ts";
import { GitHubPingEvent } from "./ping.ts";

export type GitHubEvent =
  | GitHubPingEvent
  | GitHubInstallationEvent;

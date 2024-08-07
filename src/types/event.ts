import type { GitHubDeploymentProtectionRuleEvent } from "./deployment.ts";
import type { GitHubInstallationEvent } from "./installation.ts";
import type { GitHubOrganization } from "./organization.ts";
import type { GitHubPingEvent } from "./ping.ts";
import type { GitHubRepository } from "./repository.ts";
import type { GitHubUser } from "./user.ts";

export type GitHubEventName =
  | "branch_protection_rule"
  | "check_run"
  | "check_suite"
  | "create"
  | "delete"
  | "deployment"
  | "deployment_status"
  | "deployment_protection_rule"
  | "discussion"
  | "discussion_comment"
  | "fork"
  | "gollum"
  | "installation"
  | "issues"
  | "issue_comment"
  | "label"
  | "merge_group"
  | "milestone"
  | "page_build"
  | "ping"
  | "project"
  | "project_card"
  | "project_column"
  | "public"
  | "pull_request"
  | "pull_request_review"
  | "pull_request_review_comment"
  | "push"
  | "registry_package"
  | "release"
  | "repository"
  | "repository_dispatch"
  | "status"
  | "watch"
  | "workflow_dispatch"
  | "workflow_run";

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
    | GitHubDeploymentProtectionRuleEvent
  );

import { GitHubApp } from "./app.ts";
import { GitHubRepository } from "./repository.ts";
import { GitHubUser } from "./user.ts";

// deployment_protection_rule
export enum GitHubDeploymentProtectionRuleAction {
  Requested = "requested",
}

export type GitHubDeployment = {
  id: number;
  url: string;
  node_id: string;
  task: "deploy";
  original_environment: string;
  environment: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  statuses_url: string;
  repository_url: string;
  creator: GitHubUser;
  sha: string;
  ref: string;
  payload: unknown;
  transient_environment: boolean;
  production_environment: boolean;
  performed_via_github_app: GitHubApp;
};

export type GitHubDeploymentProtectionRuleEvent = {
  action: "requested";
  environment: string;
  event: "workflow_dispatch" | "pull_request";
  deployment_callback_url: string;
  deployment: GitHubDeployment;
  pull_requests: unknown[]; // todo: GitHubPullRequest
  repository: GitHubRepository;
  sender: GitHubUser;
  installation: {
    id: number;
    node_id: string;
  };
};

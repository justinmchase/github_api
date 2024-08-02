import type { DateTimeString } from "./date.ts";
import type { GitHubRepository } from "./repository.ts";

export enum GitHubNotificationReason {
  ApprovalRequested = "approval_requested", // You were requested to review and approve a deployment. For more information, see "Reviewing deployments."
  Assign = "assign", // You were assigned to the issue.
  Author = "author", // You created the thread.
  Comment = "comment", // You commented on the thread.
  CiActivity = "ci_activity", // A GitHub Actions workflow run that you triggered was completed.
  Invitation = "invitation", // You accepted an invitation to contribute to the repository.
  Manual = "manual", // You subscribed to the thread (via an issue or pull request).
  MemberFeatureRequested = "member_feature_requested", // Organization members have requested to enable a feature such as Draft Pull Requests or Copilot.
  Mention = "mention", // You were specifically @mentioned in the content.
  ReviewRequested = "review_requested", // You, or a team you're a member of, were requested to review a pull request.
  SecurityAlert = "security_alert", // GitHub discovered a security vulnerability in your repository.
  SecurityAdvisoryCredit = "security_advisory_credit", // You were credited for contributing to a security advisory.
  StateChange = "state_change", // You changed the thread state (for example, closing an issue or merging a pull request).
  Subscribed = "subscribed", // You're watching the repository.
  TeamMention = "team_mention", // You were on a team that was mentioned.
}

export type GitHubNotification = {
  id: number;
  repository: GitHubRepository;
  subject: {
    title: string;
    url: string;
    latest_comment_url: string;
    type: "Issue" | "PullRequest" | "Release" | "CheckSuite";
  };
  reason: GitHubNotificationReason;
  unread: boolean;
  updated_at: DateTimeString;
  last_read_at: DateTimeString;
  url: string;
  subscription_url: string;
};

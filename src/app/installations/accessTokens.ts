import type { GitHubClient } from "../../client.ts";
import type { GitHubInstallationAccessToken } from "../../types/installationAccessToken.ts";
import type { GitHubInstallationPermissions } from "../../types/permissions.ts";

export async function accessTokens(
  opts: {
    installationId: number;
    repositories?: string[];
    repository_ids?: number[];
    permissions?: GitHubInstallationPermissions;
    client: GitHubClient;
  },
): Promise<GitHubInstallationAccessToken> {
  const { installationId, repositories = [], client } = opts;
  return await client.request<GitHubInstallationAccessToken>({
    api: `app/installations/${installationId}/access_tokens`,
    method: "POST",
    body: {
      repositories,
    },
  });
}

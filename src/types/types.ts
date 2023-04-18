export type GitHubApi = {
  endpoint: string;
};

export type GitHubCredentials = {
  accessToken: string;
};

export type GitHubOrg = {
  organization: string;
};

export enum GitHubOrder {
  Descending = "desc",
  Ascending = "asc",
}

export type PageOpts = {
  perPage?: number;
  page?: number;
};
export type Page = {
  total_count: number;
};

export enum GitHubSecretVisibility {
  All = "all",
  Private = "private",
  Selected = "selected",
}

export enum GitHubVariableVisibility {
  All = "all",
  Private = "private",
  Selected = "selected",
}

export type GitHubModel = {
  created_at: string;
  updated_at: string;
};

export type GitHubNamed = {
  name: string;
};

export type GitHubSecret =
  & GitHubNamed
  & GitHubModel
  & (
    | { visibility: GitHubSecretVisibility.All }
    | { visibility: GitHubSecretVisibility.Private }
    | GitHubSelectedRepositorySecret
  );

export type GitHubSelectedRepositorySecret = {
  visibility: GitHubSecretVisibility.Selected;
  selected_repositories_url: string;
};

export type GitHubVariable =
  & GitHubNamed
  & GitHubModel
  & (
    | { visibility: GitHubVariableVisibility.All }
    | { visibility: GitHubVariableVisibility.Private }
    | GitHubSelectedRepositoryVariable
  );

export type GitHubSelectedRepositoryVariable = {
  visibility: GitHubVariableVisibility.Selected;
  selected_repositories_url: string;
};

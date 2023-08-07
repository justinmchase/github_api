export type GitHubContentType = 
  | "dir"
  | "file"
  | "submodule"
  | "symlink"
  ;

export type GitHubContent = 
  | GitHubFileContent[]
  | GitHubFileContent
  ;

export type GitHubFileContent = {
  type: GitHubContentType
  encoding: "base64" | string;
  size: number
  name: string
  path: string
  target?: string
  content: string;
  sha: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  submodule_git_url?: string;
  _links: {
    git: string;
    self: string;
    html: string;
  }
}
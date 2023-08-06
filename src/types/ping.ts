import { GitHubEventName } from "./event.ts";

export type GitHubHook = {
  type: "App" | string;
  id: number;
  app_id?: number;
  name: "web";
  active: boolean;
  events: GitHubEventName[];
  config: {
    content_type: "json" | "form";
    insecure_ssl: "0" | "1";
    url: string;
    secret?: string;
  };
  updated_at: string;
  created_at: string;
  url?: string;
  deliveries_url?: string;
  ping_url?: string;
  test_url?: string;
  last_response?: {
    code: number | null;
    status: string | null;
    message: string | null;
  };
};

export type GitHubPingEvent = {
  zen: string;
  hook_id: number;
  hook: GitHubHook;
  // todo: add these optional properties
  // organization object
  // repository object
  // sender object
};

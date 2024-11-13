export * from "./client.ts";
export * from "./credentials.ts";
export * from "./error.ts";
export * from "./rate.ts";
export * from "./types/mod.ts";

import { app } from "./app/mod.ts";
import { orgs } from "./orgs/mod.ts";
import { repos } from "./repos/mod.ts";
import { search } from "./search/mod.ts";
import { notifications } from "./notifications/mod.ts";
export const api = {
  app,
  orgs,
  repos,
  search,
  notifications,
};

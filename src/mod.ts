export * from "./client.ts";
export * from "./error.ts";
export * from "./rate.ts";
export * from "./types/mod.ts";

import { orgs } from "./orgs/mod.ts";
import { repos } from "./repos/mod.ts";
import { search } from "./search/mod.ts";
export const api = {
  orgs,
  repos,
  search,
};

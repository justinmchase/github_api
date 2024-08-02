import { assertEquals } from "@std/assert";
import type { GitHubDate } from "./date.ts";
import { githubFormatDate } from "./date.ts";

Deno.test({
  name: "dates",
  fn: async (t) => {
    const queries: [GitHubDate, string][] = [
      [
        { date: "2000-01-01" },
        "2000-01-01",
      ],
      [
        { date: "2000-01-01", time: "00:00:00" },
        "2000-01-01T00:00:00Z",
      ],
      [
        { date: "2000-01-01", time: "00:00:00", offset: "00:00" },
        "2000-01-01T00:00:00+00:00",
      ],
    ];

    for (const [d, expected] of queries) {
      await t.step({
        name: expected,
        fn: () => {
          const actual = githubFormatDate(d);
          assertEquals(actual, expected);
        },
      });
    }
  },
});

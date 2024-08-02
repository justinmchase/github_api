import { assertEquals } from "@std/assert";
import { GitHubClient } from "./mod.ts";

Deno.test({
  name: "fetch",
  fn: async (t) => {
    await t.step({
      name: "200",
      fn: async () => {
        const fn = async () => {
          const res = new Response("{}", { status: 200 });
          return await res;
        };
        const client = new GitHubClient({ accessToken: "test" });
        const data = await client.request({
          api: "test",
          fetch: fn,
        });

        assertEquals(data, {});
      },
    });

    await t.step({
      name: "400 once",
      fn: async () => {
        let retry = 0;
        const fn = async () => {
          const body = `{"retry":${retry}}`;
          switch (retry++) {
            case 0:
              return await new Response(body, { status: 400 });
            default:
              return await new Response(body, { status: 200 });
          }
        };
        const client = new GitHubClient({ accessToken: "test" });
        const data = await client.request({
          api: "test",
          fetch: fn,
        });

        assertEquals(data, { retry: 1 });
      },
    });
    await t.step({
      name: "400 twice",
      fn: async () => {
        let retry = 0;
        const fn = async () => {
          const body = `{"retry":${retry}}`;
          switch (retry++) {
            case 0:
              return await new Response(body, { status: 400 });
            case 1:
              return await new Response(body, { status: 400 });
            default:
              return await new Response(body, { status: 200 });
          }
        };
        const client = new GitHubClient({ accessToken: "test" });
        const data = await client.request({
          api: "test",
          fetch: fn,
        });

        assertEquals(data, { retry: 2 });
      },
    });

    await t.step({
      name: "403 retry-after",
      fn: async () => {
        let retry = 0;
        const fn = async () => {
          const body = `{"retry":${retry}}`;
          switch (retry++) {
            case 0:
              return await new Response(body, {
                status: 403,
                headers: { "retry-after": "2" },
              });
            default:
              return await new Response(body, { status: 200 });
          }
        };
        const client = new GitHubClient({ accessToken: "test" });
        const data = await client.request({
          api: "test",
          fetch: fn,
        });

        assertEquals(data, { retry: 1 });
      },
    });
    await t.step({
      name: "403 secondary limit",
      fn: async () => {
        let retry = 0;
        const fn = async () => {
          const body = `{"retry":${retry}}`;
          switch (retry++) {
            case 0:
              return await new Response(body, {
                status: 403,
                headers: {
                  "x-ratelimit-reset": `${
                    ((Date.now() / 1000) + 2).toFixed(0)
                  }`,
                },
              });
            default:
              return await new Response(body, { status: 200 });
          }
        };
        const client = new GitHubClient({ accessToken: "test" });
        const data = await client.request({
          api: "test",
          fetch: fn,
        });

        assertEquals(data, { retry: 1 });
      },
    });
  },
});

# AGENTS

## Required Validation

Before finalizing any code change in this repository, always run:

- `deno task test`
- `deno task check`

If either command fails, fix the issue or clearly report the blocker.

## CI and Publishing Notes

- Keep `test/**` excluded from JSR publication via `deno.jsonc` publish config.
- Keep workflows using repository tasks where possible so local and CI behavior
  stay aligned.

# Copilot Instructions

## Project Summary

This is a Deno 2 TypeScript SDK for the GitHub API. Keep changes small,
type-safe, and compatible with `deno test`, `deno lint`, and `deno fmt`.

## Required Validation

Before finalizing any code change in this repository, always run:

- `deno task check`

If validation fails, fix the issue or clearly report the blocker.

## Deno Conventions

- Use Deno-first APIs and standard library modules when practical.
- Keep TypeScript imports explicit with `.ts` extensions for local files.
- Prefer imports from `deno.jsonc` import map aliases (`@std/*`, `@djwt`, etc.)
  instead of ad hoc URL imports.
- Avoid introducing unstable Deno APIs/flags unless explicitly requested.
- Do not add new runtime permissions to tests unless strictly necessary.
- If a Node compatibility API is required (for example `node:crypto`), keep
  usage minimal and documented in code.

## Testing Guidance

- Add unit tests for behavioral changes.
- Prefer deterministic tests that do not require network access.
- Keep long-running retry/timing tests limited and focused.
- Use fixtures in `test/` for test-only artifacts.

## Publishing and CI

- Keep `test/**` excluded from JSR publication via `deno.jsonc` publish config.
- Prefer repository tasks/scripts in workflows so local and CI behavior stay
  aligned.
- When changing exported API surface, ensure `npx jsr publish --dry-run`
  succeeds through the `check` task.

## Editing Expectations

- Preserve existing project structure and naming patterns.
- Keep public API changes intentional and reflected in tests.
- Avoid unrelated refactors while addressing a focused task.

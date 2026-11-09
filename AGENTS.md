# AGENTS.md

Non-obvious rules for this repository: conventions, invariants, and commands that are easy to get wrong. Directory layout and dependency versions are omitted — read them from the code.

`@lilib/hooks` is a published React hooks library: one hook per module in `src/`, re-exported from `src/index.ts`, documented on a Docusaurus site. Use pnpm for every command (`pnpm install`); npm only appears inside package scripts.

## Commands

- `pnpm test` — the full matrix: React 16/17/18/19 in parallel (16–18 use the generated `.test-deps/`, 19 uses root dependencies), redirected via `moduleNameMapper` in `jest.config.js`. Keep it green.
- `pnpm test:react19 tests/useXxx.test.tsx` — one file; swap `react19` for `react16`/`react17`/`react18` to reproduce version-specific failures (each of those first re-creates `.test-deps/reactX`).
- `pnpm lint` — typecheck + ESLint + Prettier check (`pnpm lint:fix` auto-fixes); the default verification for any change.
- `pnpm dev` — docs site locally. `pnpm build` builds the **docs site**, not the package; `pnpm dist` builds the package.

## Compatibility Contract (Must Follow)

Every hook must support React 16.8+ / 17 / 18 / 19, as well as SSR and StrictMode.

- **SSR safety**: Never access `window`/`document`/storage at module scope or during render without an `inBrowser` guard; return safe fallback values outside the browser (`false`, `0`, `undefined`). Always use `useIsomorphicLayoutEffect` for layout effects.
- **StrictMode**: Effects must be idempotent — mount/cleanup pairs must survive double invocation.
- **Cleanup**: All timers, listeners, subscriptions, or pending tasks must be cancelled on unmount (`useUnmount`).
- **Polyfills**: Browser polyfills must be introduced as side-effect imports (e.g., `import "requestidlecallback"` at the top of `useLoad`) and declared in `dependencies` — this package ships with `sideEffects: false`, so plain imports would be tree-shaken away.

## Code Rules

- Compose new functionality from the library's own primitive hooks (`useLatestRef`, `usePersist`, `useSafeState`, `useUnmount`, `useMountedRef`/`useUnmountedRef`, `useUpdate`, etc.) instead of reimplementing their logic.
- One hook per file; return tuples/objects with `as const`.
- lodash must be imported via subpaths (`lodash/isEqual`); importing the whole package is forbidden.
- Published code may only import from within `src/` (the published package contains only `src` and `dist`).
- Docs and comments are written in English by default and must follow English writing conventions; when authoring docs for a specific language, write in that language with its corresponding conventions.
- Every hook must have reasonable and accurate JSDoc comments describing its purpose, parameters, and return values (`@param`, `@returns`) — explain what the hook does, what each parameter means, and what each returned value represents.
- When a change alters a hook's behavior, options, or return values, update its JSDoc, `docs/useXxx.mdx`, and its row in both the Getting Started and `README.md` tables in the same commit.
- Except for hook API documentation (JSDoc), comments must be as concise and accurate as possible — only add comments where necessary; do not comment self-evident logic.

## Adding a Hook

Adding a new hook touches the following places:

1. `src/useXxx.ts` + export it under the matching category in `src/index.ts` (`tests/index.test.ts` scans `src/` and requires the exports to match it exactly).
2. Cover the hook with tests via `tests/helpers/renderHook`. Usually a dedicated `tests/useXxx.test.tsx`; when existing suites already cover the hook's behavior (e.g. `useIsomorphicLayoutEffect` is covered by `tests/ssr.test.tsx`), a dedicated file is not mandatory.
3. Add it to `AllHooks` in `tests/ssr.test.tsx` (and to `BrowserValueHooks` as well if it returns browser-dependent values).
4. Docs: `docs/useXxx.mdx` (intro + `## API` + `## Example`, or `## Examples` when there are several) registered in `docs/sidebars.js`. An inline code example in the mdx is acceptable for simple hooks; use `docs/examples/UseXxx.tsx` (default export, importing from `@lilib/hooks`) with `ExampleBlock` when an interactive demo adds value.
5. Update the hooks table in Getting Started and `README.md`.

No build config changes are needed — the Babel cjs/esm, Rollup umd, and tsc types pipelines pick up new modules automatically.

## Testing Rules

- Use `tests/helpers/renderHook` (it selects the testing library per React version at runtime) — never import `@testing-library/*` render functions directly.
- New hook tests must cover cleanup on unmount and StrictMode double invocation (see the contract above).
- Timer-related tests use `jest.useFakeTimers()` (rAF / requestIdleCallback remain real per the jest config).
- SSR-specific behavior goes into files marked `/** @jest-environment node */` or `*.ssr.test.ts`.
- `useLoad.test.tsx` is whitelisted for unhandled promise rejections in `tests/helpers/environment.ts` (the hook surfaces failures through its `error` state rather than rejecting). Only add a file to `FILES_WITH_EXPECTED_REJECTIONS` for an equally justified reason.
- lint-staged runs the relevant Jest tests against staged files — keep every commit self-contained and passing.

## Build & Release Rules

- CHANGELOG.md is generated automatically by release-it from commit history — never edit it by hand. Releases (`pnpm release`) are maintainer-only and also build and deploy the docs site (`gh-pages`); `pnpm release:dry-run` gates them on `lint`, `test`, and `dist`.
- Before running `git commit`, show the proposed commit message to the user and wait for explicit confirmation; never commit with an unconfirmed message.
- Commit messages must follow Conventional Commits (enforced by commitlint via husky) and be written in English. Hook names and hook parameter names in commit messages must be wrapped in backticks, except for hook names used as the scope.
- When modifying an existing hook, use that hook's name as the commit message scope without backticks.
- Only commits that change published source (`src/`) may generate changelog entries, via `feat`, `fix`, `perf`, or a `!`-suffixed type (e.g. `feat!:`/`chore!:` — do not use a `BREAKING CHANGE` footer). Commits that only touch docs, tests, build scripts, or config must use non-changelog types (`docs`, `test`, `build`, `ci`, `chore`) instead.

## Verifying Changes

- After every code change, run `pnpm lint` and the relevant tests.
- At the end of each round of changes in a conversation, run a code review loop: review the change for correctness, design soundness, and completeness (use a code-review capability or a dedicated reviewer when available), fix every confirmed issue directly, then review again — repeat until a review reports no remaining confirmed issues. Issues that need user confirmation stay unresolved: ask the user instead of auto-fixing them.

## Do Not "Fix"

The following configs look odd but are intentional — leave them as-is:

- `@typescript-eslint/no-explicit-any` and `react-hooks/refs` in ESLint are disabled on purpose: generic hook constraints need `any`, and low-level hooks store the latest values in refs.
- `useLoad`'s `key` option must be an immutable value (changing it triggers a warning and may break shared state).
- Doc examples import from `@lilib/hooks`, which is aliased to `src/` (tsconfig paths + Docusaurus webpack plugin).
- `maxWorkers: "25%"` and `workerGracefulExitTimeout` in `jest.config.js` prevent four parallel Jest processes from starving each other of resources.

# AGENTS.md

Non-obvious rules for this repository. Information that can be read directly from the codebase (directory structure, scripts, config files) is intentionally omitted.

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
- Except for hook API documentation (JSDoc), comments must be as concise and accurate as possible — only add comments where necessary; do not comment self-evident logic.

## Adding a Hook

Adding a new hook requires modifying five places — missing any one of them breaks CI or leaves users without docs:

1. `src/useXxx.ts` + export it under the matching category in `src/index.ts` (`tests/index.test.ts` scans `src/` and requires the exports to match it exactly).
2. Write `tests/useXxx.test.tsx` via `tests/helpers/renderHook`.
3. Add it to `AllHooks` in `tests/ssr.test.tsx` (and to `BrowserValueHooks` as well if it returns browser-dependent values).
4. Docs: `docs/useXxx.mdx` (intro + `## API` + `## Example`), `docs/examples/UseXxx.tsx` (default export, importing from `@lilib/hooks`), and register it in `docs/sidebars.js`.
5. Update the hooks table in Getting Started and `README.md`.

## Testing Rules

- The test matrix runs React 16/17/18/19 in parallel; 16–18 use the generated `.test-deps/`, 19 uses root dependencies, redirected via `moduleNameMapper`. Always keep the entire matrix green.
- Use `tests/helpers/renderHook` (it selects the testing library per React version at runtime) — never import `@testing-library/*` render functions directly.
- New hook tests must cover cleanup on unmount and StrictMode idempotency — mount/cleanup pairs must survive double invocation.
- `useLoad.test.tsx` is whitelisted for unhandled promise rejections in `tests/helpers/environment.ts` (the hook surfaces failures through its `error` state rather than rejecting). Only add a file to `FILES_WITH_EXPECTED_REJECTIONS` for an equally justified reason.
- Timer-related tests use `jest.useFakeTimers()` (rAF / requestIdleCallback remain real per the jest config).
- SSR-specific behavior goes into files marked `/** @jest-environment node */` or `*.ssr.test.ts`.
- lint-staged runs the relevant Jest tests against staged files — keep every commit self-contained and passing.

## Build & Release Rules

- Adding a hook requires no build config changes (Babel cjs/esm, Rollup umd, tsc types).
- CHANGELOG.md is generated automatically by release-it from commit history — never edit it by hand.
- Commit messages must follow Conventional Commits (enforced by commitlint via husky) and be written in English. Hook names and hook parameter names in commit messages must be wrapped in backticks.

## Do Not "Fix"

The following configs look odd but are intentional — leave them as-is:

- `@typescript-eslint/no-explicit-any` and `react-hooks/refs` in ESLint are disabled on purpose: generic hook constraints need `any`, and low-level hooks store the latest values in refs.
- `useLoad`'s `key` option must be an immutable value (changing it triggers a warning and may break shared state).
- Doc examples import from `@lilib/hooks`, which is aliased to `src/` (tsconfig paths + Docusaurus webpack plugin).
- `maxWorkers: "25%"` and `workerGracefulExitTimeout` in `jest.config.js` prevent four parallel Jest processes from starving each other of resources.

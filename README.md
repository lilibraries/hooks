# @lilib/hooks

[![npm version](https://img.shields.io/npm/v/@lilib/hooks?style=flat-square)](https://www.npmjs.com/package/@lilib/hooks)
[![npm downloads](https://img.shields.io/npm/dm/@lilib/hooks?style=flat-square)](https://www.npmjs.com/package/@lilib/hooks)
[![license](https://img.shields.io/npm/l/@lilib/hooks?style=flat-square)](https://github.com/lilibraries/hooks/blob/master/LICENSE)

A collection of practical React hooks covering async data, states, effects, callbacks, refs and browser APIs — written in TypeScript, compatible with React 16.8+, 17, 18 and 19, and safe for SSR and StrictMode.

- [Documentation](https://lilibraries.github.io/hooks/) — full API reference with live examples
- [Changelog](https://github.com/lilibraries/hooks/blob/master/CHANGELOG.md)
- [Report an issue](https://github.com/lilibraries/hooks/issues)

## Features

- More than 50 hooks covering async data, effects, states, callbacks, refs and browser APIs.
- Works with React 16.8+, 17, 18 and 19.
- SSR and StrictMode safe — graceful fallbacks outside the browser, and idempotent effects with proper cleanup.
- Fully typed — written in TypeScript.
- Ships ESM, CJS and UMD builds.
- Tree-shakeable — bundlers can drop unused hooks from the ESM build.

## Install

```shell
pnpm add @lilib/hooks
# Or
npm install @lilib/hooks
```

## Usage

```tsx
import { useLoad } from "@lilib/hooks";

function UserProfile({ userId }: { userId: string }) {
  const { data, error, loading } = useLoad(
    () => fetch(`/users/${userId}`).then((response) => response.json()),
    [userId],
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return <div>Hello, {data.name}!</div>;
}
```

See the [documentation](https://lilibraries.github.io/hooks/) for the full API reference and live examples of every hook.

## Hooks

### Async

| Hook                                                         | Description                                                |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| [`useLoad`](https://lilibraries.github.io/hooks/useLoad)     | Load async data, typically for network requests.           |
| [`useReload`](https://lilibraries.github.io/hooks/useReload) | Reload all `useLoad` requests that share the same `key`.   |
| [`useSubmit`](https://lilibraries.github.io/hooks/useSubmit) | Submit network requests such as create, update and delete. |

### Effects

| Hook                                                                                         | Description                                                                                            |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`useMount`](https://lilibraries.github.io/hooks/useMount)                                   | Run an effect after the component is mounted.                                                          |
| [`useUpdate`](https://lilibraries.github.io/hooks/useUpdate)                                 | Run an effect after the component updates (the initial mount is skipped).                              |
| [`useUnmount`](https://lilibraries.github.io/hooks/useUnmount)                               | Run an effect when the component unmounts.                                                             |
| [`useRefEffect`](https://lilibraries.github.io/hooks/useRefEffect)                           | Like `React.useEffect`, but ReactRefs in the deps are dereferenced to `ref.current` before comparison. |
| [`useRefUpdate`](https://lilibraries.github.io/hooks/useRefUpdate)                           | Like `useUpdate`, but ReactRefs in the deps are dereferenced to `ref.current` before comparison.       |
| [`useLayoutMount`](https://lilibraries.github.io/hooks/useLayoutMount)                       | Like `useMount`, but runs before the browser paints.                                                   |
| [`useLayoutUpdate`](https://lilibraries.github.io/hooks/useLayoutUpdate)                     | Like `useUpdate`, but runs before the browser paints.                                                  |
| [`useLayoutRefEffect`](https://lilibraries.github.io/hooks/useLayoutRefEffect)               | Like `useRefEffect`, but runs before the browser paints.                                               |
| [`useLayoutRefUpdate`](https://lilibraries.github.io/hooks/useLayoutRefUpdate)               | Like `useRefUpdate`, but runs before the browser paints.                                               |
| [`useIsomorphicLayoutEffect`](https://lilibraries.github.io/hooks/useIsomorphicLayoutEffect) | `React.useLayoutEffect` in the DOM, `React.useEffect` during SSR.                                      |

### States

| Hook                                                                         | Description                                                                                                     |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`useCache`](https://lilibraries.github.io/hooks/useCache)                   | Cache data for a certain period of time, with optional sync between components sharing the same cache instance. |
| [`useToggle`](https://lilibraries.github.io/hooks/useToggle)                 | Manage a boolean value.                                                                                         |
| [`useSetState`](https://lilibraries.github.io/hooks/useSetState)             | Like `this.setState` of class components, merging partial state updates.                                        |
| [`useSafeState`](https://lilibraries.github.io/hooks/useSafeState)           | Like `React.useState`, but setting state after unmount is safe.                                                 |
| [`useDelayedValue`](https://lilibraries.github.io/hooks/useDelayedValue)     | Delay updates to a value.                                                                                       |
| [`useMemoizedValue`](https://lilibraries.github.io/hooks/useMemoizedValue)   | Return the previous value until the value actually changes (deep comparison).                                   |
| [`useThrottledValue`](https://lilibraries.github.io/hooks/useThrottledValue) | Throttle a value.                                                                                               |
| [`useDebouncedValue`](https://lilibraries.github.io/hooks/useDebouncedValue) | Debounce a value.                                                                                               |

### Callbacks

| Hook                                                             | Description                                                            |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`useRaf`](https://lilibraries.github.io/hooks/useRaf)           | Invoke a callback before the browser repaints.                         |
| [`useIdle`](https://lilibraries.github.io/hooks/useIdle)         | Invoke a callback when the browser is idle.                            |
| [`useAnimate`](https://lilibraries.github.io/hooks/useAnimate)   | Run JavaScript animations.                                             |
| [`useTimeout`](https://lilibraries.github.io/hooks/useTimeout)   | Execute a callback after a delay.                                      |
| [`useInterval`](https://lilibraries.github.io/hooks/useInterval) | Run a callback repeatedly at a fixed interval.                         |
| [`usePersist`](https://lilibraries.github.io/hooks/usePersist)   | Keep a stable function identity while always calling the latest logic. |
| [`useRerender`](https://lilibraries.github.io/hooks/useRerender) | Re-render the component manually, usually for mutable data.            |
| [`useThrottle`](https://lilibraries.github.io/hooks/useThrottle) | Use a throttled callback.                                              |
| [`useDebounce`](https://lilibraries.github.io/hooks/useDebounce) | Use a debounced callback.                                              |

### Refs

| Hook                                                                     | Description                                                                                    |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [`useLatestRef`](https://lilibraries.github.io/hooks/useLatestRef)       | A ref that always points to the latest value, avoiding stale closures in long-lived callbacks. |
| [`usePreviousRef`](https://lilibraries.github.io/hooks/usePreviousRef)   | A ref that points to the value from the previous update.                                       |
| [`useComposedRef`](https://lilibraries.github.io/hooks/useComposedRef)   | Compose multiple refs (objects or callbacks) into one.                                         |
| [`useMountedRef`](https://lilibraries.github.io/hooks/useMountedRef)     | A ref that tells whether the component is mounted.                                             |
| [`useUnmountedRef`](https://lilibraries.github.io/hooks/useUnmountedRef) | A ref that tells whether the component is unmounted.                                           |

### Browser

| Hook                                                                                     | Description                                                                        |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`useTitle`](https://lilibraries.github.io/hooks/useTitle)                               | Set the document title.                                                            |
| [`useFavicon`](https://lilibraries.github.io/hooks/useFavicon)                           | Set the document favicon.                                                          |
| [`useOnline`](https://lilibraries.github.io/hooks/useOnline)                             | Detect whether the network is online.                                              |
| [`useDarkMode`](https://lilibraries.github.io/hooks/useDarkMode)                         | Detect whether the system prefers a dark color scheme.                             |
| [`usePageVisible`](https://lilibraries.github.io/hooks/usePageVisible)                   | Detect whether the page is visible, including bfcache restores.                    |
| [`useWindowFocus`](https://lilibraries.github.io/hooks/useWindowFocus)                   | Detect whether the window has focus.                                               |
| [`useMatchMedia`](https://lilibraries.github.io/hooks/useMatchMedia)                     | Determine whether the document matches a media query.                              |
| [`useWindowSize`](https://lilibraries.github.io/hooks/useWindowSize)                     | Get the window size.                                                               |
| [`useElementSize`](https://lilibraries.github.io/hooks/useElementSize)                   | Get the size of a DOM element.                                                     |
| [`useIntersecting`](https://lilibraries.github.io/hooks/useIntersecting)                 | Detect whether an element intersects the viewport or a specified root.             |
| [`useClickOutside`](https://lilibraries.github.io/hooks/useClickOutside)                 | Trigger a callback when clicking outside the target area.                          |
| [`useEventListener`](https://lilibraries.github.io/hooks/useEventListener)               | Set up an event listener on the target.                                            |
| [`useResizeObserver`](https://lilibraries.github.io/hooks/useResizeObserver)             | Observe an element's size changes.                                                 |
| [`useIntersectionObserver`](https://lilibraries.github.io/hooks/useIntersectionObserver) | Observe changes in an element's intersection with another element or the viewport. |
| [`useCookie`](https://lilibraries.github.io/hooks/useCookie)                             | Get, set and/or remove cookies.                                                    |
| [`useLocalStorage`](https://lilibraries.github.io/hooks/useLocalStorage)                 | Get, set and/or remove `localStorage`.                                             |
| [`useSessionStorage`](https://lilibraries.github.io/hooks/useSessionStorage)             | Get, set and/or remove `sessionStorage`.                                           |

## Changelog

See [CHANGELOG.md](https://github.com/lilibraries/hooks/blob/master/CHANGELOG.md) for the full release history.

## Contributing

Contributions are welcome! Feel free to [open an issue](https://github.com/lilibraries/hooks/issues) or submit a pull request.

## License

[MIT](./LICENSE)

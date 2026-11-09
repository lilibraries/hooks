# Getting Started

`@lilib/hooks` is a collection of practical React hooks covering async data, states, effects, callbacks, refs and browser APIs — written in TypeScript, compatible with React 16.8+, 17, 18 and 19, and safe for SSR and StrictMode.

## Features

- More than 50 hooks covering async data, effects, states, callbacks, refs and browser APIs.
- Works with React 16.8+, 17, 18 and 19.
- SSR-safe — graceful fallbacks outside the browser.
- StrictMode-safe — idempotent effects with proper cleanup.
- Fully typed — written in TypeScript.
- Ships ESM, CJS and UMD builds.
- Tree-shakeable — bundlers can drop unused hooks from the ESM build.

## Install

```shell
npm install @lilib/hooks
```
```shell
pnpm add @lilib/hooks
```

## Quick start

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

For the full API reference and live examples, check out the docs of each hook listed below.

## Hooks

### Async

| Hook                       | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| [`useLoad`](useLoad.md)     | Load async data, typically for network requests.           |
| [`useReload`](useReload.md) | Reload all `useLoad` requests that share the same `key`.   |
| [`useSubmit`](useSubmit.md) | Submit network requests such as create, update and delete. |

### Effects

| Hook                                                       | Description                                                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`useMount`](useMount.md)                                   | Run an effect after the component is mounted.                                                          |
| [`useUpdate`](useUpdate.md)                                 | Run an effect after the component updates (the initial mount is skipped).                              |
| [`useUnmount`](useUnmount.md)                               | Run an effect when the component unmounts.                                                             |
| [`useRefEffect`](useRefEffect.md)                           | Like `React.useEffect`, but ReactRefs in the deps are dereferenced to `ref.current` before comparison. |
| [`useRefUpdate`](useRefUpdate.md)                           | Like `useUpdate`, but ReactRefs in the deps are dereferenced to `ref.current` before comparison.       |
| [`useLayoutMount`](useLayoutMount.md)                       | Like `useMount`, but runs before the browser paints.                                                   |
| [`useLayoutUpdate`](useLayoutUpdate.md)                     | Like `useUpdate`, but runs before the browser paints.                                                  |
| [`useLayoutRefEffect`](useLayoutRefEffect.md)               | Like `useRefEffect`, but runs before the browser paints.                                               |
| [`useLayoutRefUpdate`](useLayoutRefUpdate.md)               | Like `useRefUpdate`, but runs before the browser paints.                                               |
| [`useIsomorphicLayoutEffect`](useIsomorphicLayoutEffect.md) | `React.useLayoutEffect` in the DOM, `React.useEffect` during SSR.                                      |

### States

| Hook                                             | Description                                                                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| [`useCache`](useCache.md)                         | Cache data for a certain period of time, with optional sync between components sharing the same cache instance. |
| [`useToggle`](useToggle.md)                       | Manage a boolean value.                                                                                         |
| [`useSetState`](useSetState.md)                   | Like `this.setState` of class components, merging partial state updates.                                        |
| [`useSafeState`](useSafeState.md)                 | Like `React.useState`, but setting state after unmount is safe.                                                 |
| [`useControllableState`](useControllableState.md) | Manage a value that can be either controlled or uncontrolled.                                                   |
| [`useDelayedValue`](useDelayedValue.md)           | Delay updates to a value.                                                                                       |
| [`useMemoizedValue`](useMemoizedValue.md)         | Return the previous value until the value actually changes (deep comparison).                                   |
| [`useThrottledValue`](useThrottledValue.md)       | Throttle a value.                                                                                               |
| [`useDebouncedValue`](useDebouncedValue.md)       | Debounce a value.                                                                                               |

### Callbacks

| Hook                           | Description                                                            |
| ------------------------------ | ---------------------------------------------------------------------- |
| [`useRaf`](useRaf.md)           | Invoke a callback before the browser repaints.                         |
| [`useIdle`](useIdle.md)         | Invoke a callback when the browser is idle.                            |
| [`useAnimate`](useAnimate.md)   | Run JavaScript animations.                                             |
| [`useTimeout`](useTimeout.md)   | Execute a callback after a delay.                                      |
| [`useInterval`](useInterval.md) | Run a callback repeatedly at a fixed interval.                         |
| [`usePersist`](usePersist.md)   | Keep a stable function identity while always calling the latest logic. |
| [`useRerender`](useRerender.md) | Re-render the component manually, usually for mutable data.            |
| [`useThrottle`](useThrottle.md) | Use a throttled callback.                                              |
| [`useDebounce`](useDebounce.md) | Use a debounced callback.                                              |

### Refs

| Hook                                   | Description                                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`useLatestRef`](useLatestRef.md)       | A ref that always points to the latest value, avoiding stale closures in long-lived callbacks. |
| [`usePreviousRef`](usePreviousRef.md)   | A ref that points to the value from the previous update.                                       |
| [`useComposedRef`](useComposedRef.md)   | Compose multiple refs (objects or callbacks) into one.                                         |
| [`useMountedRef`](useMountedRef.md)     | A ref that tells whether the component is mounted.                                             |
| [`useUnmountedRef`](useUnmountedRef.md) | A ref that tells whether the component is unmounted.                                           |

### Browser

| Hook                                                   | Description                                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [`useTitle`](useTitle.md)                               | Set the document title.                                                                |
| [`useFavicon`](useFavicon.md)                           | Set the document favicon.                                                              |
| [`useOnline`](useOnline.md)                             | Detect whether the network is online.                                                  |
| [`useDarkMode`](useDarkMode.md)                         | Detect whether the system prefers a dark color scheme.                                 |
| [`usePageVisible`](usePageVisible.md)                   | Detect whether the page is visible, including bfcache restores.                        |
| [`useWindowFocus`](useWindowFocus.md)                   | Detect whether the window has focus.                                                   |
| [`useMatchMedia`](useMatchMedia.md)                     | Determine whether the document matches a media query.                                  |
| [`useWindowSize`](useWindowSize.md)                     | Get the window size.                                                                   |
| [`useElementSize`](useElementSize.md)                   | Get the size of a DOM element.                                                         |
| [`useIntersecting`](useIntersecting.md)                 | Detect whether an element intersects the viewport or a specified root.                 |
| [`useClickOutside`](useClickOutside.md)                 | Trigger a callback when clicking outside the target area.                              |
| [`useEventListener`](useEventListener.md)               | Set up an event listener on the target.                                                |
| [`useResizeObserver`](useResizeObserver.md)             | Observe an element's size changes.                                                     |
| [`useMutationObserver`](useMutationObserver.md)         | Observe changes to a DOM node, such as inserted or removed child nodes and attributes. |
| [`useIntersectionObserver`](useIntersectionObserver.md) | Observe changes in an element's intersection with another element or the viewport.     |
| [`useCookie`](useCookie.md)                             | Get, set and/or remove cookies.                                                        |
| [`useLocalStorage`](useLocalStorage.md)                 | Get, set and/or remove `localStorage`.                                                 |
| [`useSessionStorage`](useSessionStorage.md)             | Get, set and/or remove `sessionStorage`.                                               |

## Changelog

See [CHANGELOG.md](https://github.com/lilibraries/hooks/blob/master/CHANGELOG.md) for the full release history.

## License

[MIT](https://github.com/lilibraries/hooks/blob/master/LICENSE)

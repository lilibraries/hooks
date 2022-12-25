# Hooks

React hook library.

## Features

- Supports React 16.8+, 17+ and 18+.
- Supports SSR.
- Supports React [StrictMode](https://reactjs.org/docs/strict-mode.html).
- Supports network requests.
- Provides 50+ hooks.

## Install

```shell
npm install --save @lilib/hooks
```

## Example

```tsx
import React from "react";
import { useLoad } from "@lilib/hooks";

function Example() {
  const {data, error, loading} = useLoad(() => {
    return fetch('/users/0').then(response => response.json())
  })
  ...
}
```

## Document

https://lilibraries.github.io/hooks/

## Hooks

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Hook</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="9">Effects</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/useOnce">
          <code>useOnce</code>
        </a>
      </td>
      <td>Run effect synchronously only once.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useMount">
          <code>useMount</code>
        </a>
      </td>
      <td>Run effect after the component is mounted.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useUpdate">
          <code>useUpdate</code>
        </a>
      </td>
      <td>
        Run effect after the component is updated or the deps are changed,
        ignore on mount.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useUnmount">
          <code>useUnmount</code>
        </a>
      </td>
      <td>Run effect on the component unmount.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useTargetEffect">
          <code>useTargetEffect</code>
        </a>
      </td>
      <td>
        It accepts functions or refs as effect dependencies. It is useful when
        using DOM nodes as effect dependencies.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLayoutMount">
          <code>useLayoutMount</code>
        </a>
      </td>
      <td>
        It's similar to
        <a href="https://lilibraries.github.io/hooks/useMount">
          <code>useMount</code>
        </a>
        , except it uses <a href="https://lilibraries.github.io/hooks/useIsomorphicLayoutEffect">
          <code>useIsomorphicLayoutEffect</code>
        </a> internally.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLayoutUpdate">
          <code>useLayoutUpdate</code>
        </a>
      </td>
      <td>
        It's similar to
        <a href="https://lilibraries.github.io/hooks/useUpdate">
          <code>useUpdate</code>
        </a>
        , except it uses <a href="https://lilibraries.github.io/hooks/useIsomorphicLayoutEffect">
          <code>useIsomorphicLayoutEffect</code>
        </a> internally.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLayoutTargetEffect">
          <code>useLayoutTargetEffect</code>
        </a>
      </td>
      <td>
        It's similar to
        <a href="https://lilibraries.github.io/hooks/useTargetEffect">
          <code>useTargetEffect</code>
        </a>
        , except it uses <a href="https://lilibraries.github.io/hooks/useIsomorphicLayoutEffect">
          <code>useIsomorphicLayoutEffect</code>
        </a> internally.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useIsomorphicLayoutEffect">
          <code>useIsomorphicLayoutEffect</code>
        </a>
      </td>
      <td>
        In the DOM environment, this hook is the same as React.useLayoutEffect.
        In the SSR environment, it is the same as React.useEffect.
      </td>
    </tr>
    <tr>
      <td rowspan="8">States</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/useCache">
          <code>useCache</code>
        </a>
      </td>
      <td>Cache data for a certain period of time.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useToggle">
          <code>useToggle</code>
        </a>
      </td>
      <td>Use boolean value.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useSetState">
          <code>useSetState</code>
        </a>
      </td>
      <td>
        This hook is like <code>this.setState</code> method of class component.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useSafeState">
          <code>useSafeState</code>
        </a>
      </td>
      <td>
        Eliminate errors thrown by setting state when the component is
        unmounted.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useDelayedValue">
          <code>useDelayedValue</code>
        </a>
      </td>
      <td>Delay update a value.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useMemoizedValue">
          <code>useMemoizedValue</code>
        </a>
      </td>
      <td>
        Return the previous value when the value has not changed. Use deep
        comparison by default.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useThrottledValue">
          <code>useThrottledValue</code>
        </a>
      </td>
      <td>Throttle a value.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useDebouncedValue">
          <code>useDebouncedValue</code>
        </a>
      </td>
      <td>Debounce a value.</td>
    </tr>
    <tr>
      <td rowspan="9">Callbacks</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/useRaf">
          <code>useRaf</code>
        </a>
      </td>
      <td>Invoke the callback before the browser repainting.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useIdle">
          <code>useIdle</code>
        </a>
      </td>
      <td>Invoke the callback when the browser is idle.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useTimeout">
          <code>useTimeout</code>
        </a>
      </td>
      <td>Delay running callback.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useInterval">
          <code>useInterval</code>
        </a>
      </td>
      <td>Loop run callback.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useAnimation">
          <code>useAnimation</code>
        </a>
      </td>
      <td>Use this hook to perform JavaScript animation.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/usePersist">
          <code>usePersist</code>
        </a>
      </td>
      <td>Returns a function whose identifier never changes.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useRerender">
          <code>useRerender</code>
        </a>
      </td>
      <td>Force rerender the component.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useThrottle">
          <code>useThrottle</code>
        </a>
      </td>
      <td>Use throttled callback.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useDebounce">
          <code>useDebounce</code>
        </a>
      </td>
      <td>Use debounced callback.</td>
    </tr>
    <tr>
      <td rowspan="5">Refs</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLatestRef">
          <code>useLatestRef</code>
        </a>
      </td>
      <td>
        Return a ref object whose <code>.current</code> property is assigned to
        latest updated value.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/usePreviousRef">
          <code>usePreviousRef</code>
        </a>
      </td>
      <td>
        Return a ref object whose <code>.current</code> property is assigned to
        previous updated value.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useComposedRef">
          <code>useComposedRef</code>
        </a>
      </td>
      <td>This hook compose multiple refs into one.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useMountedRef">
          <code>useMountedRef</code>
        </a>
      </td>
      <td>
        It returns a ref object that used to determine whether the component is
        mounted.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useUnmountedRef">
          <code>useUnmountedRef</code>
        </a>
      </td>
      <td>
        It returns a ref object that used to determine whether the component is
        unmounted.
      </td>
    </tr>
    <tr>
      <td rowspan="17">Browser</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/useTitle">
          <code>useTitle</code>
        </a>
      </td>
      <td>Set document title.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useFavicon">
          <code>useFavicon</code>
        </a>
      </td>
      <td>Set document favicon.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useOnline">
          <code>useOnline</code>
        </a>
      </td>
      <td>Detect whether the network is online.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useDarkMode">
          <code>useDarkMode</code>
        </a>
      </td>
      <td>Detect whether the preferred color mode of the system is dark.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/usePageVisible">
          <code>usePageVisible</code>
        </a>
      </td>
      <td>Detect whether the page is visible.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useWindowFocus">
          <code>useWindowFocus</code>
        </a>
      </td>
      <td>Detect whether the window is focus.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useMatchMedia">
          <code>useMatchMedia</code>
        </a>
      </td>
      <td>Determine if the document matches the media query string.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useWindowSize">
          <code>useWindowSize</code>
        </a>
      </td>
      <td>Get window size.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useElementSize">
          <code>useElementSize</code>
        </a>
      </td>
      <td>Get DOM element size.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useIntersecting">
          <code>useIntersecting</code>
        </a>
      </td>
      <td>Determine whether two elements intersect.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useClickOutside">
          <code>useClickOutside</code>
        </a>
      </td>
      <td>Trigger a callback when clicking outside the target area.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useEventListener">
          <code>useEventListener</code>
        </a>
      </td>
      <td>Set up the event listener to the target.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useResizeObserver">
          <code>useResizeObserver</code>
        </a>
      </td>
      <td>Observe a element size changing.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useIntersectionObserver">
          <code>useIntersectionObserver</code>
        </a>
      </td>
      <td>Observe whether two elements intersect.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useCookie">
          <code>useCookie</code>
        </a>
      </td>
      <td>Get, set and/or remove cookies.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLocalStorage">
          <code>useLocalStorage</code>
        </a>
      </td>
      <td>
        Get, set and/or remove <code>localStorage</code>.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useSessionStorage">
          <code>useSessionStorage</code>
        </a>
      </td>
      <td>
        Get, set and/or remove <code>sessionStorage</code>.
      </td>
    </tr>
    <tr>
      <td rowspan="3">Requests</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLoad">
          <code>useLoad</code>
        </a>
      </td>
      <td>Load async data.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useReload">
          <code>useReload</code>
        </a>
      </td>
      <td>Reload requests</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useSubmit">
          <code>useSubmit</code>
        </a>
      </td>
      <td>Submit network requests</td>
    </tr>
    <tr>
      <td rowspan="2">Configs</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/LoadConfig">
          <code>LoadConfig</code>
        </a>
      </td>
      <td>Provide default options for request hooks.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/CacheConfig">
          <code>CacheConfig</code>
        </a>
      </td>
      <td>
        Config for
        <a href="https://lilibraries.github.io/hooks/useCache">
          <code>useCache</code>
        </a>
      </td>
    </tr>
  </tbody>
</table>

## License

Code licensed MIT, docs CC BY 4.0.

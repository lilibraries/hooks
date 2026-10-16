# @lilib/hooks

[![npm version](https://img.shields.io/npm/v/@lilib/hooks?style=flat-square)](https://www.npmjs.com/package/@lilib/hooks)
[![npm downloads](https://img.shields.io/npm/dm/@lilib/hooks?style=flat-square)](https://www.npmjs.com/package/@lilib/hooks)
[![license](https://img.shields.io/npm/l/@lilib/hooks?style=flat-square)](https://github.com/lilibraries/hooks/blob/master/LICENSE)

React hook library.

- [Documentation](https://lilibraries.github.io/hooks/)
- [Changelog](https://github.com/lilibraries/hooks/blob/master/CHANGELOG.md)

## Features

- Supports React 16.8+, 17+, 18+ and 19+.
- Supports SSR.
- Supports React StrictMode.
- Supports loading async data.
- Provides 51 hooks.
- Written in TypeScript.

## Install

```shell
npm install --save @lilib/hooks
# Or
yarn add @lilib/hooks
# Or
pnpm add @lilib/hooks
```

## Usage

```tsx
import React from "react";
import { useLoad } from "@lilib/hooks";

function Example() {
  const { data, error, loading } = useLoad(() => {
    return fetch("/users/0").then((response) => response.json());
  });
  ...
}
```

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
      <td rowspan="3">Async</td>
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
      <td>Reload async data.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useSubmit">
          <code>useSubmit</code>
        </a>
      </td>
      <td>Submit network requests.</td>
    </tr>
    <tr>
      <td rowspan="10">Effects</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/useMount">
          <code>useMount</code>
        </a>
      </td>
      <td>Run an effect after the component is mounted.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useUpdate">
          <code>useUpdate</code>
        </a>
      </td>
      <td>
        Run an effect after the component updates or the deps change (the
        initial mount is skipped).
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useUnmount">
          <code>useUnmount</code>
        </a>
      </td>
      <td>Run an effect when the component unmounts.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useRefEffect">
          <code>useRefEffect</code>
        </a>
      </td>
      <td>
        Like <code>React.useEffect</code>, but ReactRefs in the deps are
        dereferenced to <code>ref.current</code> before comparison.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useRefUpdate">
          <code>useRefUpdate</code>
        </a>
      </td>
      <td>
        Like <code>useUpdate</code>, but ReactRefs in the deps are dereferenced
        to <code>ref.current</code> before comparison.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLayoutMount">
          <code>useLayoutMount</code>
        </a>
      </td>
      <td>
        Like <code>useMount</code>, but runs synchronously before the browser
        paints.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLayoutUpdate">
          <code>useLayoutUpdate</code>
        </a>
      </td>
      <td>
        Like <code>useUpdate</code>, but runs synchronously before the browser
        paints.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLayoutRefEffect">
          <code>useLayoutRefEffect</code>
        </a>
      </td>
      <td>
        Like <code>useRefEffect</code>, but runs synchronously before the
        browser paints.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLayoutRefUpdate">
          <code>useLayoutRefUpdate</code>
        </a>
      </td>
      <td>
        Like <code>useRefUpdate</code>, but runs synchronously before the
        browser paints.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useIsomorphicLayoutEffect">
          <code>useIsomorphicLayoutEffect</code>
        </a>
      </td>
      <td>
        Same as <code>React.useLayoutEffect</code> in the DOM environment and{" "}
        <code>React.useEffect</code> in the SSR environment.
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
      <td>Manage a boolean value.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useSetState">
          <code>useSetState</code>
        </a>
      </td>
      <td>
        Like the <code>this.setState</code> method of class components.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useSafeState">
          <code>useSafeState</code>
        </a>
      </td>
      <td>
        Same as <code>React.useState</code>, but setting state after unmount has
        no effect and never errors.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useDelayedValue">
          <code>useDelayedValue</code>
        </a>
      </td>
      <td>Delay updates to a value.</td>
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
      <td>Invoke the callback before the browser repaints.</td>
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
        <a href="https://lilibraries.github.io/hooks/useAnimate">
          <code>useAnimate</code>
        </a>
      </td>
      <td>Run JavaScript animations.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useTimeout">
          <code>useTimeout</code>
        </a>
      </td>
      <td>Delay running a callback.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useInterval">
          <code>useInterval</code>
        </a>
      </td>
      <td>Run a callback repeatedly at a fixed interval.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/usePersist">
          <code>usePersist</code>
        </a>
      </td>
      <td>Return a function whose identity never changes.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useRerender">
          <code>useRerender</code>
        </a>
      </td>
      <td>Force re-render the component.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useThrottle">
          <code>useThrottle</code>
        </a>
      </td>
      <td>Use a throttled callback.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useDebounce">
          <code>useDebounce</code>
        </a>
      </td>
      <td>Use a debounced callback.</td>
    </tr>
    <tr>
      <td rowspan="5">Refs</td>
      <td>
        <a href="https://lilibraries.github.io/hooks/useLatestRef">
          <code>useLatestRef</code>
        </a>
      </td>
      <td>
        Return a ref object whose <code>.current</code> property always points
        to the latest value.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/usePreviousRef">
          <code>usePreviousRef</code>
        </a>
      </td>
      <td>
        Return a ref object whose <code>.current</code> property points to the
        value from the previous update.
      </td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useComposedRef">
          <code>useComposedRef</code>
        </a>
      </td>
      <td>Compose multiple refs into one.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useMountedRef">
          <code>useMountedRef</code>
        </a>
      </td>
      <td>
        Return a ref object that is used to determine whether the component is
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
        Return a ref object that is used to determine whether the component is
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
      <td>Set the document title.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useFavicon">
          <code>useFavicon</code>
        </a>
      </td>
      <td>Set the document favicon.</td>
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
      <td>Detect whether the preferred color scheme of the system is dark.</td>
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
      <td>Detect whether the window has focus.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useMatchMedia">
          <code>useMatchMedia</code>
        </a>
      </td>
      <td>Determine whether the document matches the media query string.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useWindowSize">
          <code>useWindowSize</code>
        </a>
      </td>
      <td>Get the window size.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useElementSize">
          <code>useElementSize</code>
        </a>
      </td>
      <td>Get the size of a DOM element.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useIntersecting">
          <code>useIntersecting</code>
        </a>
      </td>
      <td>Determine whether an element intersects with another one.</td>
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
      <td>Set up an event listener on the target.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useResizeObserver">
          <code>useResizeObserver</code>
        </a>
      </td>
      <td>Observe an element's size changes.</td>
    </tr>
    <tr>
      <td>
        <a href="https://lilibraries.github.io/hooks/useIntersectionObserver">
          <code>useIntersectionObserver</code>
        </a>
      </td>
      <td>
        Observe when an element's intersection with another element or the
        viewport changes.
      </td>
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
  </tbody>
</table>

## Changelog

https://github.com/lilibraries/hooks/blob/master/CHANGELOG.md

## License

MIT.

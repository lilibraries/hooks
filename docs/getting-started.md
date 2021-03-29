---
title: Getting Started
slug: /
---

@lilib/hooks is a React hooks library.

## Install

```shell
npm install --save @lilib/hooks
# Or
yarn add @lilib/hooks
```

## Example

```tsx
import React from "react";
import { useMount } from "@lilib/hooks";

function Example() {
  useMount(() => {
    console.log("Component is mounted");
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
      <td rowspan="5">Lifecycles</td>
      <td><a href="./useMount">useMount</a></td>
      <td>Run effect after the component is mounted</td>
    </tr>
    <tr>
      <td><a href="./useUpdate">useUpdate</a></td>
      <td>Run effect on the component or the deps update</td>
    </tr>
    <tr>
      <td><a href="./useUnmount">useUnmount</a></td>
      <td>Run effect on the component unmount</td>
    </tr>
    <tr>
      <td><a href="./useUpdateLayoutEffect">useUpdateLayoutEffect</a></td>
      <td>It's similar to useUpdate</td>
    </tr>
    <tr>
      <td><a href="./useIsomorphicLayoutEffect">useIsomorphicLayoutEffect</a></td>
      <td>Isomorphic layout effect</td>
    </tr>
    <tr>
      <td rowspan="3">States</td>
      <td><a href="./useToggle">useToggle</a></td>
      <td>Use boolean value</td>
    </tr>
    <tr>
      <td><a href="./useDebounced">useDebounced</a></td>
      <td>Debounce a value</td>
    </tr>
    <tr>
      <td><a href="./useThrottled">useThrottled</a></td>
      <td>Throttle a value</td>
    </tr>
    <tr>
      <td rowspan="9">Callbacks</td>
      <td><a href="./usePersist">usePersist</a></td>
      <td>Returns the same function no matter whether the callback param changes</td>
    </tr>
    <tr>
      <td><a href="./useDebounce">useDebounce</a></td>
      <td>Use debounced callback</td>
    </tr>
    <tr>
      <td><a href="./useThrottle">useThrottle</a></td>
      <td>Use throttled callback</td>
    </tr>
    <tr>
      <td><a href="./useTimeout">useTimeout</a></td>
      <td>Delay running callback</td>
    </tr>
    <tr>
      <td><a href="./useInterval">useInterval</a></td>
      <td>Loop run callback</td>
    </tr>
    <tr>
      <td><a href="./useRaf">useRaf</a></td>
      <td>Use requestAnimationFrame to invoke the callback before the browser repainting</td>
    </tr>
    <tr>
      <td><a href="./useIdle">useIdle</a></td>
      <td>Invoke the callback when the browser is idle</td>
    </tr>
    <tr>
      <td><a href="./useNextFrame">useNextFrame</a></td>
      <td>Ensure the callback is invoked after the current paiting</td>
    </tr>
    <tr>
      <td><a href="./useAnimation">useAnimation</a></td>
      <td>Use this hook to perform JavaScript animation</td>
    </tr>
    <tr>
      <td rowspan="3">Refs</td>
      <td><a href="./useMounted">useMounted</a></td>
      <td>Returns a ref object to track if the component is mounted</td>
    </tr>
    <tr>
      <td><a href="./useLastest">useLastest</a></td>
      <td>Returns a ref object whose <code>.current</code> property is assigned to lastest updated value</td>
    </tr>
    <tr>
      <td><a href="./usePrevious">usePrevious</a></td>
      <td>Returns a ref object whose <code>.current</code> property is assigned to previous updated value</td>
    </tr>
    <tr>
      <td rowspan="10">Refs</td>
      <td><a href="./useTitle">useTitle</a></td>
      <td>Set document title</td>
    </tr>
    <tr>
      <td><a href="./useFavicon">useFavicon</a></td>
      <td>Set document favicon</td>
    </tr>
    <tr>
      <td><a href="./useOnline">useOnline</a></td>
      <td>Detect whether the network is online</td>
    </tr>
    <tr>
      <td><a href="./useDarkMode">useDarkMode</a></td>
      <td>Detect whether the system prefers color schema is dark</td>
    </tr>
    <tr>
      <td><a href="./usePageVisible">usePageVisible</a></td>
      <td>Detect whether the page is visible</td>
    </tr>
    <tr>
      <td><a href="./useWindowSize">useWindowSize</a></td>
      <td>Returns window width and height</td>
    </tr>
    <tr>
      <td><a href="./useEventListener">useEventListener</a></td>
      <td>Sets up the event listener to the target</td>
    </tr>
    <tr>
      <td><a href="./useCookie">useCookie</a></td>
      <td>Get or set cookie</td>
    </tr>
    <tr>
      <td><a href="./useLocalStorage">useLocalStorage</a></td>
      <td>Get or set localStorage</td>
    </tr>
    <tr>
      <td><a href="./useSessionStorage">useSessionStorage</a></td>
      <td>Get or set sessionStorage</td>
    </tr>
    <tr>
      <td rowspan="2">Utils</td>
      <td><a href="./useTitle">useCreate</a></td>
      <td>It's similar to React.useMemo</td>
    </tr>
    <tr>
      <td><a href="./useRerender">useRerender</a></td>
      <td>Returns a function that you can use to rerender the component</td>
    </tr>
  </tbody>
</table>

## License

Code licensed MIT, docs CC BY 3.0.

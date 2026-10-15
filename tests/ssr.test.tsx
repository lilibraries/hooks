/**
 * @jest-environment node
 */

import { createElement, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";

import {
  useAnimate,
  useClickOutside,
  useComposedRef,
  useCookie,
  useDarkMode,
  useDebounce,
  useDebouncedValue,
  useDelayedValue,
  useElementSize,
  useEventListener,
  useFavicon,
  useIdle,
  useIntersecting,
  useIntersectionObserver,
  useInterval,
  useIsomorphicLayoutEffect,
  useLatestRef,
  useLayoutMount,
  useLayoutRefEffect,
  useLayoutRefUpdate,
  useLayoutUpdate,
  useLoad,
  useLocalStorage,
  useMatchMedia,
  useMemoizedValue,
  useMount,
  useMountedRef,
  useOnline,
  usePageVisible,
  usePersist,
  usePreviousRef,
  useRaf,
  useRefEffect,
  useRefUpdate,
  useReload,
  useRerender,
  useResizeObserver,
  useSafeState,
  useSessionStorage,
  useSetState,
  useSubmit,
  useThrottle,
  useThrottledValue,
  useTimeout,
  useTitle,
  useToggle,
  useUnmount,
  useUnmountedRef,
  useUpdate,
  useWindowFocus,
  useWindowSize,
} from "../src/index";

/**
 * SSR regression tests: every hook must render on the server (pure Node, no
 * DOM) without throwing or emitting React warnings.
 */

function AllHooks() {
  const elementRef = useRef<Element | null>(null);
  const nodeRef = useRef<Node | null>(null);
  const eventTargetRef = useRef<EventTarget | null>(null);

  // Effects
  useMount(() => {});
  useUpdate(() => {});
  useUnmount(() => {});
  useRefEffect(() => {});
  useRefUpdate(() => {});
  useLayoutMount(() => {});
  useLayoutUpdate(() => {});
  useLayoutRefEffect(() => {});
  useLayoutRefUpdate(() => {});
  useIsomorphicLayoutEffect(() => {});

  // States
  useToggle();
  useSetState({ count: 0 });
  useSafeState(0);
  useDelayedValue("x", 100);
  useMemoizedValue({});
  useThrottledValue("x", 100);
  useDebouncedValue("x", 100);

  // Callbacks
  useRaf(() => {});
  useIdle(() => {});
  useAnimate(() => {}, 100);
  useTimeout(() => {});
  useInterval(() => {});
  usePersist(() => {});
  useRerender();
  useThrottle(() => {}, 100);
  useDebounce(() => {}, 100);

  // Refs
  useLatestRef(0);
  usePreviousRef(0);
  useComposedRef();
  useMountedRef();
  useUnmountedRef();

  // Browser
  useTitle("SSR Title");
  useFavicon("https://example.com/favicon.ico");
  useOnline();
  useDarkMode();
  usePageVisible();
  useWindowFocus();
  useMatchMedia("(prefers-color-scheme: dark)");
  useWindowSize();
  useElementSize(elementRef);
  useIntersecting(elementRef);
  useClickOutside(nodeRef, () => {});
  useEventListener(eventTargetRef, "click", () => {});
  useResizeObserver(elementRef, () => {});
  useIntersectionObserver(elementRef, () => {});
  useCookie("ssr-cookie");
  useLocalStorage("ssr-local");
  useSessionStorage("ssr-session");

  // Async
  useLoad(async () => "data", []);
  useReload("ssr-key");
  useSubmit(async () => {});

  return createElement("div", null, "hooks");
}

function BrowserValueHooks() {
  const online = useOnline();
  const visible = usePageVisible();
  const focused = useWindowFocus();
  const { width, height } = useWindowSize();
  const darkMode = useDarkMode();
  const matches = useMatchMedia("(prefers-color-scheme: dark)");
  const [cookie] = useCookie("missing");
  const [local] = useLocalStorage("missing");
  const [session] = useSessionStorage("missing");

  return createElement(
    "div",
    null,
    JSON.stringify({
      online,
      visible,
      focused,
      width,
      height,
      darkMode,
      matches,
      cookie,
      local,
      session,
    }),
  );
}

describe("SSR", () => {
  // React < 18 renders the `data-reactroot` attribute on the root element
  const normalize = (html: string) => html.replace(' data-reactroot=""', "");

  it("falls back to useEffect outside the browser", () => {
    expect(useIsomorphicLayoutEffect).toBe(useEffect);
  });

  it("renders every hook on the server without errors or warnings", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      const html = renderToString(createElement(AllHooks));
      expect(normalize(html)).toBe("<div>hooks</div>");
    } finally {
      errorSpy.mockRestore();
    }

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("returns safe fallback values outside the browser", () => {
    const html = normalize(renderToString(createElement(BrowserValueHooks)));
    // renderToString escapes double quotes in text as &quot;, decode before parsing
    const values = JSON.parse(html.slice(5, -6).replace(/&quot;/g, '"'));

    expect(values).toEqual({
      online: true,
      visible: true,
      focused: false,
      darkMode: false,
      matches: false,
    });
  });
});

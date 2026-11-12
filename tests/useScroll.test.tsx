import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useScroll from "../src/useScroll";

import { MockResizeObserver } from "./helpers/mocks";

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

interface ScrollMetrics {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  clientWidth?: number;
  clientHeight?: number;
}

const SCROLL_PROPERTIES = [
  "scrollLeft",
  "scrollTop",
  "scrollWidth",
  "scrollHeight",
  "clientWidth",
  "clientHeight",
];

function setScrollMetrics(element: Element, metrics: ScrollMetrics) {
  const descriptors: PropertyDescriptorMap = {};

  if (metrics.left !== undefined) {
    descriptors.scrollLeft = { configurable: true, writable: true, value: metrics.left };
  }
  if (metrics.top !== undefined) {
    descriptors.scrollTop = { configurable: true, writable: true, value: metrics.top };
  }
  if (metrics.width !== undefined) {
    descriptors.scrollWidth = { configurable: true, value: metrics.width };
  }
  if (metrics.height !== undefined) {
    descriptors.scrollHeight = { configurable: true, value: metrics.height };
  }
  if (metrics.clientWidth !== undefined) {
    descriptors.clientWidth = { configurable: true, value: metrics.clientWidth };
  }
  if (metrics.clientHeight !== undefined) {
    descriptors.clientHeight = { configurable: true, value: metrics.clientHeight };
  }

  Object.defineProperties(element, descriptors);
}

function resetScrollMetrics(element: Element) {
  for (const property of SCROLL_PROPERTIES) {
    Reflect.deleteProperty(element, property);
  }
}

function getPageScroller() {
  return (document.scrollingElement || document.documentElement) as HTMLElement;
}

function setPageMetrics(metrics: ScrollMetrics) {
  setScrollMetrics(getPageScroller(), metrics);
}

function resetPage() {
  const scroller = getPageScroller();
  resetScrollMetrics(scroller);
  scroller.style.direction = "";
  document.body.style.direction = "";
}

function flushFrame() {
  act(() => {
    jest.advanceTimersByTime(16);
  });
}

function scroll(element: Element | Window) {
  element.dispatchEvent(new Event("scroll"));
  flushFrame();
}

function listenerCount(spy: jest.SpyInstance, eventName: string) {
  return spy.mock.calls.filter(([type]) => type === eventName).length;
}

function activeScrollListeners(addSpy: jest.SpyInstance, removeSpy: jest.SpyInstance) {
  return listenerCount(addSpy, "scroll") - listenerCount(removeSpy, "scroll");
}

function findActiveObserver(element: Element) {
  return MockResizeObserver.instances.find(
    (instance) => !instance.disconnected && instance.observed.includes(element),
  );
}

describe("useScroll", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    resetPage();
    jest.restoreAllMocks();
  });

  it("reads the page state initially and updates both axes on scroll", () => {
    setPageMetrics({
      left: 10,
      top: 120,
      width: 1000,
      height: 1000,
      clientWidth: 400,
      clientHeight: 400,
    });

    const { result } = renderHook(() => useScroll());

    expect(result.current.x).toBe(10);
    expect(result.current.y).toBe(120);
    expect(result.current.progressX).toBeCloseTo(10 / 600);
    expect(result.current.progressY).toBeCloseTo(120 / 600);
    expect(result.current.directionX).toBeUndefined();
    expect(result.current.directionY).toBeUndefined();

    setPageMetrics({ left: 60, top: 300 });
    scroll(window);

    expect(result.current.x).toBe(60);
    expect(result.current.y).toBe(300);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("down");
    expect(result.current.progressX).toBeCloseTo(0.1);
    expect(result.current.progressY).toBeCloseTo(0.5);

    setPageMetrics({ left: 20, top: 100 });
    scroll(window);

    expect(result.current.directionX).toBe("left");
    expect(result.current.directionY).toBe("up");
  });

  it("tracks an element target", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, {
      left: 50,
      top: 100,
      width: 800,
      height: 900,
      clientWidth: 300,
      clientHeight: 300,
    });

    const { result } = renderHook(() => useScroll({ target: element }));

    expect(result.current.x).toBe(50);
    expect(result.current.y).toBe(100);
    expect(result.current.progressX).toBeCloseTo(0.1);
    expect(result.current.progressY).toBeCloseTo(1 / 6);

    element.scrollLeft = 100;
    element.scrollTop = 200;
    scroll(element);

    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(200);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("down");
  });

  it("tracks a ref target", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, {
      left: 30,
      top: 40,
      width: 700,
      height: 800,
      clientWidth: 300,
      clientHeight: 400,
    });
    const ref = { current: element as Element | null };

    const { result } = renderHook(() => useScroll({ target: ref }));

    expect(result.current.x).toBe(30);
    expect(result.current.y).toBe(40);
    expect(result.current.progressX).toBeCloseTo(30 / 400);
    expect(result.current.progressY).toBeCloseTo(40 / 400);
  });

  it("rebinds to a new target and removes the old listener", () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    setScrollMetrics(first, {
      top: 100,
      height: 1000,
      clientHeight: 400,
    });
    setScrollMetrics(second, {
      top: 50,
      height: 1000,
      clientHeight: 400,
    });

    const firstAdd = jest.spyOn(first, "addEventListener");
    const firstRemove = jest.spyOn(first, "removeEventListener");
    const secondAdd = jest.spyOn(second, "addEventListener");
    const secondRemove = jest.spyOn(second, "removeEventListener");
    const ref = { current: first as Element | null };

    const { result, rerender } = renderHook(() => useScroll({ target: ref }));

    first.scrollTop = 200;
    scroll(first);
    expect(result.current.y).toBe(200);
    expect(result.current.directionY).toBe("down");

    ref.current = second;
    rerender();

    expect(result.current.y).toBe(50);
    expect(result.current.directionY).toBeUndefined();
    expect(activeScrollListeners(firstAdd, firstRemove)).toBe(0);
    expect(activeScrollListeners(secondAdd, secondRemove)).toBe(1);

    first.scrollTop = 300;
    scroll(first);
    expect(result.current.y).toBe(50);

    second.scrollTop = 150;
    scroll(second);
    expect(result.current.y).toBe(150);
    expect(result.current.directionY).toBe("down");
  });

  it("resets to the initial state when the target becomes null", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, {
      left: 100,
      top: 100,
      width: 1000,
      height: 1000,
      clientWidth: 400,
      clientHeight: 400,
    });

    const { result, rerender } = renderHook(
      ({ target }: { target: Element | null }) => useScroll({ target }),
      { initialProps: { target: element as Element | null } },
    );

    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(100);

    rerender({ target: null });

    expect(result.current).toEqual({
      x: 0,
      y: 0,
      directionX: undefined,
      directionY: undefined,
      progressX: 0,
      progressY: 0,
    });

    element.scrollTop = 300;
    scroll(element);
    expect(result.current.y).toBe(0);
  });

  it("normalizes an explicit page scrolling element to the window listener", () => {
    setPageMetrics({ top: 120, height: 1000, clientHeight: 400 });

    const { result } = renderHook(() => useScroll({ target: document.documentElement }));

    expect(result.current.y).toBe(120);

    setPageMetrics({ top: 240 });
    scroll(window);

    expect(result.current.y).toBe(240);
    expect(result.current.directionY).toBe("down");
  });

  it("tracks direction only for scroll changes", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, {
      left: 100,
      top: 100,
      width: 1000,
      height: 1000,
      clientWidth: 400,
      clientHeight: 400,
    });

    const { result } = renderHook(() => useScroll({ target: element }));

    expect(result.current.directionX).toBeUndefined();
    expect(result.current.directionY).toBeUndefined();

    element.scrollLeft = 200;
    element.scrollTop = 200;
    scroll(element);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("down");

    const state = result.current;
    scroll(element);
    expect(result.current).toBe(state);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("down");

    element.scrollLeft = 150;
    element.scrollTop = 150;
    scroll(element);
    expect(result.current.directionX).toBe("left");
    expect(result.current.directionY).toBe("up");

    element.scrollLeft = 250;
    scroll(element);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("up");
  });

  it("keeps direction undefined for a non-scrollable axis", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, {
      width: 400,
      height: 1000,
      clientWidth: 400,
      clientHeight: 400,
    });

    const { result } = renderHook(() => useScroll({ target: element }));

    element.scrollLeft = 100;
    element.scrollTop = 100;
    scroll(element);

    expect(result.current.x).toBe(0);
    expect(result.current.progressX).toBe(0);
    expect(result.current.directionX).toBeUndefined();
    expect(result.current.y).toBe(100);
    expect(result.current.progressY).toBeCloseTo(1 / 6);
    expect(result.current.directionY).toBe("down");

    setScrollMetrics(element, { width: 1000, clientWidth: 400, height: 400, clientHeight: 400 });
    element.scrollLeft = 100;
    element.scrollTop = 100;
    scroll(element);

    expect(result.current.x).toBe(100);
    expect(result.current.progressX).toBeCloseTo(1 / 6);
    expect(result.current.directionX).toBe("right");
    expect(result.current.y).toBe(0);
    expect(result.current.progressY).toBe(0);
    expect(result.current.directionY).toBeUndefined();
  });

  it("clamps both axes and refreshes progress after content changes", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, {
      left: 300,
      top: 300,
      width: 1000,
      height: 1000,
      clientWidth: 400,
      clientHeight: 400,
    });

    const { result } = renderHook(() => useScroll({ target: element }));

    expect(result.current.progressX).toBeCloseTo(0.5);
    expect(result.current.progressY).toBeCloseTo(0.5);

    element.scrollLeft = 9999;
    element.scrollTop = 9999;
    scroll(element);

    expect(result.current.x).toBe(600);
    expect(result.current.y).toBe(600);
    expect(result.current.progressX).toBe(1);
    expect(result.current.progressY).toBe(1);

    element.scrollLeft = -50;
    element.scrollTop = -50;
    scroll(element);

    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
    expect(result.current.progressX).toBe(0);
    expect(result.current.progressY).toBe(0);

    element.scrollLeft = 300;
    element.scrollTop = 300;
    setScrollMetrics(element, { width: 1600, height: 1600 });
    scroll(element);

    expect(result.current.progressX).toBeCloseTo(0.25);
    expect(result.current.progressY).toBeCloseTo(0.25);
  });

  it("handles RTL horizontal direction and progress", () => {
    const element = document.createElement("div");
    element.style.direction = "rtl";
    setScrollMetrics(element, {
      left: -300,
      width: 1000,
      height: 400,
      clientWidth: 400,
      clientHeight: 400,
    });

    const { result } = renderHook(() => useScroll({ target: element }));

    expect(result.current.x).toBe(-300);
    expect(result.current.progressX).toBeCloseTo(0.5);
    expect(result.current.directionX).toBeUndefined();

    element.scrollLeft = -600;
    scroll(element);
    expect(result.current.x).toBe(-600);
    expect(result.current.progressX).toBe(1);
    expect(result.current.directionX).toBe("left");

    element.scrollLeft = -100;
    scroll(element);
    expect(result.current.x).toBe(-100);
    expect(result.current.progressX).toBeCloseTo(1 / 6);
    expect(result.current.directionX).toBe("right");

    element.scrollLeft = 50;
    scroll(element);
    expect(result.current.x).toBe(0);
    expect(result.current.progressX).toBe(0);
  });

  it("refreshes RTL when the writing direction changes", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, {
      left: 0,
      width: 1000,
      clientWidth: 400,
    });

    // jsdom caches the computed style after the first read, so simulate the
    // live computed style a browser would return after a CSS direction change.
    let rtl = false;
    const originalGetComputedStyle = window.getComputedStyle;
    jest.spyOn(window, "getComputedStyle").mockImplementation((target) => {
      const style = originalGetComputedStyle.call(window, target);
      if (target === element) {
        return { ...style, direction: rtl ? "rtl" : "ltr" } as CSSStyleDeclaration;
      }
      return style;
    });

    const { result } = renderHook(() => useScroll({ target: element }));

    expect(result.current.progressX).toBe(0);

    rtl = true;
    element.style.direction = "rtl";
    element.scrollLeft = -300;
    scroll(element);

    expect(result.current.x).toBe(-300);
    expect(result.current.progressX).toBeCloseTo(0.5);
    expect(result.current.directionX).toBe("left");
  });

  it("handles RTL on the page", () => {
    const page = getPageScroller();
    page.style.direction = "rtl";
    setPageMetrics({ left: -300, width: 1000, height: 400, clientWidth: 400, clientHeight: 400 });

    const { result } = renderHook(() => useScroll());

    expect(result.current.x).toBe(-300);
    expect(result.current.progressX).toBeCloseTo(0.5);

    page.scrollLeft = -600;
    scroll(window);

    expect(result.current.x).toBe(-600);
    expect(result.current.progressX).toBe(1);
    expect(result.current.directionX).toBe("left");
  });

  it("refreshes page progress on resize without flipping direction", () => {
    setPageMetrics({
      left: 300,
      top: 300,
      width: 1000,
      height: 1000,
      clientWidth: 400,
      clientHeight: 400,
    });

    const { result } = renderHook(() => useScroll());

    setPageMetrics({ left: 600, top: 600 });
    scroll(window);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("down");

    setPageMetrics({ clientWidth: 800, clientHeight: 800 });
    window.dispatchEvent(new Event("resize"));
    flushFrame();

    expect(result.current.x).toBe(200);
    expect(result.current.y).toBe(200);
    expect(result.current.progressX).toBe(1);
    expect(result.current.progressY).toBe(1);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("down");

    setPageMetrics({ clientWidth: 1000, clientHeight: 1000 });
    window.dispatchEvent(new Event("resize"));
    flushFrame();

    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
    expect(result.current.progressX).toBe(0);
    expect(result.current.progressY).toBe(0);
    expect(result.current.directionX).toBeUndefined();
    expect(result.current.directionY).toBeUndefined();
  });

  it("refreshes element progress on resize without flipping direction", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, {
      left: 300,
      top: 300,
      width: 1000,
      height: 1000,
      clientWidth: 400,
      clientHeight: 400,
    });

    const { result } = renderHook(() => useScroll({ target: element }));

    element.scrollLeft = 600;
    element.scrollTop = 600;
    scroll(element);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("down");

    setScrollMetrics(element, { clientWidth: 800, clientHeight: 800 });
    const observer = findActiveObserver(element);
    expect(observer).toBeDefined();
    observer?.trigger(element);
    flushFrame();

    expect(result.current.x).toBe(200);
    expect(result.current.y).toBe(200);
    expect(result.current.progressX).toBe(1);
    expect(result.current.progressY).toBe(1);
    expect(result.current.directionX).toBe("right");
    expect(result.current.directionY).toBe("down");
  });

  it("refreshes after pageshow without flipping direction", () => {
    setPageMetrics({ top: 100, height: 1000, clientHeight: 400 });

    const { result } = renderHook(() => useScroll());

    setPageMetrics({ top: 600 });
    scroll(window);
    expect(result.current.directionY).toBe("down");

    setPageMetrics({ top: 300 });
    window.dispatchEvent(new Event("pageshow"));
    flushFrame();

    expect(result.current.y).toBe(300);
    expect(result.current.progressY).toBe(0.5);
    expect(result.current.directionY).toBe("down");
  });

  it("coalesces multiple events into one update per frame", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, { top: 0, height: 1000, clientHeight: 400 });
    const renders = jest.fn();

    const { result } = renderHook(() => {
      renders();
      return useScroll({ target: element });
    });

    const initialRenders = renders.mock.calls.length;

    element.scrollTop = 100;
    element.dispatchEvent(new Event("scroll"));
    element.scrollTop = 200;
    element.dispatchEvent(new Event("scroll"));
    flushFrame();

    expect(renders.mock.calls.length).toBe(initialRenders + 1);
    expect(result.current.y).toBe(200);
    expect(result.current.directionY).toBe("down");
  });

  it("keeps the state object when nothing changes", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, { top: 100, height: 1000, clientHeight: 400 });

    const { result } = renderHook(() => useScroll({ target: element }));
    const state = result.current;

    scroll(element);

    expect(result.current).toBe(state);
  });

  it("removes listeners and observers on unmount", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, { top: 100, height: 1000, clientHeight: 400 });

    const addSpy = jest.spyOn(element, "addEventListener");
    const removeSpy = jest.spyOn(element, "removeEventListener");
    const { result, unmount } = renderHook(() => useScroll({ target: element }));
    const observer = findActiveObserver(element);
    const state = result.current;

    unmount();

    expect(activeScrollListeners(addSpy, removeSpy)).toBe(0);
    expect(observer?.disconnected).toBe(true);

    element.scrollTop = 200;
    element.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new Event("pageshow"));
    flushFrame();

    expect(result.current).toBe(state);
  });

  it("works in StrictMode without leaking the scroll listener", () => {
    const element = document.createElement("div");
    setScrollMetrics(element, { top: 0, height: 1000, clientHeight: 400 });

    const addSpy = jest.spyOn(element, "addEventListener");
    const removeSpy = jest.spyOn(element, "removeEventListener");
    const { result, unmount } = renderHook(() => useScroll({ target: element }), strictOptions);

    expect(activeScrollListeners(addSpy, removeSpy)).toBe(1);

    element.scrollTop = 100;
    scroll(element);
    expect(result.current.y).toBe(100);
    expect(result.current.directionY).toBe("down");

    unmount();
    expect(activeScrollListeners(addSpy, removeSpy)).toBe(0);
  });
});

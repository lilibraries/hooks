import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useScrollSpy from "../src/useScrollSpy";

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

const RECT_SIZE = 100;

function createRect(top: number, left: number) {
  return {
    top,
    bottom: top + RECT_SIZE,
    left,
    right: left + RECT_SIZE,
    width: RECT_SIZE,
    height: RECT_SIZE,
    x: left,
    y: top,
  } as unknown as DOMRect;
}

function setRect(element: Element, top: number, left = 0) {
  const rect = createRect(top, left);
  jest.spyOn(element, "getBoundingClientRect").mockReturnValue(rect);
  jest.spyOn(element, "getClientRects").mockReturnValue([rect] as unknown as DOMRectList);
}

function hide(element: Element) {
  jest.spyOn(element, "getClientRects").mockReturnValue([] as unknown as DOMRectList);
}

// Elements are appended to the document so that the default `getElement` can find them.
const attached: HTMLElement[] = [];

function createSection(id: string, top: number) {
  const element = document.createElement("section");
  element.id = id;
  document.body.appendChild(element);
  attached.push(element);
  setRect(element, top);
  return element;
}

function createContainer(top: number, metrics: ScrollMetrics) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  attached.push(element);
  setRect(element, top);
  setScrollMetrics(element, metrics);
  return element;
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

function activeListeners(addSpy: jest.SpyInstance, removeSpy: jest.SpyInstance, eventName: string) {
  return listenerCount(addSpy, eventName) - listenerCount(removeSpy, eventName);
}

describe("useScrollSpy", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // A scrollable page: 2000px of content in a 600px viewport.
    setPageMetrics({ top: 0, height: 2000, clientHeight: 600 });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    resetScrollMetrics(getPageScroller());
    while (attached.length > 0) {
      attached.pop()?.remove();
    }
  });

  it("starts at the first key and follows the sections crossing the line", () => {
    const intro = createSection("intro", 100);
    const usage = createSection("usage", 400);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    expect(result.current[0]).toBe("intro");

    setRect(intro, -800);
    setRect(usage, -300);
    scroll(window);

    expect(result.current[0]).toBe("usage");

    setRect(usage, 40);
    scroll(window);

    expect(result.current[0]).toBe("intro");
  });

  it("reports the last key once the container is scrolled to the bottom", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    expect(result.current[0]).toBe("intro");

    setPageMetrics({ top: 1400 });
    scroll(window);

    expect(result.current[0]).toBe("usage");
  });

  it("keeps the first key when the container has no overflow", () => {
    setPageMetrics({ top: 0, height: 600, clientHeight: 600 });
    createSection("intro", 100);
    createSection("usage", 400);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    expect(result.current[0]).toBe("intro");
  });

  it("ignores a sub-pixel overflow", () => {
    setPageMetrics({ top: 0, height: 601, clientHeight: 600 });
    createSection("intro", 100);
    createSection("usage", 400);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    expect(result.current[0]).toBe("intro");
  });

  it("skips a hidden last section at the bottom", () => {
    createSection("intro", -100);
    hide(createSection("usage", 200));

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    setPageMetrics({ top: 1400 });
    scroll(window);

    expect(result.current[0]).toBe("intro");
  });

  it("skips sections that are missing or not rendered", () => {
    createSection("intro", -100);
    hide(createSection("hidden", -50));

    const { result } = renderHook(() => useScrollSpy(["intro", "hidden", "missing"]));

    expect(result.current[0]).toBe("intro");
  });

  it("resolves sections with the getElement option", () => {
    const intro = createSection("intro", -100);
    const getElement = jest.fn((key: string) => (key === "one" ? intro : null));

    const { result } = renderHook(() => useScrollSpy(["one", "two"], { getElement }));

    expect(getElement).toHaveBeenCalled();
    expect(result.current[0]).toBe("one");
  });

  it("moves the activation line down by the offset", () => {
    createSection("intro", -100);
    const usage = createSection("usage", 40);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"], { offset: 64 }));

    // The line sits at 64px, so `usage` is already active although it is below the top.
    expect(result.current[0]).toBe("usage");

    setRect(usage, 300);
    scroll(window);

    expect(result.current[0]).toBe("intro");
  });

  it("moves the activation line with a negative offset", () => {
    createSection("intro", -500);
    createSection("usage", -200);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"], { offset: -300 }));

    expect(result.current[0]).toBe("intro");
  });

  it("tracks an element container and measures from its own top edge", () => {
    const container = createContainer(200, { top: 0, height: 2000, clientHeight: 400 });
    createSection("intro", 180);
    const usage = createSection("usage", 260);

    const { result } = renderHook(() =>
      useScrollSpy(["intro", "usage"], { target: container, offset: 100 }),
    );

    // The line sits at 300px (200px container top + 100px offset), so both sections are past it.
    expect(result.current[0]).toBe("usage");

    setRect(usage, 340);
    scroll(container);

    expect(result.current[0]).toBe("intro");

    setScrollMetrics(container, { top: 1600 });
    scroll(container);

    expect(result.current[0]).toBe("usage");
  });

  it("re-measures on window resize while an element container is tracked", () => {
    const container = createContainer(0, { top: 0, height: 2000, clientHeight: 400 });
    createSection("intro", -100);
    const usage = createSection("usage", 200);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"], { target: container }));
    expect(result.current[0]).toBe("intro");

    setRect(usage, -50);
    window.dispatchEvent(new Event("resize"));
    flushFrame();

    expect(result.current[0]).toBe("usage");
  });

  it("tracks a horizontal container", () => {
    const container = createContainer(0, { width: 300, clientWidth: 100 });
    const first = createSection("first", 0);
    const second = createSection("second", 0);
    const third = createSection("third", 0);

    setRect(first, 0, 0);
    setRect(second, 0, 100);
    setRect(third, 0, 200);

    const { result } = renderHook(() =>
      useScrollSpy(["first", "second", "third"], { target: container, axis: "x" }),
    );

    expect(result.current[0]).toBe("first");

    setRect(first, 0, -100);
    setRect(second, 0, 0);
    setRect(third, 0, 100);
    setScrollMetrics(container, { left: 100 });
    scroll(container);

    expect(result.current[0]).toBe("second");

    // The end of the content activates the last item.
    setScrollMetrics(container, { left: 200 });
    scroll(container);

    expect(result.current[0]).toBe("third");
  });

  it("tracks a right-to-left horizontal container", () => {
    const container = createContainer(0, { width: 100, clientWidth: 100 });
    container.style.direction = "rtl";

    const first = createSection("first", 0);
    const second = createSection("second", 0);

    // Items flow right to left: the first item starts at the container's right edge.
    setRect(first, 0, 0);
    setRect(second, 0, -100);

    const { result } = renderHook(() =>
      useScrollSpy(["first", "second"], { target: container, axis: "x" }),
    );

    expect(result.current[0]).toBe("first");

    setRect(first, 0, 100);
    setRect(second, 0, 0);
    scroll(container);

    expect(result.current[0]).toBe("second");
  });

  it("does not treat a negative scroll offset as the end of a vertical container", () => {
    // A `column-reverse` container reports positions from `0` down to `-maxScroll`.
    const container = createContainer(0, { top: -1600, height: 2000, clientHeight: 400 });
    createSection("intro", -100);
    createSection("usage", 200);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"], { target: container }));

    expect(result.current[0]).toBe("intro");
  });

  it("tolerates a sub-pixel offset when a section is snapped to the line", () => {
    const container = createContainer(0, { width: 300, clientWidth: 100 });
    const first = createSection("first", 0);
    const second = createSection("second", 0);

    setRect(first, 0, -99.8);
    setRect(second, 0, 0.2);

    const { result } = renderHook(() =>
      useScrollSpy(["first", "second"], { target: container, axis: "x" }),
    );

    expect(result.current[0]).toBe("second");
  });

  it("follows a direction change at runtime", () => {
    const container = createContainer(0, { width: 100, clientWidth: 100 });
    const first = createSection("first", 0);
    const second = createSection("second", 0);

    setRect(first, 0, 0);
    setRect(second, 0, 100);

    const { result } = renderHook(() =>
      useScrollSpy(["first", "second"], { target: container, axis: "x" }),
    );

    expect(result.current[0]).toBe("first");

    // Switching to right to left moves the inline start edge to the right side of the container.
    container.style.direction = "rtl";
    setRect(second, 0, -100);
    scroll(container);

    expect(result.current[0]).toBe("first");
  });

  it("moves the activation line along the horizontal axis by the offset", () => {
    const container = createContainer(0, { width: 300, clientWidth: 100 });
    const first = createSection("first", 0);
    const second = createSection("second", 0);

    setRect(first, 0, -60);
    setRect(second, 0, 40);

    const { result, rerender } = renderHook(
      ({ offset }: { offset: number }) =>
        useScrollSpy(["first", "second"], { target: container, axis: "x", offset }),
      { initialProps: { offset: 0 } },
    );

    expect(result.current[0]).toBe("first");

    rerender({ offset: 64 });

    expect(result.current[0]).toBe("second");
  });

  it("tracks the page on the horizontal axis", () => {
    setPageMetrics({ width: 300, clientWidth: 100 });
    const first = createSection("first", 0);
    const second = createSection("second", 0);

    setRect(first, 0, 0);
    setRect(second, 0, 100);

    const { result } = renderHook(() => useScrollSpy(["first", "second"], { axis: "x" }));

    expect(result.current[0]).toBe("first");

    setRect(first, 0, -100);
    setRect(second, 0, 0);
    setPageMetrics({ left: 100 });
    scroll(window);

    expect(result.current[0]).toBe("second");
  });

  it("returns undefined when nothing is tracked", () => {
    const { result } = renderHook(() => useScrollSpy(["intro"], { target: null }));

    expect(result.current[0]).toBeUndefined();
  });

  it("returns undefined without keys", () => {
    const { result } = renderHook(() => useScrollSpy([]));

    expect(result.current[0]).toBeUndefined();
  });

  it("holds the selected key until the user scrolls", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    act(() => {
      result.current[1].select("usage");
    });
    expect(result.current[0]).toBe("usage");

    // Scrolling does not move the highlight away while the hold lasts.
    scroll(window);
    expect(result.current[0]).toBe("usage");

    // Wheel input hands the highlight back to the reading position.
    window.dispatchEvent(new Event("wheel"));
    flushFrame();

    expect(result.current[0]).toBe("intro");
  });

  it("releases the hold on touch, pointer and scrolling keys", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    act(() => {
      result.current[1].select("usage");
    });
    window.dispatchEvent(new Event("touchmove"));
    flushFrame();
    expect(result.current[0]).toBe("intro");

    act(() => {
      result.current[1].select("usage");
    });
    window.dispatchEvent(new MouseEvent("pointerdown"));
    flushFrame();
    expect(result.current[0]).toBe("intro");

    act(() => {
      result.current[1].select("usage");
    });
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    flushFrame();
    expect(result.current[0]).toBe("intro");

    // Keys that do not scroll keep the hold.
    act(() => {
      result.current[1].select("usage");
    });
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
    flushFrame();
    expect(result.current[0]).toBe("usage");
  });

  it("keeps the hold when a scrolling key is typed into a field", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const input = document.createElement("input");
    document.body.appendChild(input);
    attached.push(input);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    act(() => {
      result.current[1].select("usage");
    });
    input.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    flushFrame();
    expect(result.current[0]).toBe("usage");

    // The same key outside a field scrolls the container and hands tracking back.
    document.body.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    flushFrame();
    expect(result.current[0]).toBe("intro");
  });

  it("resumes tracking right away on release()", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const { result } = renderHook(() => useScrollSpy(["intro", "usage"]));

    act(() => {
      result.current[1].select("usage");
    });
    expect(result.current[0]).toBe("usage");

    act(() => {
      result.current[1].release();
    });
    flushFrame();

    expect(result.current[0]).toBe("intro");
  });

  it("drops the hold when the held key is removed", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const { result, rerender } = renderHook(({ keys }) => useScrollSpy(keys), {
      initialProps: { keys: ["intro", "usage"] },
    });

    act(() => {
      result.current[1].select("usage");
    });
    expect(result.current[0]).toBe("usage");

    rerender({ keys: ["intro"] });

    expect(result.current[0]).toBe("intro");
  });

  it("compares the keys by value instead of array identity", () => {
    const intro = createSection("intro", -100);

    const { rerender } = renderHook(({ keys }) => useScrollSpy(keys), {
      initialProps: { keys: ["intro", "usage"] },
    });

    const rectSpy = jest.spyOn(intro, "getBoundingClientRect");
    const calls = rectSpy.mock.calls.length;
    rerender({ keys: ["intro", "usage"] });

    expect(rectSpy.mock.calls.length).toBe(calls);
  });

  it("measures once per frame and only renders when the key changes", () => {
    const intro = createSection("intro", -100);
    const usage = createSection("usage", 200);
    const renders = jest.fn();

    const { result } = renderHook(() => {
      renders();
      return useScrollSpy(["intro", "usage"]);
    });
    const initialRenders = renders.mock.calls.length;

    setRect(intro, -900);
    window.dispatchEvent(new Event("scroll"));
    setRect(usage, -400);
    window.dispatchEvent(new Event("scroll"));
    flushFrame();

    expect(renders.mock.calls.length).toBe(initialRenders + 1);
    expect(result.current[0]).toBe("usage");

    window.dispatchEvent(new Event("scroll"));
    flushFrame();

    expect(renders.mock.calls.length).toBe(initialRenders + 1);
  });

  it("keeps the actions identity stable across renders", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const { result, rerender } = renderHook(({ keys }) => useScrollSpy(keys), {
      initialProps: { keys: ["intro", "usage"] },
    });
    const actions = result.current[1];

    rerender({ keys: ["intro", "usage", "faq"] });

    expect(result.current[1]).toBe(actions);
  });

  it("removes listeners on unmount and ignores later scrolls", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { result, unmount } = renderHook(() => useScrollSpy(["intro", "usage"]));
    const actions = result.current[1];

    unmount();

    for (const eventName of ["scroll", "resize", "wheel", "touchmove", "pointerdown", "keydown"]) {
      expect(activeListeners(addSpy, removeSpy, eventName)).toBe(0);
    }

    window.dispatchEvent(new Event("scroll"));
    flushFrame();

    expect(result.current[0]).toBe("intro");
    expect(result.current[1]).toBe(actions);
  });

  it("works in StrictMode without leaking the scroll listener", () => {
    createSection("intro", -100);
    createSection("usage", 200);

    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { result, unmount } = renderHook(() => useScrollSpy(["intro", "usage"]), strictOptions);

    expect(activeListeners(addSpy, removeSpy, "scroll")).toBe(1);
    expect(result.current[0]).toBe("intro");

    unmount();

    expect(activeListeners(addSpy, removeSpy, "scroll")).toBe(0);
  });
});

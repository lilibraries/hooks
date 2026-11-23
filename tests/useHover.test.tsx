import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { act, fireEvent } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useHover from "../src/useHover";

// A target can only receive pointer events while it is in the document.
function createTarget() {
  const element = document.createElement("div");
  document.body.appendChild(element);
  return element;
}

function enter(element: Element, relatedTarget: Element | null = null) {
  fireEvent(element, new MouseEvent("mouseenter", { relatedTarget }));
}

function leave(element: Element, relatedTarget: Element | null = null) {
  fireEvent(element, new MouseEvent("mouseleave", { relatedTarget }));
}

function advance(ms: number) {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
}

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

describe("useHover", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    document.body.innerHTML = "";
  });

  it("is false initially", () => {
    const element = createTarget();
    const { result } = renderHook(() => useHover(element));

    expect(result.current).toBe(false);
  });

  it("supports a ref-form target", () => {
    const element = createTarget();
    const ref = { current: element as Element | null };
    const { result } = renderHook(() => useHover(ref));

    enter(element);
    expect(result.current).toBe(true);

    leave(element);
    expect(result.current).toBe(false);
  });

  it("reports an enter and a leave immediately without delays", () => {
    const element = createTarget();
    const { result } = renderHook(() => useHover(element));

    enter(element);
    expect(result.current).toBe(true);

    leave(element);
    expect(result.current).toBe(false);
  });

  it("waits for the enter delay", () => {
    const element = createTarget();
    const { result } = renderHook(() => useHover(element, { enterDelay: 100 }));

    enter(element);
    expect(result.current).toBe(false);

    advance(99);
    expect(result.current).toBe(false);

    advance(1);
    expect(result.current).toBe(true);
  });

  it("cancels the enter delay when the pointer leaves first", () => {
    const element = createTarget();
    const { result } = renderHook(() => useHover(element, { enterDelay: 100 }));

    enter(element);
    leave(element);

    advance(200);
    expect(result.current).toBe(false);
  });

  it("waits for the leave delay", () => {
    const element = createTarget();
    const { result } = renderHook(() => useHover(element, { leaveDelay: 100 }));

    enter(element);
    expect(result.current).toBe(true);

    leave(element);
    expect(result.current).toBe(true);

    advance(100);
    expect(result.current).toBe(false);
  });

  it("cancels the leave delay when the pointer comes back", () => {
    const element = createTarget();
    const { result } = renderHook(() => useHover(element, { leaveDelay: 100 }));

    enter(element);
    leave(element);
    advance(50);
    enter(element);

    advance(200);
    expect(result.current).toBe(true);
  });

  it("stays hovered while the pointer moves between targets", () => {
    const first = createTarget();
    const second = createTarget();
    const { result } = renderHook(() => useHover([first, second]));

    enter(first);
    expect(result.current).toBe(true);

    // Leaving towards another target of the area is not a leave
    leave(first, second);
    enter(second);
    expect(result.current).toBe(true);

    leave(second);
    expect(result.current).toBe(false);
  });

  it("stays hovered while the pointer crosses the gap between targets within the leave delay", () => {
    const first = createTarget();
    const second = createTarget();
    const { result } = renderHook(() => useHover([first, second], { leaveDelay: 100 }));

    enter(first);
    expect(result.current).toBe(true);

    // Leaving into the gap starts the leave delay
    leave(first);
    expect(result.current).toBe(true);

    advance(99);
    expect(result.current).toBe(true);

    enter(second);
    advance(200);
    expect(result.current).toBe(true);
  });

  it("keeps the pending enter delay while the pointer moves between targets", () => {
    const first = createTarget();
    const second = createTarget();
    const { result } = renderHook(() =>
      useHover([first, second], { enterDelay: 100, leaveDelay: 100 }),
    );

    enter(first);
    advance(50);

    // Browsers dispatch the leave of the old target before the enter of the new one
    leave(first, second);
    enter(second);
    expect(result.current).toBe(false);

    advance(50);
    expect(result.current).toBe(true);

    // Moving back does not restart the (already elapsed) enter delay
    leave(second, first);
    enter(first);
    expect(result.current).toBe(true);
  });

  it("follows back-to-back events dispatched in the same task", () => {
    const element = createTarget();
    const { result } = renderHook(() => useHover(element));

    // Both updates are batched: the leave must not read the last committed value
    act(() => {
      element.dispatchEvent(new MouseEvent("mouseenter"));
      element.dispatchEvent(new MouseEvent("mouseleave"));
    });
    expect(result.current).toBe(false);

    act(() => {
      element.dispatchEvent(new MouseEvent("mouseenter"));
      element.dispatchEvent(new MouseEvent("mouseleave"));
      element.dispatchEvent(new MouseEvent("mouseenter"));
    });
    expect(result.current).toBe(true);
  });

  it("keeps the area hovered when a target is added", () => {
    const first = createTarget();
    const second = createTarget();
    const { result, rerender } = renderHook(
      ({ targets }: { targets: Element[] }) => useHover(targets, { leaveDelay: 100 }),
      { initialProps: { targets: [first] } },
    );

    enter(first);
    expect(result.current).toBe(true);

    // A popup appearing after the trigger joins the area
    rerender({ targets: [first, second] });

    advance(200);
    expect(result.current).toBe(true);
  });

  it("treats a target that becomes invalid as left", () => {
    const element = createTarget();
    const ref = { current: element as Element | null };
    const { result, rerender } = renderHook(() => useHover(ref));

    enter(element);
    expect(result.current).toBe(true);

    ref.current = null;
    rerender();

    expect(result.current).toBe(false);
  });

  it("treats a target taken out of the document as left", () => {
    const first = createTarget();
    const second = createTarget();
    const { result } = renderHook(() => useHover([first, second]));

    enter(first);
    expect(result.current).toBe(true);

    // Removing a node from the document dispatches no `mouseleave`
    first.remove();

    enter(second);
    leave(second);
    expect(result.current).toBe(false);
  });

  it("only leaves when the last target is left", () => {
    const first = createTarget();
    const second = createTarget();
    const { result } = renderHook(() => useHover([first, second], { leaveDelay: 50 }));

    enter(first);
    enter(second);
    leave(first);

    advance(100);
    expect(result.current).toBe(true);

    leave(second);
    advance(100);
    expect(result.current).toBe(false);
  });

  it("detaches the listeners when the target changes", () => {
    const first = createTarget();
    const second = createTarget();
    const firstRemoveSpy = jest.spyOn(first, "removeEventListener");
    const secondAddSpy = jest.spyOn(second, "addEventListener");

    try {
      const { result, rerender } = renderHook(
        ({ targets }: { targets: Element[] }) => useHover(targets),
        { initialProps: { targets: [first] } },
      );

      enter(first);
      expect(result.current).toBe(true);

      rerender({ targets: [second] });

      expect(firstRemoveSpy.mock.calls.map((call) => call[0])).toContain("mouseenter");
      expect(secondAddSpy.mock.calls.map((call) => call[0])).toContain("mouseenter");

      enter(second);
      expect(result.current).toBe(true);
    } finally {
      firstRemoveSpy.mockRestore();
      secondAddSpy.mockRestore();
    }
  });

  it("detaches the listeners on unmount", () => {
    const element = createTarget();
    const addSpy = jest.spyOn(element, "addEventListener");
    const removeSpy = jest.spyOn(element, "removeEventListener");
    const isHoverEvent = (call: [string, ...unknown[]]) =>
      call[0] === "mouseenter" || call[0] === "mouseleave";

    try {
      const { unmount } = renderHook(() => useHover(element));

      unmount();

      const added = addSpy.mock.calls.filter(isHoverEvent);
      expect(added.length).toBe(2);
      expect(removeSpy.mock.calls.filter(isHoverEvent)).toHaveLength(added.length);
    } finally {
      addSpy.mockRestore();
      removeSpy.mockRestore();
    }
  });

  it("stops updating after unmount", () => {
    const element = createTarget();
    const { result, unmount } = renderHook(() => useHover(element));

    enter(element);
    expect(result.current).toBe(true);

    unmount();

    expect(() => {
      leave(element);
      advance(100);
    }).not.toThrow();
    expect(result.current).toBe(true);
  });

  it("works under StrictMode without leaking listeners", () => {
    const first = createTarget();
    const second = createTarget();
    const addSpy = jest.spyOn(first, "addEventListener");
    const removeSpy = jest.spyOn(first, "removeEventListener");
    const isHoverEvent = (call: [string, ...unknown[]]) =>
      call[0] === "mouseenter" || call[0] === "mouseleave";

    try {
      const { result, unmount } = renderHook(
        () => useHover([first, second], { enterDelay: 100, leaveDelay: 100 }),
        strictOptions,
      );

      enter(first);
      advance(100);
      expect(result.current).toBe(true);

      leave(first);
      advance(100);
      expect(result.current).toBe(false);

      unmount();
      const added = addSpy.mock.calls.filter(isHoverEvent);
      expect(added.length).toBeGreaterThanOrEqual(2);
      expect(removeSpy.mock.calls.filter(isHoverEvent)).toHaveLength(added.length);
    } finally {
      addSpy.mockRestore();
      removeSpy.mockRestore();
    }
  });
});

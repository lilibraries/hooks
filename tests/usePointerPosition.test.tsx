import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { act, fireEvent } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import usePointerPosition from "../src/usePointerPosition";

interface PointerInit {
  clientX?: number;
  clientY?: number;
  pointerType?: string;
}

// jsdom does not implement `PointerEvent`: `MouseEvent` already carries the coordinates,
// so the remaining field the hook reads is defined on it.
function createPointerEvent(type: "pointermove" | "pointerdown", init: PointerInit = {}) {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    clientX: init.clientX ?? 0,
    clientY: init.clientY ?? 0,
  });

  Object.defineProperty(event, "pointerType", {
    configurable: true,
    value: init.pointerType ?? "mouse",
  });

  return event;
}

function move(init?: PointerInit) {
  fireEvent(window, createPointerEvent("pointermove", init));
}

function down(init?: PointerInit) {
  fireEvent(window, createPointerEvent("pointerdown", init));
}

function flushFrame() {
  act(() => {
    jest.advanceTimersByTime(16);
  });
}

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

describe("usePointerPosition", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns undefined before the first pointer event", () => {
    const { result } = renderHook(() => usePointerPosition());

    expect(result.current).toBeUndefined();
  });

  it("reports the position of a pointer move", () => {
    const { result } = renderHook(() => usePointerPosition());

    move({ clientX: 120, clientY: 80 });
    flushFrame();

    expect(result.current).toEqual({ x: 120, y: 80, pointerType: "mouse" });
  });

  it("tracks a move dispatched on a descendant element", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    try {
      const { result } = renderHook(() => usePointerPosition());

      fireEvent(element, createPointerEvent("pointermove", { clientX: 12, clientY: 34 }));
      flushFrame();

      expect(result.current).toEqual({ x: 12, y: 34, pointerType: "mouse" });
    } finally {
      element.remove();
    }
  });

  it("reports the pointer type, including an unknown one", () => {
    const { result } = renderHook(() => usePointerPosition());

    move({ pointerType: "pen" });
    flushFrame();
    expect(result.current).toEqual({ x: 0, y: 0, pointerType: "pen" });

    // An empty string means the browser could not detect the device type
    move({ pointerType: "" });
    flushFrame();
    expect(result.current).toEqual({ x: 0, y: 0, pointerType: "" });
  });

  it("captures the contact position of a tap", () => {
    const { result } = renderHook(() => usePointerPosition());

    down({ clientX: 40, clientY: 50, pointerType: "touch" });
    flushFrame();

    expect(result.current).toEqual({ x: 40, y: 50, pointerType: "touch" });
  });

  it("commits at most once per frame with the latest position", () => {
    const renders = jest.fn();

    const { result } = renderHook(() => {
      renders();
      return usePointerPosition();
    });

    move({ clientX: 1, clientY: 2 });
    move({ clientX: 3, clientY: 4 });
    flushFrame();

    expect(result.current).toEqual({ x: 3, y: 4, pointerType: "mouse" });
    expect(renders).toHaveBeenCalledTimes(2);
  });

  it("does not render when the position is unchanged", () => {
    const renders = jest.fn();

    const { result } = renderHook(() => {
      renders();
      return usePointerPosition();
    });

    move({ clientX: 10, clientY: 20 });
    flushFrame();
    expect(renders).toHaveBeenCalledTimes(2);

    // Browsers repeat the position on scrolling and on every click
    move({ clientX: 10, clientY: 20 });
    down({ clientX: 10, clientY: 20 });
    flushFrame();
    expect(renders).toHaveBeenCalledTimes(2);

    move({ clientX: 10, clientY: 20, pointerType: "pen" });
    flushFrame();
    expect(renders).toHaveBeenCalledTimes(3);
    expect(result.current?.pointerType).toBe("pen");
  });

  it("does not listen when disabled", () => {
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => usePointerPosition({ enabled }),
      { initialProps: { enabled: false } },
    );

    move({ clientX: 1, clientY: 2 });
    flushFrame();
    expect(result.current).toBeUndefined();

    rerender({ enabled: true });
    move({ clientX: 3, clientY: 4 });
    flushFrame();
    expect(result.current).toEqual({ x: 3, y: 4, pointerType: "mouse" });
  });

  it("detaches the listeners and keeps the last position when disabled", () => {
    const removeSpy = jest.spyOn(window, "removeEventListener");

    try {
      const { result, rerender } = renderHook(
        ({ enabled }: { enabled: boolean }) => usePointerPosition({ enabled }),
        { initialProps: { enabled: true } },
      );

      move({ clientX: 5, clientY: 6 });
      flushFrame();
      expect(result.current).toEqual({ x: 5, y: 6, pointerType: "mouse" });

      rerender({ enabled: false });
      expect(result.current).toEqual({ x: 5, y: 6, pointerType: "mouse" });

      move({ clientX: 7, clientY: 8 });
      flushFrame();
      expect(result.current).toEqual({ x: 5, y: 6, pointerType: "mouse" });

      // The listeners must be detached, not merely short-circuited inside the handler
      const detached = removeSpy.mock.calls.map((call) => call[0]);
      expect(detached).toContain("pointermove");
      expect(detached).toContain("pointerdown");
    } finally {
      removeSpy.mockRestore();
    }
  });

  it("does not reattach the listeners on unrelated renders", () => {
    const addSpy = jest.spyOn(window, "addEventListener");

    try {
      const attached = () => addSpy.mock.calls.filter((call) => call[0] === "pointermove").length;

      const { rerender } = renderHook(
        ({ value }: { value: number }) => usePointerPosition({ enabled: value >= 0 }),
        { initialProps: { value: 0 } },
      );

      const count = attached();

      rerender({ value: 1 });
      rerender({ value: 2 });

      expect(attached()).toBe(count);
    } finally {
      addSpy.mockRestore();
    }
  });

  it("stops tracking after unmount", () => {
    const removeSpy = jest.spyOn(window, "removeEventListener");

    try {
      const { unmount } = renderHook(() => usePointerPosition());
      unmount();

      expect(() => move({ clientX: 1, clientY: 2 })).not.toThrow();
      expect(removeSpy.mock.calls.map((call) => call[0])).toContain("pointermove");
    } finally {
      removeSpy.mockRestore();
    }
  });

  it("works in StrictMode", () => {
    const { result } = renderHook(() => usePointerPosition(), strictOptions);

    move({ clientX: 30, clientY: 40 });
    flushFrame();
    expect(result.current).toEqual({ x: 30, y: 40, pointerType: "mouse" });

    move({ clientX: 50, clientY: 60 });
    flushFrame();
    expect(result.current).toEqual({ x: 50, y: 60, pointerType: "mouse" });
  });
});

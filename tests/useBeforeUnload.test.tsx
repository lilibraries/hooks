import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import renderHook from "./helpers/renderHook";

import useBeforeUnload from "../src/useBeforeUnload";

function unload() {
  const event = new Event("beforeunload", { cancelable: true });
  window.dispatchEvent(event);
  return event;
}

function getHandler(addSpy: jest.SpyInstance) {
  const call = addSpy.mock.calls.find(([type]) => type === "beforeunload");
  return call?.[1] as (event: BeforeUnloadEvent) => void;
}

function isBeforeUnload(call: unknown[]) {
  return call[0] === "beforeunload";
}

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

describe("useBeforeUnload", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("prevents leaving the page by default", () => {
    renderHook(() => useBeforeUnload());

    expect(unload().defaultPrevented).toBe(true);
  });

  it("sets a truthy returnValue for legacy browsers", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    renderHook(() => useBeforeUnload());

    const handler = getHandler(addSpy);
    const event = { preventDefault: jest.fn(), returnValue: "" };
    handler(event as unknown as BeforeUnloadEvent);

    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.returnValue).toBe(true);
  });

  it("does nothing when disabled", () => {
    renderHook(() => useBeforeUnload({ enabled: false }));

    expect(unload().defaultPrevented).toBe(false);
  });

  it("follows the enabled option", () => {
    const { rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useBeforeUnload({ enabled }),
      { initialProps: { enabled: false } },
    );

    expect(unload().defaultPrevented).toBe(false);

    rerender({ enabled: true });
    expect(unload().defaultPrevented).toBe(true);

    rerender({ enabled: false });
    expect(unload().defaultPrevented).toBe(false);
  });

  it("removes the listener on unmount", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useBeforeUnload());

    expect(unload().defaultPrevented).toBe(true);

    unmount();

    expect(unload().defaultPrevented).toBe(false);
    expect(removeSpy.mock.calls.filter(isBeforeUnload)).toHaveLength(
      addSpy.mock.calls.filter(isBeforeUnload).length,
    );
  });

  it("does not leak listeners under StrictMode", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useBeforeUnload(), strictOptions);

    expect(unload().defaultPrevented).toBe(true);

    unmount();

    expect(unload().defaultPrevented).toBe(false);
    expect(removeSpy.mock.calls.filter(isBeforeUnload)).toHaveLength(
      addSpy.mock.calls.filter(isBeforeUnload).length,
    );
  });
});

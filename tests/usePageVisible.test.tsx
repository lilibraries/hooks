import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import usePageVisible from "../src/usePageVisible";

function setVisibilityState(value: "visible" | "hidden") {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value,
  });
}

describe("usePageVisible", () => {
  it("initial value is the page visibility state", () => {
    setVisibilityState("visible");
    const { result } = renderHook(() => usePageVisible());
    expect(result.current).toBe(true);
  });

  it("returns false after the page is hidden", () => {
    setVisibilityState("visible");
    const { result } = renderHook(() => usePageVisible());
    expect(result.current).toBe(true);

    act(() => {
      setVisibilityState("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(result.current).toBe(false);
  });

  it("returns true after the page becomes visible again", () => {
    setVisibilityState("hidden");
    const { result } = renderHook(() => usePageVisible());
    expect(result.current).toBe(false);

    act(() => {
      setVisibilityState("visible");
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(result.current).toBe(true);
  });

  it("re-detects visibility on the pageshow event (bfcache restore)", () => {
    setVisibilityState("visible");
    const { result } = renderHook(() => usePageVisible());

    act(() => {
      setVisibilityState("hidden");
      // Firing pageshow alone is enough to detect the state
      window.dispatchEvent(new PageTransitionEvent("pageshow"));
    });

    expect(result.current).toBe(false);
  });

  it("stops responding to events after unmount", () => {
    setVisibilityState("visible");
    const { result, unmount } = renderHook(() => usePageVisible());

    unmount();

    act(() => {
      setVisibilityState("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(result.current).toBe(true);
  });
});

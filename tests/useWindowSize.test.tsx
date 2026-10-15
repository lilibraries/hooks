import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useWindowSize from "../src/useWindowSize";

function setWindowSize(width: number, height: number) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: height,
  });
}

describe("useWindowSize", () => {
  it("returns the initial window size", () => {
    setWindowSize(1024, 768);
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it("updates the size after the resize event", () => {
    setWindowSize(1024, 768);
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      setWindowSize(800, 600);
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 800, height: 600 });
  });

  it("updates the size after the orientationchange event", () => {
    setWindowSize(1024, 768);
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      setWindowSize(390, 844);
      window.dispatchEvent(new Event("orientationchange"));
    });

    expect(result.current).toEqual({ width: 390, height: 844 });
  });

  it("the visualViewport resize event also updates the size", () => {
    setWindowSize(1024, 768);
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      setWindowSize(500, 500);
      const viewport = window.visualViewport as unknown as {
        dispatchEvent: (event: Event) => void;
      };
      viewport.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 500, height: 500 });
  });

  it("stops responding to events after unmount", () => {
    setWindowSize(1024, 768);
    const { result, unmount } = renderHook(() => useWindowSize());

    unmount();

    act(() => {
      setWindowSize(300, 300);
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 1024, height: 768 });
  });
});

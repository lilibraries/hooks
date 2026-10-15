import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useIntersecting from "../src/useIntersecting";

import { MockIntersectionObserver } from "./helpers/mocks";

describe("useIntersecting", () => {
  it("is false initially", () => {
    const element = document.createElement("div");
    const { result } = renderHook(() => useIntersecting(element));

    expect(result.current).toBe(false);
  });

  it("returns true after the target intersects", () => {
    const element = document.createElement("div");
    const { result } = renderHook(() => useIntersecting(element));

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true, element);
    });

    expect(result.current).toBe(true);
  });

  it("returns false after the target leaves the viewport", () => {
    const element = document.createElement("div");
    const { result } = renderHook(() => useIntersecting(element));

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true, element);
    });
    expect(result.current).toBe(true);

    act(() => {
      MockIntersectionObserver.instances[0].trigger(false, element);
    });
    expect(result.current).toBe(false);
  });

  it("resets to false when the target becomes invalid", () => {
    const element = document.createElement("div");
    const ref = { current: element as Element | null };
    const { result, rerender } = renderHook(() => useIntersecting(ref));

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true, element);
    });
    expect(result.current).toBe(true);

    ref.current = null;
    rerender();
    expect(result.current).toBe(false);
  });

  it("supports a ref-form target", () => {
    const element = document.createElement("div");
    const ref = { current: element };
    const { result } = renderHook(() => useIntersecting(ref));

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true, element);
    });

    expect(result.current).toBe(true);
  });

  it("stops updating after unmount", () => {
    const element = document.createElement("div");
    const { result, unmount } = renderHook(() => useIntersecting(element));

    unmount();

    act(() => {
      MockIntersectionObserver.instances[0].trigger(true, element);
    });

    expect(result.current).toBe(false);
  });
});

import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useElementSize from "../src/useElementSize";

import { MockResizeObserver, mockElementRect } from "./helpers/mocks";

describe("useElementSize", () => {
  it("returns the element's current size initially", () => {
    const element = document.createElement("div");
    mockElementRect(element, { width: 300, height: 150 });

    const { result } = renderHook(() => useElementSize(element));

    expect(result.current).toEqual({ width: 300, height: 150 });
  });

  it("updates when the element size changes", () => {
    const element = document.createElement("div");
    mockElementRect(element, { width: 300, height: 150 });

    const { result } = renderHook(() => useElementSize(element));
    expect(result.current).toEqual({ width: 300, height: 150 });

    act(() => {
      mockElementRect(element, { width: 400, height: 200 });
      MockResizeObserver.instances[0].trigger(element);
    });

    expect(result.current).toEqual({ width: 400, height: 200 });
  });

  it("returns undefined when the target does not exist", () => {
    const ref = { current: null };
    const { result } = renderHook(() => useElementSize(ref));

    expect(result.current).toEqual({ width: undefined, height: undefined });
  });

  it("supports a ref-form target", () => {
    const element = document.createElement("div");
    mockElementRect(element, { width: 320, height: 240 });
    const ref = { current: element };

    const { result } = renderHook(() => useElementSize(ref));

    expect(result.current).toEqual({ width: 320, height: 240 });
  });

  it("resets the size when the target becomes invalid", () => {
    const element = document.createElement("div");
    mockElementRect(element, { width: 300, height: 150 });
    const ref = { current: element as Element | null };

    const { result, rerender } = renderHook(() => useElementSize(ref));
    expect(result.current).toEqual({ width: 300, height: 150 });

    ref.current = null;
    rerender();

    expect(result.current).toEqual({ width: undefined, height: undefined });
  });

  it("stops updating after unmount", () => {
    const element = document.createElement("div");
    mockElementRect(element, { width: 300, height: 150 });

    const { result, unmount } = renderHook(() => useElementSize(element));
    unmount();

    act(() => {
      mockElementRect(element, { width: 999, height: 999 });
      MockResizeObserver.instances[0].trigger(element);
    });

    expect(result.current).toEqual({ width: 300, height: 150 });
  });
});

import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useRerender from "../src/useRerender";

describe("useRerender", () => {
  it("calling the returned function triggers a re-render", () => {
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useRerender();
    });

    expect(renderCount).toBe(1);

    act(() => result.current());
    expect(renderCount).toBe(2);

    act(() => result.current());
    expect(renderCount).toBe(3);
  });

  it("multiple consecutive calls all trigger renders", () => {
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useRerender();
    });

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    // Updates in the same batch are merged into one render
    expect(renderCount).toBe(2);
  });

  it("the returned function identity is stable", () => {
    const { result, rerender } = renderHook(() => useRerender());
    const rerenderFn = result.current;

    rerender();

    expect(result.current).toBe(rerenderFn);
  });
});

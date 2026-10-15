import renderHook from "./helpers/renderHook";

import useMountedRef from "../src/useMountedRef";

describe("useMountedRef", () => {
  it("current is false on the first render (before effects run)", () => {
    const values: boolean[] = [];
    const { result } = renderHook(() => {
      const ref = useMountedRef();
      values.push(ref.current);
      return ref;
    });

    expect(values[0]).toBe(false);
    // Effects have run after rendering completes
    expect(result.current.current).toBe(true);
  });

  it("current returns to false after unmount", () => {
    const { result, unmount } = renderHook(() => useMountedRef());
    expect(result.current.current).toBe(true);

    unmount();
    expect(result.current.current).toBe(false);
  });

  it("ref object identity is stable", () => {
    const { result, rerender } = renderHook(() => useMountedRef());
    const ref = result.current;

    rerender();

    expect(result.current).toBe(ref);
  });
});

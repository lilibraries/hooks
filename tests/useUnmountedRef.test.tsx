import renderHook from "./helpers/renderHook";

import useUnmountedRef from "../src/useUnmountedRef";

describe("useUnmountedRef", () => {
  it("current is false while mounted", () => {
    const { result } = renderHook(() => useUnmountedRef());
    expect(result.current.current).toBe(false);
  });

  it("current becomes true after unmount", () => {
    const { result, unmount } = renderHook(() => useUnmountedRef());
    expect(result.current.current).toBe(false);

    unmount();
    expect(result.current.current).toBe(true);
  });

  it("ref object identity is stable", () => {
    const { result, rerender } = renderHook(() => useUnmountedRef());
    const ref = result.current;

    rerender();

    expect(result.current).toBe(ref);
  });
});

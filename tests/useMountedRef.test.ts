import { useMountedRef } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useMountedRef", () => {
  it("should always return the same ref object", () => {
    const results: any[] = [];
    const { rerender, unmount } = renderHook(() => {
      results.push(useMountedRef());
    });

    rerender();
    unmount();

    const first = results[0];
    for (let i = 1; i < results.length; i++) {
      expect(results[i]).toStrictEqual(first);
    }
  });

  it("should return true after the component is mounted, otherwise return false", () => {
    let first: boolean | undefined;
    const { result, rerender, unmount } = renderHook(() => {
      const mountedRef = useMountedRef();
      if (first === undefined) {
        first = mountedRef.current;
      }
      return mountedRef;
    });

    expect(first).toBe(false);
    expect(result.current.current).toBe(true);
    rerender();
    expect(result.current.current).toBe(true);
    unmount();
    expect(result.current.current).toBe(false);
  });
});

import { renderHook } from "@testing-library/react-hooks";
import { useMounted } from "@lilib/hooks";

describe("useMounted", () => {
  it("should return the same ref object when the component rerenders", () => {
    const results: any[] = [];
    const { rerender, unmount } = renderHook(() => {
      results.push(useMounted());
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
      const mounted = useMounted();
      if (first === undefined) first = mounted.current;
      return mounted;
    });

    expect(first).toBe(false);
    expect(result.current.current).toBe(true);
    rerender();
    expect(result.current.current).toBe(true);
    unmount();
    expect(result.current.current).toBe(true);
  });
});

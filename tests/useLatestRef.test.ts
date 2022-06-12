import { useLatestRef } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useLatestRef", () => {
  it("should return the same ref object when the component rerenders", () => {
    const results: any[] = [];
    const { rerender, unmount } = renderHook(
      (value) => {
        results.push(useLatestRef(value));
      },
      { initialProps: 0 }
    );

    rerender(1);
    rerender(2);
    unmount();

    const first = results[0];
    for (let i = 1; i < results.length; i++) {
      expect(results[i]).toStrictEqual(first);
    }
  });

  it("should use latest value", () => {
    const { result, rerender, unmount } = renderHook(
      (value) => useLatestRef(value),
      { initialProps: 0 }
    );

    expect(result.current.current).toBe(0);
    rerender(1);
    expect(result.current.current).toBe(1);
    rerender(2);
    expect(result.current.current).toBe(2);
    unmount();
    expect(result.current.current).toBe(2);
  });
});

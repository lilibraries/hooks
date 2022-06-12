import { useSetState } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useSetState", () => {
  it("should merge states", () => {
    const { result } = renderHook(() => useSetState<any>({ a: "a", b: "b" }));

    expect(result.current[0]).toEqual({ a: "a", b: "b" });

    act(() => {
      result.current[1]({ b: "b2", c: "c" });
    });
    expect(result.current[0]).toEqual({ a: "a", b: "b2", c: "c" });
  });

  it("should not set state after the component is unmounted", () => {
    const { result, rerender, unmount } = renderHook(() =>
      useSetState<any>({ a: "a" })
    );

    expect(result.current[0]).toEqual({ a: "a" });

    rerender();
    expect(result.current[0]).toEqual({ a: "a" });

    unmount();
    act(() => {
      result.current[1]({ b: "b" });
    });
    expect(result.current[0]).toEqual({ a: "a" });
  });

  it("can pass a function to `setState`", () => {
    const { result } = renderHook(() => useSetState<any>(() => ({ a: "a" })));

    expect(result.current[0]).toEqual({ a: "a" });

    act(() => {
      result.current[1](({ a }) => {
        return { b: a + "b" };
      });
    });
    expect(result.current[0]).toEqual({ a: "a", b: "ab" });
  });
});

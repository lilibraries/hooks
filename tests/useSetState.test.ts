import { useSetState } from "@lilib/hooks";
import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

describe("useSetState", () => {
  it("should always return the same `setState` function", () => {
    const { result, rerender } = renderHook(() => useSetState({}));
    const [, setState1] = result.current;
    rerender();
    const [, setState2] = result.current;

    expect(setState1).toBe(setState2);
  });

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

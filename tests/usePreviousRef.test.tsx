import renderHook from "./helpers/renderHook";

import usePreviousRef from "../src/usePreviousRef";

describe("usePreviousRef", () => {
  it("current is undefined on the first render", () => {
    const { result } = renderHook(() => usePreviousRef(0));
    expect(result.current.current).toBeUndefined();
  });

  it("current points to the previous value after a change", () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousRef(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    expect(result.current.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current.current).toBe(2);
  });

  it("current stays unchanged when the value is unchanged (same reference)", () => {
    const object = { a: 1 };
    const { result, rerender } = renderHook(({ value }) => usePreviousRef(value), {
      initialProps: { value: object },
    });

    rerender({ value: object });
    expect(result.current.current).toBeUndefined();
  });

  it("reference-type values are treated as changed even with identical content", () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousRef(value), {
      initialProps: { value: { a: 1 } },
    });

    const newObject = { a: 1 };
    rerender({ value: newObject });
    expect(result.current.current).toEqual({ a: 1 });
    expect(result.current.current).not.toBe(newObject);
  });

  it("NaN is treated as equal to NaN (Object.is semantics)", () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousRef(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: NaN });
    expect(result.current.current).toBe(1); // NaN is a change: previous becomes 1

    rerender({ value: NaN });
    expect(result.current.current).toBe(1); // unchanged: NaN equals NaN under Object.is
  });

  it("ref object identity is stable", () => {
    const { result, rerender } = renderHook(() => usePreviousRef(1));
    const ref = result.current;

    rerender();

    expect(result.current).toBe(ref);
  });
});

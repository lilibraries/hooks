import renderHook from "./helpers/renderHook";

import useMemoizedValue from "../src/useMemoizedValue";

describe("useMemoizedValue", () => {
  it("returns the current value on the first render", () => {
    const { result } = renderHook(() => useMemoizedValue({ a: 1 }));
    expect(result.current).toEqual({ a: 1 });
  });

  it("keeps the old reference when values are deep-equal", () => {
    const { result, rerender } = renderHook(({ value }) => useMemoizedValue(value), {
      initialProps: { value: { a: 1 } },
    });

    const first = result.current;
    rerender({ value: { a: 1 } });

    expect(result.current).toBe(first);
  });

  it("returns the new reference when values are not deep-equal", () => {
    const { result, rerender } = renderHook(({ value }) => useMemoizedValue(value), {
      initialProps: { value: { a: 1 } },
    });

    const next = { a: 2 };
    rerender({ value: next });

    expect(result.current).toBe(next);
  });

  it("keeps the old value for equal primitives", () => {
    const { result, rerender } = renderHook(({ value }) => useMemoizedValue(value), {
      initialProps: { value: 1 },
    });

    rerender({ value: 1 });
    expect(result.current).toBe(1);
  });

  it("supports a custom comparison function", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useMemoizedValue(value, (x: number, y: number) => x === y),
      {
        initialProps: { value: 1 },
      },
    );

    rerender({ value: 2 });
    expect(result.current).toBe(2);
  });

  it("keeps the old value when the custom comparison considers them equal", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useMemoizedValue(value, (x: number, y: number) => x % 2 === y % 2),
      {
        initialProps: { value: 1 },
      },
    );

    rerender({ value: 3 }); // 1 and 3 share parity, treated as equal
    expect(result.current).toBe(1);
  });

  it("updates when array content changes", () => {
    const { result, rerender } = renderHook(({ value }) => useMemoizedValue(value), {
      initialProps: { value: [1, 2, 3] },
    });

    rerender({ value: [1, 2, 4] });
    expect(result.current).toEqual([1, 2, 4]);
  });
});

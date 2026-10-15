import renderHook from "./helpers/renderHook";

import usePersist from "../src/usePersist";

describe("usePersist", () => {
  it("the returned function behaves like the callback", () => {
    const callback = (a: number, b: number) => a + b;
    const { result } = renderHook(() => usePersist(callback));

    expect(result.current(1, 2)).toBe(3);
  });

  it("the returned function identity stays the same when the callback changes", () => {
    const { result, rerender } = renderHook(({ callback }) => usePersist(callback), {
      initialProps: { callback: (() => 1) as () => number },
    });

    const first = result.current;
    rerender({ callback: () => 2 });

    expect(result.current).toBe(first);
  });

  it("always runs the latest callback when invoked", () => {
    const { result, rerender } = renderHook(({ callback }) => usePersist(callback), {
      initialProps: { callback: (() => 1) as () => number },
    });

    const first = result.current;
    expect(first()).toBe(1);

    rerender({ callback: () => 2 });
    // Invoked through the old function identity, still runs the latest callback
    expect(first()).toBe(2);
    expect(result.current()).toBe(2);
  });

  it("preserves the this binding", () => {
    const context = { multiplier: 3 };
    const callback = function (this: typeof context, value: number) {
      return value * this.multiplier;
    };
    const { result } = renderHook(() => usePersist(callback));

    expect(result.current.call(context, 4)).toBe(12);
  });

  it("returns the callback's return value", () => {
    const callback = (value: string) => value.toUpperCase();
    const { result } = renderHook(() => usePersist(callback));

    expect(result.current("hello")).toBe("HELLO");
  });
});

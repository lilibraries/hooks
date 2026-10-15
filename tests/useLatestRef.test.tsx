import renderHook from "./helpers/renderHook";

import useLatestRef from "../src/useLatestRef";

describe("useLatestRef", () => {
  it("current is the passed value initially", () => {
    const { result } = renderHook(() => useLatestRef(0));
    expect(result.current.current).toBe(0);
  });

  it("current points to the latest value after changes", () => {
    const { result, rerender } = renderHook(({ value }) => useLatestRef(value), {
      initialProps: { value: 1 },
    });

    expect(result.current.current).toBe(1);

    rerender({ value: 2 });
    expect(result.current.current).toBe(2);

    rerender({ value: 3 });
    expect(result.current.current).toBe(3);
  });

  it("ref object identity is stable", () => {
    const { result, rerender } = renderHook(() => useLatestRef(1));
    const ref = result.current;

    rerender();

    expect(result.current).toBe(ref);
  });

  it("keeps reference equality for object values", () => {
    const object = { a: 1 };
    const { result } = renderHook(() => useLatestRef(object));
    expect(result.current.current).toBe(object);
  });
});

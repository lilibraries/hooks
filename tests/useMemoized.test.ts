import { useMemoized } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useMemoized", () => {
  it("should return value correctly", () => {
    const a = { value: "value" };
    const b = { value: "value" };
    const c = { value: "new value" };

    const { result, rerender } = renderHook(
      (value: typeof a) => {
        return useMemoized(value);
      },
      { initialProps: a }
    );

    expect(result.current).toBe(a);

    rerender(b);
    expect(result.current).toBe(a);

    rerender(c);
    expect(result.current).toBe(c);
  });
});

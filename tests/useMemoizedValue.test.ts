import { useMemoizedValue } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useMemoizedValue", () => {
  it("should return value correctly", () => {
    const a = { value: "value" };
    const b = { value: "value" };
    const c = { value: "new value" };

    const { result, rerender } = renderHook(
      (value: typeof a) => {
        return useMemoizedValue(value);
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

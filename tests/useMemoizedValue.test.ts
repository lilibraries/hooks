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

  it("can customize the comparison function", () => {
    const a = { value: "value" };
    const b = { value: "value" };
    const c = { value: "new value" };

    const returnTrue = () => true;
    const returnFalse = () => false;

    const { result, rerender } = renderHook(
      ({ value, compare }) => {
        return useMemoizedValue(value, compare);
      },
      { initialProps: { value: a, compare: returnTrue } }
    );
    expect(result.current).toBe(a);

    rerender({ value: b, compare: returnTrue });
    expect(result.current).toBe(a);
    rerender({ value: c, compare: returnTrue });
    expect(result.current).toBe(a);

    rerender({ value: a, compare: returnFalse });
    expect(result.current).toBe(a);
    rerender({ value: b, compare: returnFalse });
    expect(result.current).toBe(b);
    rerender({ value: c, compare: returnFalse });
    expect(result.current).toBe(c);
  });
});

import { useDelayedValue } from "@lilib/hooks";
import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

describe("useDelayedValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should delay value correctly", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDelayedValue(value, 100),
      { initialProps: { value: 1 } }
    );

    expect(result.current).toBe(1);
    rerender({ value: 2 });
    expect(result.current).toBe(1);
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe(1);
    rerender({ value: 1 });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(1);
    rerender({ value: 2 });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(2);
  });

  it("accepts `include` option", () => {
    const { result, rerender } = renderHook(
      ({ value }) =>
        useDelayedValue(value, {
          delay: 100,
          include: (value) => value === true,
        }),
      { initialProps: { value: false } }
    );

    expect(result.current).toBe(false);
    rerender({ value: true });
    expect(result.current).toBe(false);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(true);

    rerender({ value: false });
    expect(result.current).toBe(false);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current).toBe(false);
  });

  it("can customize the comparison function", () => {
    const a = { value: "value" };
    const b = { value: "value" };
    const c = { value: "new value" };

    const returnTrue = () => true;
    const returnFalse = () => false;

    const { result, rerender } = renderHook(
      ({ value, compare }) => {
        return useDelayedValue(value, { delay: 100, compare });
      },
      { initialProps: { value: a, compare: returnTrue } }
    );
    expect(result.current).toBe(a);

    rerender({ value: b, compare: returnTrue });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(a);
    rerender({ value: c, compare: returnTrue });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(a);

    rerender({ value: a, compare: returnFalse });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(a);
    rerender({ value: b, compare: returnFalse });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(b);
    rerender({ value: c, compare: returnFalse });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(c);
  });
});

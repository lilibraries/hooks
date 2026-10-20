import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useThrottledValue from "../src/useThrottledValue";

describe("useThrottledValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initial value is the passed value", () => {
    const { result } = renderHook(() => useThrottledValue("initial", 100));
    expect(result.current[0]).toBe("initial");
  });

  it("updates only after the wait when the value changes (default leading: false)", () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    expect(result.current[0]).toBe("a");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe("b");
  });

  it("keeps only the last value for multiple changes within the wait", () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => {
      jest.advanceTimersByTime(40);
    });
    rerender({ value: "c" });
    act(() => {
      jest.advanceTimersByTime(40);
    });
    rerender({ value: "d" });
    act(() => {
      jest.advanceTimersByTime(20);
    });

    expect(result.current[0]).toBe("d");
  });

  it("the first change updates immediately when leading: true", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottledValue(value, { wait: 100, leading: true }),
      {
        initialProps: { value: "a" },
      },
    );

    rerender({ value: "b" });
    expect(result.current[0]).toBe("b");
  });

  it("flush() updates to the latest value immediately", () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => result.current[1].flush());

    expect(result.current[0]).toBe("b");
  });

  it("flush(finalValue) updates to the specified value", () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => result.current[1].flush("custom"));

    expect(result.current[0]).toBe("custom");
  });

  it("cancel() prevents the update", () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => result.current[1].cancel());

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toBe("a");
  });

  it("supports the numeric wait time", () => {
    const { result, rerender } = renderHook(({ value }) => useThrottledValue(value, 50), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current[0]).toBe(2);
  });
});

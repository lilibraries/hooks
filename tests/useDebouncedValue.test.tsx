import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useDebouncedValue from "../src/useDebouncedValue";

describe("useDebouncedValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initial value is the passed value", () => {
    const { result } = renderHook(() => useDebouncedValue("initial", 100));
    expect(result.current[0]).toBe("initial");
  });

  it("updates only after the wait time when the value changes", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    expect(result.current[0]).toBe("a");

    act(() => {
      jest.advanceTimersByTime(99);
    });
    expect(result.current[0]).toBe("a");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current[0]).toBe("b");
  });

  it("keeps only the last value on rapid consecutive changes", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 100), {
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
      jest.advanceTimersByTime(99);
    });

    expect(result.current[0]).toBe("a");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current[0]).toBe("d");
  });

  it("does not update when the value returns to the same value", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe("b");

    rerender({ value: "b" });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toBe("b");
  });

  it("flush() updates to the latest value immediately", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => result.current[1].flush());

    expect(result.current[0]).toBe("b");
  });

  it("flush(finalValue) updates to the specified value", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => result.current[1].flush("custom"));

    expect(result.current[0]).toBe("custom");
  });

  it("cancel() prevents the update", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 100), {
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
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 50), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current[0]).toBe(2);
  });
});

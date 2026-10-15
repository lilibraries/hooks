import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useDelayedValue from "../src/useDelayedValue";

describe("useDelayedValue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initial value is the passed value", () => {
    const { result } = renderHook(() => useDelayedValue("initial", 100));
    expect(result.current).toBe("initial");
  });

  it("updates only after the delay when the value changes", () => {
    const { result, rerender } = renderHook(({ value }) => useDelayedValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(99);
    });
    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe("b");
  });

  it("updates immediately and synchronously when shouldDelay returns false", () => {
    const { result, rerender } = renderHook(
      ({ value }) =>
        useDelayedValue(value, {
          delay: 100,
          shouldDelay: (next: string) => next === "slow",
        }),
      {
        initialProps: { value: "a" },
      },
    );

    rerender({ value: "fast" });
    expect(result.current).toBe("fast");

    rerender({ value: "slow" });
    expect(result.current).toBe("fast");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("slow");
  });

  it("does not reschedule when the value is unchanged", () => {
    const { result, rerender } = renderHook(({ value }) => useDelayedValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "a" });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe("a");
  });

  it("custom compare: equal content is treated as unchanged", () => {
    const { result, rerender } = renderHook(
      ({ value }) =>
        useDelayedValue(value, {
          delay: 100,
          compare: (x: { id: number }, y: { id: number }) => x.id === y.id,
        }),
      {
        initialProps: { value: { id: 1 } },
      },
    );

    const initial = result.current;
    rerender({ value: { id: 1 } }); // A new object with identical content
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe(initial);
  });

  it("uses the last value when it changes again during the delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDelayedValue(value, 100), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    rerender({ value: "c" });
    act(() => {
      jest.advanceTimersByTime(99);
    });

    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe("c");
  });

  it("supports the numeric delay time", () => {
    const { result, rerender } = renderHook(({ value }) => useDelayedValue(value, 50), {
      initialProps: { value: 1 },
    });

    rerender({ value: 2 });
    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current).toBe(2);
  });

  it("options-object form must provide delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDelayedValue(value, { delay: 80 }), {
      initialProps: { value: "a" },
    });

    rerender({ value: "b" });
    act(() => {
      jest.advanceTimersByTime(80);
    });

    expect(result.current).toBe("b");
  });
});

import { useThrottledValue } from "@lilib/hooks";
import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";
import FakeTimers, { InstalledClock } from "@sinonjs/fake-timers";

describe("useThrottledValue", () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = FakeTimers.install();
  });
  afterEach(() => {
    clock.uninstall();
  });

  it("should return the same actions when the component is rerendered", () => {
    const { result, rerender } = renderHook(() => useThrottledValue("", 10));
    const [, actions1] = result.current;
    rerender();
    const [, actions2] = result.current;

    expect(actions1.flush).toBe(actions2.flush);
    expect(actions1.cancel).toBe(actions2.cancel);
  });

  it("should clear timer when the component is unmounted", () => {
    const { result, rerender, unmount } = renderHook(
      (value) => {
        return useThrottledValue(value, 10);
      },
      { initialProps: 1 }
    );
    expect(result.current[0]).toBe(1);
    rerender(2);
    act(() => {
      clock.tick(100);
    });
    expect(result.current[0]).toBe(2);
    rerender(3);
    act(() => {
      clock.tick(9);
    });
    unmount();
    expect(result.current[0]).toBe(2);
  });

  it("should throttle value by default", () => {
    const { result, rerender } = renderHook(
      (value) => useThrottledValue(value, 10),
      { initialProps: 0 }
    );

    expect(result.current[0]).toBe(0);
    rerender(1);
    act(() => {
      clock.tick(5);
    });
    expect(result.current[0]).toBe(0);
    rerender(2);
    expect(result.current[0]).toBe(0);
    act(() => {
      clock.tick(5);
    });
    expect(result.current[0]).toBe(2);
  });

  it("should trigger on the two edges when `options.leading` is true", () => {
    const { result, rerender } = renderHook(
      (value) => useThrottledValue(value, { wait: 10, leading: true }),
      { initialProps: 1 }
    );
    expect(result.current[0]).toBe(1);
    rerender(2);
    expect(result.current[0]).toBe(2);
    act(() => {
      clock.tick(5);
    });
    rerender(3);
    expect(result.current[0]).toBe(2);
    act(() => {
      clock.tick(5);
    });
    expect(result.current[0]).toBe(3);
  });

  it("should only trigger on the leading edge if the `options.leading` is true and the `options.trailing` is false", () => {
    const { result, rerender } = renderHook(
      (value) =>
        useThrottledValue(value, { wait: 10, leading: true, trailing: false }),
      { initialProps: 1 }
    );
    expect(result.current[0]).toBe(1);
    rerender(2);
    expect(result.current[0]).toBe(2);
    act(() => {
      clock.tick(5);
    });
    rerender(3);
    expect(result.current[0]).toBe(2);
    act(() => {
      clock.tick(5);
    });
    expect(result.current[0]).toBe(2);
    rerender(4);
    expect(result.current[0]).toBe(4);
    act(() => {
      clock.tick(100);
    });
    expect(result.current[0]).toBe(4);
  });

  it("should not change value if two edge case options are false", () => {
    const { result, rerender } = renderHook(
      (value) =>
        useThrottledValue(value, { wait: 10, leading: false, trailing: false }),
      { initialProps: 1 }
    );
    expect(result.current[0]).toBe(1);
    rerender(2);
    expect(result.current[0]).toBe(1);
    act(() => {
      clock.tick(5);
    });
    rerender(3);
    expect(result.current[0]).toBe(1);
    act(() => {
      clock.tick(10);
    });
    expect(result.current[0]).toBe(1);
  });

  it("could change options dynamically", () => {
    const { result, rerender } = renderHook(
      ({ value, options }) => useThrottledValue(value, options),
      {
        initialProps: {
          value: 1,
          options: { wait: 10, leading: false, trailing: false },
        },
      }
    );

    expect(result.current[0]).toBe(1);
    act(() => {
      clock.tick(100);
    });
    expect(result.current[0]).toBe(1);

    rerender({
      value: 2,
      options: { wait: 10, leading: true, trailing: false },
    });
    expect(result.current[0]).toBe(2);
    act(() => {
      clock.tick(5);
    });
    rerender({
      value: 3,
      options: { wait: 10, leading: true, trailing: false },
    });
    act(() => {
      clock.tick(5);
    });
    expect(result.current[0]).toBe(2);

    rerender({
      value: 4,
      options: { wait: 10, leading: true, trailing: true },
    });
    expect(result.current[0]).toBe(4);
    act(() => {
      clock.tick(5);
    });
    rerender({
      value: 5,
      options: { wait: 10, leading: true, trailing: true },
    });
    act(() => {
      clock.tick(5);
    });
    expect(result.current[0]).toBe(5);

    rerender({
      value: 6,
      options: { wait: 10, leading: false, trailing: true },
    });
    expect(result.current[0]).toBe(5);
    act(() => {
      clock.tick(5);
    });
    rerender({
      value: 7,
      options: { wait: 10, leading: false, trailing: true },
    });
    act(() => {
      clock.tick(5);
    });
    expect(result.current[0]).toBe(7);

    rerender({
      value: 8,
      options: { wait: 10, leading: false, trailing: true },
    });
    act(() => {
      clock.tick(9);
    });
    rerender({
      value: 9,
      options: { wait: 20, leading: false, trailing: true },
    });
    act(() => {
      clock.tick(11);
    });
    expect(result.current[0]).toBe(8);
  });

  it("should flush and cancel correctly", () => {
    const { result, rerender } = renderHook(
      (value) => useThrottledValue(value, 10),
      { initialProps: 1 }
    );
    expect(result.current[0]).toBe(1);

    rerender(2);
    act(() => {
      clock.tick(5);
    });
    expect(result.current[0]).toBe(1);
    act(() => {
      result.current[1].flush(3);
    });
    expect(result.current[0]).toBe(3);
    rerender(4);
    act(() => {
      clock.tick(5);
    });
    act(() => {
      result.current[1].flush();
    });
    expect(result.current[0]).toBe(4);

    rerender(5);
    act(() => {
      clock.tick(5);
    });
    act(() => {
      result.current[1].cancel();
    });
    act(() => {
      clock.tick(100);
    });
    expect(result.current[0]).toBe(4);
  });
});

import { useThrottle } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";
import FakeTimers, { InstalledClock } from "@sinonjs/fake-timers";

describe("useThrottle", () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = FakeTimers.install();
  });
  afterEach(() => {
    clock.uninstall();
  });

  it("should return the same actions when the component rerenders", () => {
    const { result, rerender } = renderHook(() => useThrottle(() => {}, 10));
    const [throttled1, actions1] = result.current;
    rerender();
    const [throttled2, actions2] = result.current;

    expect(throttled1).toBe(throttled2);
    expect(actions1.flush).toBe(actions2.flush);
    expect(actions1.cancel).toBe(actions2.cancel);
  });

  it("should not run callback automatically", () => {
    const mock = jest.fn();
    const { rerender, unmount } = renderHook(() => {
      useThrottle(mock, 10);
    });
    rerender();
    unmount();
    expect(mock).not.toBeCalled();
  });

  it("should call the latest callback", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const mock3 = jest.fn();
    const { result, rerender } = renderHook((mock) => useThrottle(mock, 10), {
      initialProps: mock1,
    });
    const [throttled] = result.current;

    rerender(mock2);
    act(() => throttled());
    clock.tick(9);
    rerender(mock3);
    clock.tick(1);

    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();
    expect(mock3).toBeCalledTimes(1);
  });

  it("should clear timer when the component is unmounted", () => {
    const mock = jest.fn();
    const { result, unmount } = renderHook(() => useThrottle(mock, 10));
    const [throttled] = result.current;

    act(() => throttled());
    unmount();
    clock.tick(100);
    expect(mock).not.toBeCalled();
  });

  it("should trigger callback on the leading edge by default", () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useThrottle(mock, 10));
    const [throttled] = result.current;

    act(() => throttled());
    expect(mock).not.toBeCalled();
    clock.tick(10);
    expect(mock).toBeCalledTimes(1);

    act(() => throttled());
    expect(mock).toBeCalledTimes(1);
    clock.tick(2);
    act(() => throttled());
    clock.tick(3);
    act(() => throttled());
    clock.tick(5);
    expect(mock).toBeCalledTimes(2);
    act(() => throttled());
    clock.tick(5);
    act(() => throttled());
    clock.tick(100);
    expect(mock).toBeCalledTimes(3);
  });

  it("should trigger callback on the two edges when only the `options.leading` is specified", () => {
    const mock = jest.fn();
    const { result } = renderHook(() =>
      useThrottle(mock, { wait: 10, leading: true })
    );
    const [throttled] = result.current;

    act(() => throttled());
    expect(mock).toBeCalledTimes(1);
    clock.tick(5);
    act(() => throttled());
    clock.tick(5);
    expect(mock).toBeCalledTimes(2);
    clock.tick(5);
    act(() => throttled());
    expect(mock).toBeCalledTimes(3);
    clock.tick(100);
    expect(mock).toBeCalledTimes(4);
    act(() => throttled());
    expect(mock).toBeCalledTimes(5);
    clock.tick(100);
    expect(mock).toBeCalledTimes(6);
  });

  it("should only trigger on the leading edge if the `options.leading` is true and the `options.trailing` is false", () => {
    const mock = jest.fn();
    const { result } = renderHook(() =>
      useThrottle(mock, { wait: 10, leading: true, trailing: false })
    );
    const [throttled] = result.current;

    act(() => throttled());
    expect(mock).toBeCalledTimes(1);
    clock.tick(5);
    act(() => throttled());
    clock.tick(5);
    expect(mock).toBeCalledTimes(1);
    act(() => throttled());
    expect(mock).toBeCalledTimes(2);
    clock.tick(100);
    expect(mock).toBeCalledTimes(2);
    act(() => throttled());
    expect(mock).toBeCalledTimes(3);
    clock.tick(100);
    expect(mock).toBeCalledTimes(3);
  });

  it("should not trigger callback if two edge case options are false", () => {
    const mock = jest.fn();
    const { result } = renderHook(() =>
      useThrottle(mock, { wait: 10, leading: false, trailing: false })
    );
    const [throttled] = result.current;

    act(() => throttled());
    clock.tick(5);
    act(() => throttled());
    clock.tick(5);
    act(() => throttled());
    clock.tick(100);
    act(() => throttled());
    clock.tick(100);
    expect(mock).not.toBeCalled();
  });

  it("could change options dynamically", () => {
    const mock = jest.fn();
    const { result, rerender } = renderHook(
      (options) => useThrottle(mock, options),
      { initialProps: { wait: 10, leading: false, trailing: false } }
    );
    const [throttled] = result.current;

    act(() => throttled());
    expect(mock).not.toBeCalled();
    clock.tick(100);
    expect(mock).not.toBeCalled();

    rerender({ wait: 10, leading: true, trailing: false });
    act(() => throttled());
    expect(mock).toBeCalledTimes(1);
    clock.tick(100);
    expect(mock).toBeCalledTimes(1);

    rerender({ wait: 10, leading: true, trailing: true });
    act(() => throttled());
    expect(mock).toBeCalledTimes(2);
    clock.tick(100);
    expect(mock).toBeCalledTimes(3);

    rerender({ wait: 10, leading: false, trailing: true });
    act(() => throttled());
    expect(mock).toBeCalledTimes(3);
    clock.tick(100);
    expect(mock).toBeCalledTimes(4);

    act(() => throttled());
    clock.tick(5);
    rerender({ wait: 20, leading: false, trailing: true });
    clock.tick(10);
    expect(mock).toBeCalledTimes(4);
    clock.tick(5);
    expect(mock).toBeCalledTimes(5);
  });

  it("should return value correctly", () => {
    let count = 0;
    let sum: number | undefined;
    const mock = jest.fn(() => ++count);
    const { result, rerender } = renderHook(
      (options) => useThrottle(mock, options),
      { initialProps: { wait: 10, leading: false, trailing: true } }
    );
    const [throttled] = result.current;

    act(() => {
      sum = throttled();
    });
    expect(count).toBe(0);
    expect(sum).toBeUndefined();
    clock.tick(10);
    expect(count).toBe(1);
    expect(sum).toBeUndefined();
    act(() => {
      sum = throttled();
    });
    expect(count).toBe(1);
    expect(sum).toBe(1);
    clock.tick(10);
    expect(count).toBe(2);
    expect(sum).toBe(1);

    rerender({ wait: 10, leading: true, trailing: false });
    act(() => {
      sum = throttled();
    });
    expect(count).toBe(3);
    expect(sum).toBe(3);
    clock.tick(10);
    expect(count).toBe(3);
    expect(sum).toBe(3);
    act(() => {
      sum = throttled();
    });
    expect(count).toBe(4);
    expect(sum).toBe(4);
    clock.tick(100);
    expect(count).toBe(4);
    expect(sum).toBe(4);

    rerender({ wait: 10, leading: true, trailing: true });
    act(() => {
      sum = throttled();
    });
    expect(count).toBe(5);
    expect(sum).toBe(5);
    clock.tick(10);
    expect(count).toBe(6);
    expect(sum).toBe(5);
    act(() => {
      sum = throttled();
    });
    expect(count).toBe(7);
    expect(sum).toBe(7);
    clock.tick(100);
    expect(count).toBe(8);
    expect(sum).toBe(7);
  });

  it("should flush and cancel correctly", () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useThrottle(mock, 10));
    const [throttled, { flush, cancel }] = result.current;

    act(() => throttled());
    clock.tick(5);
    expect(mock).not.toBeCalled();
    act(() => flush());
    expect(mock).toBeCalledTimes(1);

    act(() => throttled());
    clock.tick(5);
    expect(mock).toBeCalledTimes(1);
    act(() => cancel());
    clock.tick(100);
    expect(mock).toBeCalledTimes(1);
  });
});

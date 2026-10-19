import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useThrottle from "../src/useThrottle";

describe("useThrottle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("by default (leading: false) the first call does not run immediately but after the wait", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));
    const [throttled] = result.current;

    act(() => throttled("a"));
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");
  });

  it("repeated calls within the wait are ignored (trailing runs the last one)", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));
    const [throttled] = result.current;

    act(() => {
      throttled("a");
      jest.advanceTimersByTime(40);
      throttled("b");
      jest.advanceTimersByTime(40);
      throttled("c");
      jest.advanceTimersByTime(20);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("c");
  });

  it("the first call runs immediately when leading: true", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, { wait: 100, leading: true }));
    const [throttled] = result.current;

    act(() => throttled("a"));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");
  });

  it("the last call within the wait does not run when trailing: false", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, { wait: 100, leading: true, trailing: false }));
    const [throttled] = result.current;

    act(() => {
      throttled("a");
      jest.advanceTimersByTime(50);
      throttled("b");
      jest.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");
  });

  it("a call after the wait time can run", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));
    const [throttled] = result.current;

    act(() => {
      throttled("a");
      jest.advanceTimersByTime(100);
      throttled("b");
      jest.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith("b");
  });

  it("cancel() prevents the pending trailing call", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));
    const [throttled, { cancel }] = result.current;

    act(() => throttled("a"));
    act(() => cancel());
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("flush() runs the pending call immediately", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 100));
    const [throttled, { flush }] = result.current;

    act(() => throttled("a"));
    act(() => flush());

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");
  });

  it("flushes the pending call when the options change", () => {
    const callback = jest.fn();
    const { result, rerender } = renderHook(({ wait }) => useThrottle(callback, wait), {
      initialProps: { wait: 100 },
    });
    const [throttled] = result.current;

    act(() => throttled("a"));

    rerender({ wait: 200 });

    // The pending invocation of the old instance is flushed on the options change
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");

    // The new instance uses the new wait
    act(() => result.current[0]("b"));
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith("b");
  });

  it("runs the latest callback", () => {
    const first = jest.fn();
    const { result, rerender } = renderHook(({ callback }) => useThrottle(callback, 100), {
      initialProps: { callback: first },
    });

    const latest = jest.fn();
    rerender({ callback: latest });

    act(() => result.current[0]("a"));
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it("throttled function identity is stable", () => {
    const { result, rerender } = renderHook(() => useThrottle(jest.fn(), 100));
    const [throttled, { flush, cancel }] = result.current;

    rerender();

    expect(result.current[0]).toBe(throttled);
    expect(result.current[1].flush).toBe(flush);
    expect(result.current[1].cancel).toBe(cancel);
  });

  it("cancels pending calls automatically on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useThrottle(callback, 100));

    act(() => result.current[0]("a"));
    unmount();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(callback).not.toHaveBeenCalled();
  });
});

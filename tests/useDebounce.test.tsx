import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useDebounce from "../src/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("invokes the callback after the wait time (trailing)", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 100));
    const [debounced] = result.current;

    act(() => debounced("a"));
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(99);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");
  });

  it("runs only the last call on repeated invocations", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 100));
    const [debounced] = result.current;

    act(() => {
      debounced("a");
      jest.advanceTimersByTime(50);
      debounced("b");
      jest.advanceTimersByTime(50);
      debounced("c");
      jest.advanceTimersByTime(99);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("c");
  });

  it("cancel() prevents execution", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 100));
    const [debounced, { cancel }] = result.current;

    act(() => debounced("a"));
    act(() => cancel());
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("flush() runs the pending call immediately", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 100));
    const [debounced, { flush }] = result.current;

    act(() => debounced("a"));
    act(() => {
      const value = flush();
      void value;
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");

    // No pending task remains after flush
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("leading option: the first call runs immediately", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, { wait: 100, leading: true, trailing: false }));
    const [debounced] = result.current;

    act(() => debounced("a"));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("a");

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not run after the wait when trailing: false", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, { wait: 100, trailing: false }));

    act(() => result.current[0]("a"));
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("maxWait: runs after the maximum wait even with continuous calls", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, { wait: 100, maxWait: 200 }));
    const [debounced] = result.current;

    act(() => {
      for (let i = 0; i < 10; i++) {
        debounced(`a${i}`);
        jest.advanceTimersByTime(50);
      }
    });

    expect(callback).toHaveBeenCalled();
  });

  it("runs the latest callback", () => {
    const first = jest.fn();
    const { result, rerender } = renderHook(({ callback }) => useDebounce(callback, 100), {
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

  it("debounced function identity is stable", () => {
    const { result, rerender } = renderHook(() => useDebounce(jest.fn(), 100));
    const [debounced, { flush, cancel }] = result.current;

    rerender();

    expect(result.current[0]).toBe(debounced);
    expect(result.current[1].flush).toBe(flush);
    expect(result.current[1].cancel).toBe(cancel);
  });

  it("cancels pending calls automatically on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useDebounce(callback, 100));

    act(() => result.current[0]("a"));
    unmount();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(callback).not.toHaveBeenCalled();
  });
});

import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useIdle from "../src/useIdle";

import { installIdleCallbackMock } from "./helpers/mocks";

describe("useIdle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // sinon fake timers ship their own requestIdleCallback fake; re-stub to fully control scheduling
    installIdleCallbackMock();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("runs the callback when idle after start()", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIdle(callback));

    act(() => result.current[0]());
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("runs only once, not repeatedly", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIdle(callback));

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(0);
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancel() prevents the callback from running", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIdle(callback));
    const [start, cancel] = result.current;

    act(() => start());
    act(() => cancel());

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("repeated start() cancels the previous scheduling", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIdle(callback));
    const [start] = result.current;

    act(() => {
      start();
      start();
    });

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("runs the latest callback", () => {
    const first = jest.fn();
    const { result, rerender } = renderHook(({ callback }) => useIdle(callback), {
      initialProps: { callback: first },
    });

    const latest = jest.fn();
    rerender({ callback: latest });

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it("supports the timeout option", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useIdle(callback, { timeout: 100 }));

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(99);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancels automatically on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useIdle(callback));

    act(() => result.current[0]());
    unmount();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("start/cancel identities are stable", () => {
    const { result, rerender } = renderHook(() => useIdle(jest.fn()));
    const [start, cancel] = result.current;

    rerender();

    expect(result.current[0]).toBe(start);
    expect(result.current[1]).toBe(cancel);
  });
});

import { act, waitFor } from "@testing-library/react";
import { LRUCache } from "lru-cache";
import { StrictMode } from "react";
import renderHook from "./helpers/renderHook";

import useLoad from "../src/useLoad";
import { getDefaultCache } from "../src/utils/cache";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

/** Change jsdom's page visibility state (an own property overrides the prototype getter). */
function setVisibilityState(state: "visible" | "hidden") {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value: state,
  });
}

describe("useLoad", () => {
  // When useLoad's automatic mount load fails, the Promise returned by the internal
  // `load()` is rejected and not consumed; the error is exposed via the `error` state.
  // Such expected unhandled rejections are neutralized for this file in
  // `tests/helpers/environment.ts` (the `process` object inside the sandbox is a stub, so the
  // jest-circus trap cannot be removed from the test itself).

  beforeEach(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    getDefaultCache().clear();
  });

  it("loads automatically on mount and updates data", async () => {
    const callback = jest.fn(async () => "result");
    const { result } = renderHook(() => useLoad(callback));

    expect(result.current.loading).toBe(true);
    expect(result.current.initializing).toBe(true);

    await waitFor(() => expect(result.current.data).toBe("result"));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets error to the error object on failure", async () => {
    const error = new Error("boom");
    const callback = jest.fn(async () => {
      throw error;
    });
    const { result } = renderHook(() => useLoad(callback));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(error);
    expect(result.current.data).toBeUndefined();
  });

  it("reloads automatically when deps change", async () => {
    const loads: number[] = [];
    const { result, rerender } = renderHook(
      ({ id }) =>
        useLoad(async () => {
          loads.push(id);
          return `result-${id}`;
        }, [id]),
      { initialProps: { id: 1 } },
    );

    await waitFor(() => expect(result.current.data).toBe("result-1"));

    rerender({ id: 2 });
    expect(result.current.reloading).toBe(true);

    await waitFor(() => expect(result.current.data).toBe("result-2"));
    expect(loads).toEqual([1, 2]);
  });

  it("does not load automatically in imperative mode", () => {
    const callback = jest.fn(async () => "result");
    const { result } = renderHook(() => useLoad(callback, [], { imperative: true }));

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.initializing).toBe(false);
  });

  it("allows manual load calls in imperative mode", async () => {
    const callback = jest.fn(async (value: string) => value.toUpperCase());
    const { result } = renderHook(() => useLoad(callback, [], { imperative: true }));

    let promise!: Promise<string>;
    act(() => {
      promise = result.current.load("hello");
    });

    await act(async () => {
      await expect(promise).resolves.toBe("HELLO");
    });
    await waitFor(() => expect(result.current.data).toBe("HELLO"));
    expect(callback).toHaveBeenCalledWith("hello");
  });

  it("forwards load params to the callback", async () => {
    const callback = jest.fn(async (a: number, b: number) => a + b);
    const { result } = renderHook(() => useLoad(callback, [], { imperative: true }));

    await act(async () => {
      await result.current.load(1, 2);
    });

    expect(callback).toHaveBeenCalledWith(1, 2);
    expect(result.current.data).toBe(3);
  });

  it("reload uses the params of the most recent load", async () => {
    const callback = jest.fn(async (id: number) => `id-${id}`);
    const { result } = renderHook(() => useLoad(callback, [], { imperative: true }));

    await act(async () => {
      await result.current.load(42);
    });
    expect(result.current.data).toBe("id-42");

    await act(async () => {
      result.current.reload();
    });

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
    expect(callback).toHaveBeenLastCalledWith(42);
  });

  it("reload uses defaultParams when no params were passed", async () => {
    const callback = jest.fn(async (id: number) => `id-${id}`);
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        imperative: true,
        defaultParams: [7] as [number],
      }),
    );

    await act(async () => {
      result.current.reload();
    });

    await waitFor(() => expect(result.current.data).toBe("id-7"));
  });

  it("initialData provides the initial data", async () => {
    const callback = jest.fn(async () => "loaded");
    const { result } = renderHook(() =>
      useLoad(callback, [], { initialData: "initial" as string }),
    );

    expect(result.current.data).toBe("initial");
    await waitFor(() => expect(result.current.data).toBe("loaded"));
  });

  it("update patches data locally (no request)", async () => {
    const callback = jest.fn(async () => "origin");
    const { result } = renderHook(() => useLoad(callback, []));

    await waitFor(() => expect(result.current.data).toBe("origin"));

    act(() => result.current.update("patched"));
    expect(result.current.data).toBe("patched");

    act(() =>
      result.current.update((prev) => {
        return `${prev}-suffix`;
      }),
    );
    expect(result.current.data).toBe("patched-suffix");
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancel aborts the pending load", async () => {
    const pending = deferred<string>();
    const callback = jest.fn(() => pending.promise);
    const { result } = renderHook(() => useLoad(callback));

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));

    act(() => result.current.cancel());
    expect(result.current.loading).toBe(false);

    pending.resolve("late");
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.data).toBeUndefined();
  });

  it("unmount cancels the pending load without updating state", async () => {
    const pending = deferred<string>();
    const callback = jest.fn(() => pending.promise);
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { unmount } = renderHook(() => useLoad(callback));

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));

    unmount();

    pending.resolve("late");
    await act(async () => {
      await Promise.resolve();
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("onSuccess/onFailure/onFinally callbacks", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    const onFinally = jest.fn();

    const { result, rerender } = renderHook(
      ({ fail }) =>
        useLoad(
          async () => {
            if (fail) {
              throw new Error("err");
            }
            return "ok";
          },
          [fail],
          {
            onSuccess,
            onFailure,
            onFinally,
          },
        ),
      { initialProps: { fail: false } },
    );

    await waitFor(() => expect(result.current.data).toBe("ok"));
    expect(onSuccess).toHaveBeenCalledWith("ok");
    expect(onFinally).toHaveBeenCalledTimes(1);

    rerender({ fail: true });
    await waitFor(() => expect(result.current.error).toEqual(new Error("err")));
    expect(onFailure).toHaveBeenCalledWith(new Error("err"));
    expect(onFinally).toHaveBeenCalledTimes(2);
  });

  it("retry: automatically retries after failure until success", async () => {
    let attempts = 0;
    const callback = jest.fn(async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error(`attempt-${attempts}`);
      }
      return "recovered";
    });
    const { result } = renderHook(() => useLoad(callback, [], { retry: true, retryInterval: 0 }));

    await waitFor(() => expect(result.current.data).toBe("recovered"));
    expect(callback).toHaveBeenCalledTimes(3);
    expect(result.current.error).toBeNull();
  });

  it("retry: stops and records the error after exceeding retryLimit", async () => {
    const error = new Error("always-fail");
    const callback = jest.fn(async () => {
      throw error;
    });
    const { result } = renderHook(() =>
      useLoad(callback, [], { retry: true, retryLimit: 2, retryInterval: 0 }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(callback).toHaveBeenCalledTimes(3); // initial + 2 retries
    expect(result.current.error).toBe(error);
  });

  it("retry: a function receives the error and decides whether to retry", async () => {
    const retryableError = new Error("retryable");
    let attempts = 0;
    const callback = jest.fn(async () => {
      attempts++;
      if (attempts < 2) {
        throw retryableError;
      }
      return "recovered";
    });
    const retry = jest.fn((error: unknown) => error === retryableError);
    const { result } = renderHook(() => useLoad(callback, [], { retry, retryInterval: 0 }));

    await waitFor(() => expect(result.current.data).toBe("recovered"));
    expect(callback).toHaveBeenCalledTimes(2);
    expect(retry).toHaveBeenCalledTimes(1);
    expect(retry).toHaveBeenCalledWith(retryableError);
  });

  it("retry: a function returning false stops retrying and records the error", async () => {
    const error = new Error("fatal");
    const callback = jest.fn(async () => {
      throw error;
    });
    const retry = jest.fn(() => false);
    const { result } = renderHook(() => useLoad(callback, [], { retry, retryInterval: 0 }));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(retry).toHaveBeenCalledWith(error);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(error);
  });

  it("retry: a function returning false falls through to the fallback", async () => {
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    const fallback = jest.fn(async () => "fallback-data");
    const { result } = renderHook(() =>
      useLoad(callback, [], { retry: () => false, retryInterval: 0, fallback }),
    );

    await waitFor(() => expect(result.current.data).toBe("fallback-data"));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledTimes(1);
  });

  it("retry: the primary loader is not retried again after the fallback has been invoked", async () => {
    const fallbackError = new Error("fallback-error");
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    const fallback = jest.fn(async () => {
      throw fallbackError;
    });
    // Returns true for the fallback's error: without the guard this would retry the primary loader instead of rejecting
    const retry = jest.fn((error: unknown) => error === fallbackError);
    const { result } = renderHook(() =>
      useLoad(callback, [], { retry, retryInterval: 0, fallback }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBe(fallbackError);
  });

  it("fallback: invokes the fallback after the primary function fails", async () => {
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    const fallback = jest.fn(async () => "fallback-data");
    const { result } = renderHook(() => useLoad(callback, [], { fallback }));

    await waitFor(() => expect(result.current.data).toBe("fallback-data"));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledTimes(1);
  });

  it("reloading and initializing states", async () => {
    const pending = deferred<string>();
    const callback = jest.fn(() => pending.promise);

    const { result, rerender } = renderHook(({ dep }) => useLoad(callback, [dep]), {
      initialProps: { dep: 1 },
    });

    expect(result.current.initializing).toBe(true);

    pending.resolve("first");
    await waitFor(() => expect(result.current.data).toBe("first"));
    expect(result.current.reloading).toBe(false);
    expect(result.current.initializing).toBe(false);

    const second = deferred<string>();
    callback.mockImplementation(() => second.promise);
    rerender({ dep: 2 });
    expect(result.current.reloading).toBe(true);
    expect(result.current.initializing).toBe(false);

    second.resolve("second");
    await waitFor(() => expect(result.current.data).toBe("second"));
  });

  it("loading again with new params cancels the pending load", async () => {
    const first = deferred<string>();
    const second = deferred<string>();
    const callback = jest
      .fn<Promise<string>, [value: string]>()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);
    const { result } = renderHook(() => useLoad(callback, [], { imperative: true }));

    let secondPromise!: Promise<string>;
    act(() => {
      result.current.load("a");
      secondPromise = result.current.load("b");
    });

    await act(async () => {
      second.resolve("second-data");
      await expect(secondPromise).resolves.toBe("second-data");
    });
    await waitFor(() => expect(result.current.data).toBe("second-data"));

    first.resolve("late-data");
    await act(async () => {
      await Promise.resolve();
    });
    // The result of the cancelled request must not overwrite the new data
    expect(result.current.data).toBe("second-data");
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("multiple instances with the same key merge duplicate requests", async () => {
    const pending = deferred<string>();
    const callback = jest.fn(() => pending.promise);

    const { result: first, unmount: unmountFirst } = renderHook(() =>
      useLoad(callback, [], { key: "shared" }),
    );
    const { result: second, unmount: unmountSecond } = renderHook(() =>
      useLoad(callback, [], { key: "shared" }),
    );

    // Both instances share one request; the callback is invoked only once
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));

    pending.resolve("shared-data");
    await waitFor(() => expect(first.current.data).toBe("shared-data"));
    await waitFor(() => expect(second.current.data).toBe("shared-data"));

    expect(callback).toHaveBeenCalledTimes(1);
    unmountFirst();
    unmountSecond();
  });

  it("instances with different keys request independently", async () => {
    const callbackA = jest.fn(async () => "data-a");
    const callbackB = jest.fn(async () => "data-b");

    const { result: first, unmount: unmountFirst } = renderHook(() =>
      useLoad(callbackA, [], { key: "a" }),
    );
    const { result: second, unmount: unmountSecond } = renderHook(() =>
      useLoad(callbackB, [], { key: "b" }),
    );

    await waitFor(() => expect(first.current.data).toBe("data-a"));
    await waitFor(() => expect(second.current.data).toBe("data-b"));

    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(1);
    unmountFirst();
    unmountSecond();
  });

  it("independent instances do not share even with the same key", async () => {
    const callbackA = jest.fn(async () => "data-a");
    const callbackB = jest.fn(async () => "data-b");

    const { result: first, unmount: unmountFirst } = renderHook(() =>
      useLoad(callbackA, [], { key: "shared", independent: true }),
    );
    const { result: second, unmount: unmountSecond } = renderHook(() =>
      useLoad(callbackB, [], { key: "shared", independent: true }),
    );

    await waitFor(() => expect(first.current.data).toBe("data-a"));
    await waitFor(() => expect(second.current.data).toBe("data-b"));

    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(1);
    unmountFirst();
    unmountSecond();
  });

  it("polling: reloads automatically at the interval after success", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => "data");

    const { result } = renderHook(() =>
      useLoad(callback, [], { polling: true, pollingInterval: 100 }),
    );

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe("data");

    await act(async () => {
      await jest.advanceTimersByTimeAsync(100);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(100);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("idle: true runs the load in an idle callback", async () => {
    const callback = jest.fn(async () => "idle-data");
    const { result } = renderHook(() => useLoad(callback, [], { idle: true }));

    await waitFor(() => expect(result.current.data).toBe("idle-data"));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancels the pending request on unmount and stops updating state", async () => {
    const pending = deferred<string>();
    const callback = jest.fn(() => pending.promise);
    const { result, unmount } = renderHook(() => useLoad(callback));

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
    unmount();

    pending.resolve("after-unmount");
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.data).toBeUndefined();
  });

  it("waiters take over the request after the shared initiator unmounts", async () => {
    const firstPending = deferred<string>();
    const secondPending = deferred<string>();
    const callback = jest
      .fn<Promise<string>, []>()
      .mockImplementationOnce(() => firstPending.promise)
      .mockImplementationOnce(() => secondPending.promise);

    const { unmount: unmountFirst } = renderHook(() => useLoad(callback, [], { key: "shared" }));
    const { result: second, unmount: unmountSecond } = renderHook(() =>
      useLoad(callback, [], { key: "shared" }),
    );

    // The two instances merge into one request initiated by first
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));

    unmountFirst();

    // Unmounting first broadcasts cancel, so second takes over the request
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));

    secondPending.resolve("taken-over");
    await waitFor(() => expect(second.current.data).toBe("taken-over"));

    // The result of the cancelled old request must not overwrite the new data
    firstPending.resolve("stale");
    await act(async () => {
      await Promise.resolve();
    });
    expect(second.current.data).toBe("taken-over");

    unmountSecond();
  });

  it("autoReloadOnPageShow: reloads automatically when the page becomes visible again", async () => {
    const callback = jest.fn(async () => "data");
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        autoReloadOnPageShow: true,
        autoReloadWaitTime: 0,
      }),
    );

    // Wait for React to commit the loading-complete state; a resolved callback or microtask does not mean the render has finished.
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      setVisibilityState("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
      setVisibilityState("visible");
      document.dispatchEvent(new Event("visibilitychange"));
    });

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
  });

  it("autoReloadOnWindowFocus: reloads automatically when the window regains focus", async () => {
    const callback = jest.fn(async () => "data");
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        autoReloadOnWindowFocus: true,
        autoReloadWaitTime: 0,
      }),
    );

    // Wait for React to commit the loading-complete state; a resolved callback or microtask does not mean the render has finished.
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      window.dispatchEvent(new Event("focus"));
    });

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
  });

  it("autoReloadOnNetworkReconnect: reloads automatically when the network recovers", async () => {
    const callback = jest.fn(async () => "data");
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        autoReloadOnNetworkReconnect: true,
        autoReloadWaitTime: 0,
      }),
    );

    // Wait for React to commit the loading-complete state; a resolved callback or microtask does not mean the render has finished.
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      window.dispatchEvent(new Event("online"));
    });

    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
  });

  it("autoReloadWaitTime throttle: multiple events within the window reload only once", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => "data");
    renderHook(() => useLoad(callback, [], { autoReloadOnPageShow: true }));

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    const toggleVisibility = () => {
      setVisibilityState("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
      setVisibilityState("visible");
      document.dispatchEvent(new Event("visibilitychange"));
    };

    // The first restore-to-visible (throttle window start) fires immediately
    act(toggleVisibility);
    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    // The second restore-to-visible within the window is throttled out
    act(toggleVisibility);
    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    // Becoming visible again after the default throttle window (10000ms) fires again
    await act(async () => {
      await jest.advanceTimersByTimeAsync(10 * 1000);
    });
    act(toggleVisibility);
    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("pollingInPageHidden: keeps polling at the hidden interval while the page is hidden", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => "data");

    renderHook(() =>
      useLoad(callback, [], {
        polling: true,
        pollingInterval: 100,
        pollingInPageHidden: true,
        pollingIntervalInPageHidden: 200,
        autoReloadWaitTime: 0,
      }),
    );

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    // Page hidden: visibilitychange reloads immediately, then polls at the hidden interval of 200ms
    act(() => {
      setVisibilityState("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(200);
    });
    expect(callback).toHaveBeenCalledTimes(3);

    // Visible again: reloads immediately, then polls at the visible interval of 100ms
    act(() => {
      setVisibilityState("visible");
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(4);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(100);
    });
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it("polling: the polling chain survives staleTime cache hits", async () => {
    const callback = jest.fn(async () => "data");
    const cacheKey = Symbol("cache-key");
    const { unmount } = renderHook(() =>
      useLoad(callback, [], {
        cacheKey,
        cacheTime: 60000,
        staleTime: 100,
        polling: true,
        pollingInterval: 50,
      }),
    );

    // The first polls land within `staleTime` and resolve the fresh cache
    // without a request, but the chain must stay alive: polls outside
    // `staleTime` send requests again.
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(3));

    unmount();
  });

  it("fallbackRetry: automatically retries the fallback until success", async () => {
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    let fallbackAttempts = 0;
    const fallback = jest.fn(async () => {
      fallbackAttempts++;
      if (fallbackAttempts < 3) {
        throw new Error(`fallback-attempt-${fallbackAttempts}`);
      }
      return "fallback-recovered";
    });
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        fallback,
        fallbackRetry: true,
        fallbackRetryInterval: 0,
      }),
    );

    await waitFor(() => expect(result.current.data).toBe("fallback-recovered"));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledTimes(3);
  });

  it("fallbackRetry: stops and records the error after exceeding fallbackRetryLimit", async () => {
    const error = new Error("fallback-fail");
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    const fallback = jest.fn(async () => {
      throw error;
    });
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        fallback,
        fallbackRetry: true,
        fallbackRetryLimit: 2,
        fallbackRetryInterval: 0,
      }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fallback).toHaveBeenCalledTimes(3); // initial + 2 retries
    expect(result.current.error).toBe(error);
  });

  it("fallbackRetry: a function receives the error and decides whether to retry the fallback", async () => {
    const fallbackError = new Error("fallback-retryable");
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    let fallbackAttempts = 0;
    const fallback = jest.fn(async () => {
      fallbackAttempts++;
      if (fallbackAttempts < 2) {
        throw fallbackError;
      }
      return "fallback-recovered";
    });
    const fallbackRetry = jest.fn((error: unknown) => error === fallbackError);
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        fallback,
        fallbackRetry,
        fallbackRetryInterval: 0,
      }),
    );

    await waitFor(() => expect(result.current.data).toBe("fallback-recovered"));
    expect(fallback).toHaveBeenCalledTimes(2);
    expect(fallbackRetry).toHaveBeenCalledTimes(1);
    expect(fallbackRetry).toHaveBeenCalledWith(fallbackError);
  });

  it("fallbackRetry: a function returning false stops retrying the fallback", async () => {
    const error = new Error("fatal");
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    const fallback = jest.fn(async () => {
      throw error;
    });
    const fallbackRetry = jest.fn(() => false);
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        fallback,
        fallbackRetry,
        fallbackRetryInterval: 0,
      }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fallback).toHaveBeenCalledTimes(1);
    expect(fallbackRetry).toHaveBeenCalledWith(error);
    expect(result.current.error).toBe(error);
  });

  it("retry: delays retries by the returned value when retryInterval is a function", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => {
      throw new Error("always-fail");
    });
    const retryInterval = jest.fn((count: number) => count * 100);
    renderHook(() => useLoad(callback, [], { retry: true, retryLimit: 2, retryInterval }));

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(retryInterval).toHaveBeenCalledWith(1);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(100);
    });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(retryInterval).toHaveBeenCalledWith(2);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(200);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("retry: default retryInterval delays retries exponentially", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => {
      throw new Error("always-fail");
    });
    renderHook(() => useLoad(callback, [], { retry: true, retryLimit: 2 }));

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    // The 1st retry waits 2^0 × 1000 = 1000ms
    await act(async () => {
      await jest.advanceTimersByTimeAsync(999);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    // The 2nd retry waits 2^1 × 1000 = 2000ms
    await act(async () => {
      await jest.advanceTimersByTimeAsync(1999);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("fallbackRetry: default fallbackRetryInterval delays retries exponentially", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    const fallback = jest.fn(async () => {
      throw new Error("always-fail");
    });
    renderHook(() =>
      useLoad(callback, [], {
        fallback,
        fallbackRetry: true,
        fallbackRetryLimit: 2,
      }),
    );

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(fallback).toHaveBeenCalledTimes(1);

    // The 1st fallback retry waits 2^0 × 1000 = 1000ms
    await act(async () => {
      await jest.advanceTimersByTimeAsync(999);
    });
    expect(fallback).toHaveBeenCalledTimes(1);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1);
    });
    expect(fallback).toHaveBeenCalledTimes(2);

    // The 2nd fallback retry waits 2^1 × 1000 = 2000ms
    await act(async () => {
      await jest.advanceTimersByTimeAsync(1999);
    });
    expect(fallback).toHaveBeenCalledTimes(2);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1);
    });
    expect(fallback).toHaveBeenCalledTimes(3);
  });

  it("fallbackRetry: rejects with the last error when the fallback option is removed while a retry is pending", async () => {
    jest.useFakeTimers();
    const error = new Error("fallback-fail");
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    const fallback = jest.fn(async () => {
      throw error;
    });
    const { result, rerender } = renderHook(
      ({ fallbackOption }) =>
        useLoad(callback, [], {
          fallback: fallbackOption,
          fallbackRetry: true,
          fallbackRetryInterval: 100,
        }),
      {
        initialProps: { fallbackOption: fallback as jest.Mock<Promise<never>, []> | undefined },
      },
    );

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(fallback).toHaveBeenCalledTimes(1);

    // The option is removed before the delayed retry fires: the guarded path
    // rejects with the original error instead of invoking an undefined fallback.
    rerender({ fallbackOption: undefined });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(100);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(error);
    expect(fallback).toHaveBeenCalledTimes(1);
  });

  it("cancel stops pending retries", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => {
      throw new Error("always-fail");
    });
    const { result } = renderHook(() => useLoad(callback, [], { retry: true, retryInterval: 100 }));

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => result.current.cancel());

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancel stops polling", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => "data");
    const { result } = renderHook(() =>
      useLoad(callback, [], { polling: true, pollingInterval: 100 }),
    );

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => result.current.cancel());

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("reads from and writes to a custom cache instance when options.cache is provided", async () => {
    const customCache = new LRUCache({ maxSize: 100, sizeCalculation: () => 1 });
    const cacheKey = Symbol("cache-key");
    customCache.set(cacheKey, "preloaded", { ttl: 0 });

    const callback = jest.fn(async () => "loaded");
    const { result, unmount } = renderHook(() =>
      useLoad(callback, [], { cache: customCache, cacheKey, cacheTime: Infinity }),
    );

    // The initial data is read from the custom cache instance.
    expect(result.current.data).toBe("preloaded");

    await waitFor(() => expect(result.current.data).toBe("loaded"));
    expect(customCache.get(cacheKey)).toBe("loaded");
    // The shared default cache is untouched.
    expect(getDefaultCache().has(cacheKey)).toBe(false);

    unmount();
  });

  it("reads cached data on mount and writes loaded data to the cache", async () => {
    const cacheKey = Symbol("cache-key");
    getDefaultCache().set(cacheKey, "cached", { ttl: Infinity });

    const callback = jest.fn(async () => "loaded");
    const { result, unmount } = renderHook(() =>
      useLoad(callback, [], { cacheKey, cacheTime: Infinity }),
    );

    // The initial data comes from the cache.
    expect(result.current.data).toBe("cached");

    await waitFor(() => expect(result.current.data).toBe("loaded"));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(getDefaultCache().get(cacheKey)).toBe("loaded");

    unmount();

    // A second instance reads the cached data again on mount.
    const secondCallback = jest.fn(async () => "second");
    const { result: second } = renderHook(() =>
      useLoad(secondCallback, [], { cacheKey, cacheTime: Infinity }),
    );
    expect(second.current.data).toBe("loaded");

    await waitFor(() => expect(second.current.data).toBe("second"));
    expect(getDefaultCache().get(cacheKey)).toBe("second");
  });

  it("staleTime: resolves fresh cached data without a request, force bypasses it", async () => {
    const cacheKey = Symbol("cache-key");
    getDefaultCache().set(cacheKey, "cached", { ttl: 60 * 1000 });

    const callback = jest.fn(async () => "loaded");
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        imperative: true,
        cacheKey,
        cacheTime: 60 * 1000,
        staleTime: 30 * 1000,
      }),
    );

    expect(typeof result.current.force).toBe("function");
    // The cached data is fresh (written just now), so load() resolves it directly without a request.
    expect(result.current.data).toBe("cached");

    let promise!: Promise<string>;
    act(() => {
      promise = result.current.load();
    });
    await expect(promise).resolves.toBe("cached");
    expect(callback).not.toHaveBeenCalled();
    expect(result.current.data).toBe("cached");

    // reload() also hits the fresh cache.
    act(() => {
      result.current.reload();
    });
    expect(callback).not.toHaveBeenCalled();

    // force() bypasses the staleTime cache hit.
    await act(async () => {
      await result.current.force();
    });
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.data).toBe("loaded");

    // reload({ force: true }) bypasses it too.
    act(() => {
      result.current.reload({ force: true });
    });
    await waitFor(() => expect(callback).toHaveBeenCalledTimes(2));
    expect(result.current.data).toBe("loaded");
  });

  it("staleTime: sends a request once the cache entry is no longer fresh", async () => {
    const cacheKey = Symbol("cache-key");
    getDefaultCache().set(cacheKey, "cached", { ttl: 60 * 1000 });

    // Let the entry age beyond `staleTime` (real timers: lru-cache measures TTL with performance.now,
    // which is excluded from jest's fake timers config).
    await new Promise((resolve) => setTimeout(resolve, 5));

    const callback = jest.fn(async () => "loaded");
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        imperative: true,
        cacheKey,
        cacheTime: 60 * 1000,
        staleTime: 1,
      }),
    );

    expect(result.current.data).toBe("cached");

    act(() => {
      result.current.load();
    });
    await waitFor(() => expect(result.current.data).toBe("loaded"));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cacheValidate: rejects invalid cached data and falls back to initialData", async () => {
    const cacheKey = Symbol("cache-key");
    getDefaultCache().set(cacheKey, "invalid", { ttl: 60 * 1000 });

    const callback = jest.fn(async () => "loaded");
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        cacheKey,
        cacheTime: 60 * 1000,
        initialData: "initial",
        cacheValidate: (data) => data === "valid",
      }),
    );

    expect(result.current.data).toBe("initial");

    await waitFor(() => expect(result.current.data).toBe("loaded"));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(getDefaultCache().get(cacheKey)).toBe("loaded");
  });

  it("staleTime: sends a request when cacheValidate rejects the only fresh cached data", async () => {
    const cacheKey = Symbol("cache-key");
    getDefaultCache().set(cacheKey, "invalid", { ttl: 60 * 1000 });

    const callback = jest.fn(async () => "loaded");
    const { result } = renderHook(() =>
      useLoad(callback, [], {
        imperative: true,
        cacheKey,
        cacheTime: 60 * 1000,
        staleTime: 30 * 1000,
        cacheValidate: (data) => data === "valid",
      }),
    );

    expect(result.current.data).toBeUndefined();

    // The fresh cache entry is rejected by cacheValidate and there is no initialData,
    // so load() must fall through and send the request instead of resolving undefined.
    act(() => {
      result.current.load();
    });
    await waitFor(() => expect(result.current.data).toBe("loaded"));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  // React 18+ StrictMode invokes effects twice (mount -> cleanup -> mount); React 16/17 invoke them once.
  // The assertions below only check idempotency properties that hold in both cases, so they never
  // hard-code the callback call count.
  it("settles to the correct state under StrictMode without warnings", async () => {
    const pending = deferred<string>();
    const callback = jest.fn(() => pending.promise);
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useLoad(callback, []), { wrapper: StrictMode });
    await waitFor(() => expect(callback).toHaveBeenCalled());

    // While pending, the cancelled first effect run must not have settled the state.
    expect(result.current.loading).toBe(true);

    pending.resolve("strict-data");
    await waitFor(() => expect(result.current.data).toBe("strict-data"));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("keeps shared loading consistent under StrictMode and leaves no leaked loading record", async () => {
    const pending = deferred<string>();
    const callback = jest.fn(() => pending.promise);

    const { result: first, unmount: unmountFirst } = renderHook(
      () => useLoad(callback, [], { key: "strict-shared" }),
      {
        wrapper: StrictMode,
      },
    );
    const { result: second, unmount: unmountSecond } = renderHook(
      () => useLoad(callback, [], { key: "strict-shared" }),
      { wrapper: StrictMode },
    );

    pending.resolve("strict-shared-data");
    await waitFor(() => expect(first.current.data).toBe("strict-shared-data"));
    await waitFor(() => expect(second.current.data).toBe("strict-shared-data"));
    expect(first.current.error).toBeNull();
    expect(second.current.error).toBeNull();

    unmountFirst();
    unmountSecond();

    // A fresh instance must fire its own request: a leaked loading record in the
    // shared store would make it merge into a request that can never settle.
    const next = deferred<string>();
    callback.mockImplementation(() => next.promise);
    const { result: third, unmount: unmountThird } = renderHook(
      () => useLoad(callback, [], { key: "strict-shared" }),
      {
        wrapper: StrictMode,
      },
    );
    next.resolve("strict-fresh-data");
    await waitFor(() => expect(third.current.data).toBe("strict-fresh-data"));
    unmountThird();
  });

  it("cancels the pending load on unmount under StrictMode without warnings", async () => {
    const pending = deferred<string>();
    const callback = jest.fn(() => pending.promise);
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { unmount } = renderHook(() => useLoad(callback, []), { wrapper: StrictMode });
    await waitFor(() => expect(callback).toHaveBeenCalled());

    unmount();
    pending.resolve("late-data");
    await act(async () => {
      await Promise.resolve();
    });

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("stops polling after unmount under StrictMode (no timers leaked by the double cleanup)", async () => {
    jest.useFakeTimers();
    const callback = jest.fn(async () => "data");
    const { unmount } = renderHook(
      () => useLoad(callback, [], { polling: true, pollingInterval: 100 }),
      {
        wrapper: StrictMode,
      },
    );

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
    });
    expect(callback).toHaveBeenCalled();

    // The polling chain is alive while mounted.
    await act(async () => {
      await jest.advanceTimersByTimeAsync(100);
    });
    expect(callback.mock.calls.length).toBeGreaterThan(1);

    unmount();

    // No polling timer may survive the mount/cleanup pairs: the call count must not grow.
    const callsAtUnmount = callback.mock.calls.length;
    await act(async () => {
      await jest.advanceTimersByTimeAsync(1000);
    });
    expect(callback.mock.calls.length).toBe(callsAtUnmount);
  });
});

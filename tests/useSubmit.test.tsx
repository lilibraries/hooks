import { act, waitFor } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useSubmit from "../src/useSubmit";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("useSubmit", () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it("does not run automatically; submit must be called manually", () => {
    const callback = jest.fn(async () => "data");
    const { result } = renderHook(() => useSubmit(callback));

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.submitting).toBe(false);
  });

  it("submit forwards params and updates the submitting state", async () => {
    const callback = jest.fn(async (id: number, name: string) => ({
      id,
      name,
    }));
    const { result } = renderHook(() => useSubmit(callback));

    let promise!: Promise<{ id: number; name: string }>;
    act(() => {
      promise = result.current.submit(1, "tom");
    });

    expect(result.current.submitting).toBe(true);
    await act(async () => {
      await expect(promise).resolves.toEqual({ id: 1, name: "tom" });
    });

    await waitFor(() => expect(result.current.submitting).toBe(false));
    expect(callback).toHaveBeenCalledWith(1, "tom");
  });

  it("submit returns a Promise resolving with the success data", async () => {
    const callback = jest.fn(async (value: number) => value * 2);
    const { result } = renderHook(() => useSubmit(callback));

    let promise!: Promise<number>;
    act(() => {
      promise = result.current.submit(21);
    });

    await act(async () => {
      await expect(promise).resolves.toBe(42);
    });
  });

  it("rejects on failure and restores submitting", async () => {
    const error = new Error("submit-fail");
    const callback = jest.fn(async () => {
      throw error;
    });
    const { result } = renderHook(() => useSubmit(callback));

    let promise!: Promise<unknown>;
    act(() => {
      promise = result.current.submit();
    });

    await act(async () => {
      await expect(promise).rejects.toBe(error);
    });
    await waitFor(() => expect(result.current.submitting).toBe(false));
  });

  it("a pending submission is cancelled by the next submission", async () => {
    const first = deferred<string>();
    const second = deferred<string>();
    const callback = jest
      .fn<Promise<string>, [value: string]>()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);
    const { result } = renderHook(() => useSubmit(callback));

    let secondPromise!: Promise<string>;
    act(() => {
      result.current.submit("first");
      secondPromise = result.current.submit("second");
    });

    await act(async () => {
      second.resolve("second-data");
      await expect(secondPromise).resolves.toBe("second-data");
    });
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("onSuccess/onFailure/onFinally callbacks", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    const onFinally = jest.fn();
    const callback = jest.fn(async (fail: boolean) => {
      if (fail) {
        throw new Error("err");
      }
      return "ok";
    });

    const { result } = renderHook(() => useSubmit(callback, { onSuccess, onFailure, onFinally }));

    await act(async () => {
      await result.current.submit(false);
    });
    expect(onSuccess).toHaveBeenCalledWith("ok");
    expect(onFinally).toHaveBeenCalledTimes(1);

    await act(async () => {
      await result.current.submit(true).catch(() => {});
    });
    expect(onFailure).toHaveBeenCalledWith(new Error("err"));
    expect(onFinally).toHaveBeenCalledTimes(2);
  });

  it("supports fallback submission", async () => {
    const callback = jest.fn(async () => {
      throw new Error("primary-fail");
    });
    const fallback = jest.fn(async () => "fallback-data");
    const { result } = renderHook(() => useSubmit(callback, { fallback }));

    let promise!: Promise<string>;
    act(() => {
      promise = result.current.submit();
    });

    await act(async () => {
      await expect(promise).resolves.toBe("fallback-data");
    });
    expect(fallback).toHaveBeenCalledTimes(1);
  });

  it("retry: default retryInterval delays retries exponentially", async () => {
    jest.useFakeTimers();
    const error = new Error("always-fail");
    const callback = jest.fn(async () => {
      throw error;
    });
    const { result } = renderHook(() => useSubmit(callback, { retry: true, retryLimit: 2 }));

    let promise!: Promise<unknown>;
    act(() => {
      promise = result.current.submit();
      // Attach an ignore handler early so a rejection before the assertion is not treated as an unhandled rejection by Node
      promise.catch(() => {});
    });

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
    await expect(promise).rejects.toBe(error);
  });

  it("submit identity is stable", () => {
    const { result, rerender } = renderHook(() => useSubmit(async () => "data"));
    const { submit } = result.current;

    rerender();

    expect(result.current.submit).toBe(submit);
  });

  it("exposes the error of the most recent failure and clears it on success", async () => {
    const error = new Error("submit-fail");
    const callback = jest.fn(async (fail: boolean) => {
      if (fail) {
        throw error;
      }
      return "ok";
    });
    const { result } = renderHook(() => useSubmit(callback));

    expect(result.current.error).toBeNull();

    await act(async () => {
      await result.current.submit(true).catch(() => {});
    });
    expect(result.current.error).toBe(error);

    await act(async () => {
      await result.current.submit(false);
    });
    expect(result.current.error).toBeNull();
  });
});

import { useEffect, useState } from "react";
import { CacheConfig, useLoad } from "@lilib/hooks";
import { act, waitFor } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

describe("useLoad", () => {
  let promise: Promise<any> | null = null;

  const resolve = () => {
    promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, 1000);
    });
    return promise;
  };

  const reject = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("error"));
      }, 1000);
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    promise = null;
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("return correct results", async () => {
    const callback = jest.fn().mockImplementation(resolve);
    const { result, rerender, unmount } = renderHook(() => useLoad(callback));

    const result1 = { ...result.current };
    expect(result1.loading).toBe(true);
    expect(result1.initializing).toBe(true);
    expect(result1.reloading).toBe(false);
    expect(result1.error).toBe(null);
    expect(result1.data).toBe(undefined);

    expect(typeof result1.load).toBe("function");
    expect(typeof result1.force).toBe("function");
    expect(typeof result1.reload).toBe("function");
    expect(typeof result1.update).toBe("function");
    expect(typeof result1.cancel).toBe("function");

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    rerender();

    const result2 = { ...result.current };
    expect(result2.loading).toBe(false);
    expect(result2.initializing).toBe(false);
    expect(result2.reloading).toBe(false);
    expect(result2.error).toBe(null);
    expect(result2.data).toBe("done");

    expect(result1.load).toBe(result2.load);
    expect(result1.force).toBe(result2.force);
    expect(result1.reload).toBe(result2.reload);
    expect(result1.update).toBe(result2.update);
    expect(result1.cancel).toBe(result2.cancel);

    expect(callback).toBeCalledTimes(1);
    unmount();
  });

  it("auto reload when deps changing", async () => {
    const callback = jest.fn().mockImplementation(resolve);
    const { result, unmount } = renderHook(() => {
      const [count, setCount] = useState(0);
      useLoad(callback, [count]);
      return setCount;
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);

    act(() => {
      result.current(0);
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);

    act(() => {
      result.current(1);
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(2);

    unmount();
  });

  it("load manually", async () => {
    const callback = jest.fn().mockImplementation(resolve);
    const { result, unmount } = renderHook(() => {
      const [count, setCount] = useState(0);
      const { load } = useLoad(callback, [count], { imperative: true });
      return { load, setCount };
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(0);

    act(() => {
      result.current.load();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);

    act(() => {
      result.current.setCount(1);
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);

    unmount();
  });

  it("get initialData", async () => {
    const callback = jest.fn().mockImplementation(resolve);
    const { result, unmount } = renderHook(() =>
      useLoad(callback, [], { initialData: "initial" })
    );
    expect(result.current.data).toBe("initial");

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(result.current.data).toBe("done");

    unmount();
  });

  it("run callback only once when load key is same", async () => {
    const key = Symbol();
    const callback = jest.fn().mockImplementation(resolve);
    const { unmount } = renderHook(() => {
      useLoad(callback, [], { key });
      useLoad(callback, [], { key });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);

    unmount();
  });

  it("deal `independent` option correctly", async () => {
    const key = Symbol();
    const callback = jest.fn().mockImplementation(resolve);
    const { unmount } = renderHook(() => {
      useLoad(callback, [], { key, independent: true });
      useLoad(callback, [], { key, independent: true });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(2);

    unmount();
  });

  it("pass through `defaultParams`", async () => {
    let promise: Promise<any>;
    const callback = jest.fn().mockImplementation((count) => {
      return (promise = Promise.resolve(count));
    });
    const { result, unmount } = renderHook(() => {
      return useLoad(callback, [], { defaultParams: [1] });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(result.current.data).toBe(1);

    unmount();
  });

  it("resolve fallback", async () => {
    const callback = jest.fn().mockImplementation(reject);
    const fallback = jest.fn().mockImplementation(resolve);
    const { result, unmount } = renderHook(() => {
      return useLoad(callback, [], { fallback });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => () => {
      expect(callback).toBeCalledTimes(1);
      expect(fallback).toBeCalledTimes(1);
      expect(result.current.data).toBe("done");
    });

    unmount();
  });

  it("retry correctly", async () => {
    let count = 0;
    const callback = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (++count >= 6) {
            resolve("done");
          } else {
            reject(new Error("error"));
          }
        }, 1000);
      });
    });

    const { result, unmount } = renderHook(() =>
      useLoad(callback, [], {
        fallback: callback,
        retry: true,
        fallbackRetry: true,
      })
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());

    expect(callback).toBeCalledTimes(6);
    expect(result.current.data).toBe("done");

    unmount();
  });

  it("polling correctly", async () => {
    const callback = jest.fn().mockImplementation(resolve);
    const { result, unmount } = renderHook(() =>
      useLoad(callback, [], {
        polling: true,
        pollingInterval: 1000,
        pollingInPageHiding: true,
        pollingIntervalInPageHiding: 1000,
      })
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(2);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(3);
    expect(result.current.data).toBe("done");

    unmount();
  });

  it("cache correctly", async () => {
    const key = Symbol();
    renderHook(() => {
      const { cache } = CacheConfig.useConfig();
      useEffect(
        () => {
          cache.set(key, "cache");
        },
        [] // eslint-disable-line
      );
    });

    const callback = jest.fn().mockImplementation(resolve);
    const { result, unmount } = renderHook(() =>
      useLoad(callback, [], {
        cacheKey: key,
        cacheTime: Infinity,
        staleTime: Infinity,
      })
    );

    expect(result.current.data).toBe("cache");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => promise);
    expect(result.current.data).toBe("cache");

    act(() => {
      result.current.load();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(0);
    expect(result.current.data).toBe("cache");

    act(() => {
      result.current.force();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);
    expect(result.current.data).toBe("done");

    act(() => {
      result.current.reload();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);
    expect(result.current.data).toBe("done");

    act(() => {
      result.current.reload({ force: true });
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(2);
    expect(result.current.data).toBe("done");

    unmount();
  });
});

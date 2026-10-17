import { act } from "@testing-library/react";
import { LRUCache } from "lru-cache";
import { StrictMode } from "react";
import renderHook from "./helpers/renderHook";

import useCache from "../src/useCache";

function createCache() {
  return new LRUCache<any, any>({ max: 100 });
}

describe("useCache", () => {
  let fakeTimersInstalled = true;

  beforeEach(() => {
    // `LRUCache` measures TTLs with `performance.now()`, which jest does not fake by default.
    fakeTimersInstalled = true;
    jest.useFakeTimers({ doNotFake: ["nextTick", "setImmediate", "queueMicrotask"] });
  });
  afterEach(() => {
    if (fakeTimersInstalled) {
      jest.runOnlyPendingTimers();
    }
    jest.useRealTimers();
  });

  it("get default value", () => {
    const key = Symbol();
    const { result } = renderHook(() => useCache(key, { defaultValue: "default value" }));
    expect(result.current[0]).toBe("default value");
  });

  it("get cached data set by other hooks", () => {
    const cache = createCache();
    const key = Symbol();
    const { result: result0 } = renderHook(() => useCache(key, { cache }));
    act(() => {
      result0.current[1]("value");
    });

    const { result: result1 } = renderHook(() => useCache(key, { cache }));
    expect(result1.current[0]).toBe("value");
  });

  it("shares the default cache instance between hooks", () => {
    const key = Symbol();
    const { result: result0 } = renderHook(() => useCache(key));
    act(() => {
      result0.current[1]("value");
    });

    const { result: result1 } = renderHook(() => useCache(key));
    expect(result1.current[0]).toBe("value");
  });

  it("isolates the default cache from explicit cache instances", () => {
    const key = Symbol();
    const explicitCache = createCache();
    const { result: defaultResult } = renderHook(() => useCache(key));
    const { result: explicitResult } = renderHook(() => useCache(key, { cache: explicitCache }));

    act(() => {
      defaultResult.current[1]("default-value");
    });

    expect(explicitResult.current[0]).toBe(undefined);
    expect(explicitCache.has(key)).toBe(false);
  });

  it("delete cache via setCache(undefined)", () => {
    const cache = createCache();
    const key = Symbol();
    const { result } = renderHook(() => useCache(key, { cache }));
    act(() => {
      result.current[1]("value");
    });
    expect(cache.get(key)).toBe("value");

    act(() => {
      result.current[1](undefined);
    });
    expect(cache.has(key)).toBe(false);
  });

  it("falls back to the default cacheTime for NaN", () => {
    const cache = createCache();
    const key = Symbol();
    const { result } = renderHook(() => useCache(key, { cache, cacheTime: NaN }));

    act(() => {
      result.current[1]("value");
    });
    // The entry gets the default 5-minute TTL, not `LRUCache`'s "no expiry".
    expect(cache.getRemainingTTL(key)).toBeGreaterThan(0);
    expect(cache.getRemainingTTL(key)).toBeLessThanOrEqual(5 * 60 * 1000);
  });

  it("delete cache after cacheTime", async () => {
    // `LRUCache` captures its clock (`performance.now`) at module load, so
    // jest's fake timers cannot advance it; let the entry age for real.
    fakeTimersInstalled = false;
    jest.useRealTimers();
    const cache = createCache();
    const key = Symbol();
    const { result } = renderHook(() => useCache(key, { cache, cacheTime: 100 }));

    act(() => {
      result.current[1]("value");
    });
    expect(cache.get(key)).toBe("value");

    await new Promise((resolve) => setTimeout(resolve, 110));

    expect(cache.get(key)).toBe(undefined);

    const { result: newResult } = renderHook(() => useCache(key, { cache }));
    expect(newResult.current[0]).toBe(undefined);
  });

  it("expires on the next read with a non-positive cacheTime", async () => {
    // `LRUCache` treats `ttl: 0` as "never expires", so the hook normalizes
    // non-positive `cacheTime` values to 1 ms to keep the v1 semantics.
    fakeTimersInstalled = false;
    jest.useRealTimers();
    const cache = createCache();
    const key = Symbol();
    const { result: writer } = renderHook(() => useCache(key, { cache, cacheTime: 0 }));

    act(() => {
      writer.current[1]("value");
    });
    await new Promise((resolve) => setTimeout(resolve, 5));

    const { result: reader } = renderHook(() => useCache(key, { cache, defaultValue: "default" }));
    expect(reader.current[0]).toBe("default");
    expect(cache.has(key)).toBe(false);
  });

  it("sync data correctly", () => {
    const cache = createCache();
    const key = Symbol();
    const { result: result0 } = renderHook(() => useCache(key, { cache }));
    const { result: result1 } = renderHook(() => useCache(key, { cache, cacheSync: false }));
    const { result: result2 } = renderHook(() => useCache(key, { cache, cacheSync: true }));
    const { result: result3 } = renderHook(() => useCache(key, { cache, cacheSync: { set: true } }));
    const { result: result4 } = renderHook(() => useCache(key, { cache, cacheSync: { delete: true } }));
    const { result: result5 } = renderHook(() => useCache(key, { cache, cacheSync: { set: true, delete: true } }));

    act(() => {
      result0.current[1]("value");
    });
    expect(result1.current[0]).toBe(undefined);
    expect(result2.current[0]).toBe("value");
    expect(result3.current[0]).toBe("value");
    expect(result4.current[0]).toBe(undefined);
    expect(result5.current[0]).toBe("value");

    act(() => {
      result0.current[1](undefined);
    });
    expect(result1.current[0]).toBe(undefined);
    expect(result2.current[0]).toBe(undefined);
    expect(result3.current[0]).toBe("value");
    expect(result4.current[0]).toBe(undefined);
    expect(result5.current[0]).toBe(undefined);
  });

  it("validate cache data correctly", () => {
    const cache = createCache();
    const key = Symbol();
    const validate = (value: any) => value === "valid";
    const { result, unmount } = renderHook(() =>
      useCache(key, { cache, defaultValue: "default", validate, cacheSync: true }),
    );

    expect(result.current[0]).toBe("default");
    act(() => {
      result.current[1]("invalid");
    });
    expect(result.current[0]).toBe("default");
    act(() => {
      result.current[1]("valid");
    });
    expect(result.current[0]).toBe("valid");
    unmount();
  });

  it("call onSet and onDelete", () => {
    const cache = createCache();
    const key = Symbol();
    const onSet = jest.fn();
    const onDelete = jest.fn();
    const { result } = renderHook(() => useCache(key, { cache, onSet, onDelete }));

    act(() => {
      result.current[1]("value");
    });
    expect(onSet).toHaveBeenCalledWith("value");

    act(() => {
      result.current[1](undefined);
    });
    expect(onDelete).toHaveBeenCalledWith("value");
  });

  it("notify subscribers when an expired entry is read", async () => {
    fakeTimersInstalled = false;
    jest.useRealTimers();
    const cache = createCache();
    const key = Symbol();
    const onDelete = jest.fn();
    const { result: writer } = renderHook(() => useCache(key, { cache, cacheTime: 100 }));
    renderHook(() => useCache(key, { cache, onDelete }));

    act(() => {
      writer.current[1]("value");
    });

    await new Promise((resolve) => setTimeout(resolve, 110));

    // Reading the expired entry lazily removes it and notifies subscribers.
    const { result: reader } = renderHook(() => useCache(key, { cache }));
    expect(reader.current[0]).toBe(undefined);
    expect(onDelete).toHaveBeenCalledWith("value");
    expect(cache.has(key)).toBe(false);
  });

  it("notifies subscribers only once for an expired entry under StrictMode", async () => {
    fakeTimersInstalled = false;
    jest.useRealTimers();
    const cache = createCache();
    const key = Symbol();
    const onDelete = jest.fn();
    const { result: writer } = renderHook(() => useCache(key, { cache, cacheTime: 100 }));
    renderHook(() => useCache(key, { cache, onDelete }));

    act(() => {
      writer.current[1]("value");
    });

    await new Promise((resolve) => setTimeout(resolve, 110));

    // Removing the expired entry is deferred to the mount effect, so the
    // double effect invocation under StrictMode is idempotent and notifies
    // subscribers exactly once.
    const { result: reader } = renderHook(() => useCache(key, { cache }), { wrapper: StrictMode });
    expect(reader.current[0]).toBe(undefined);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith("value");
    expect(cache.has(key)).toBe(false);
  });

  it("refresh data when key changes", () => {
    // The hook intentionally warns about a mutable `key` on change
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const cache = createCache();
    const { result, rerender } = renderHook(({ key }) => useCache(key, { cache }), {
      initialProps: { key: "key0" },
    });

    act(() => {
      result.current[1]("value0");
    });
    rerender({ key: "key1" });
    expect(result.current[0]).toBe(undefined);

    act(() => {
      result.current[1]("value1");
    });
    rerender({ key: "key0" });
    expect(result.current[0]).toBe("value0");
    errorSpy.mockRestore();
  });
});

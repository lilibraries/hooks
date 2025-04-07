import { CacheConfig, useCache } from "@lilib/hooks";
import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

describe("useCache", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("get default value", () => {
    const key = Symbol();
    const { result } = renderHook(() =>
      useCache(key, { defaultValue: "default value" })
    );
    expect(result.current[0]).toBe("default value");
  });

  it("delete cache after `cacheTime`", () => {
    const key = Symbol();
    const { result: configRef } = renderHook(() => CacheConfig.useConfig());
    const { result: cacheRef } = renderHook(() =>
      useCache(key, { cacheTime: 100 })
    );

    expect(configRef.current.cache.get(key)).toBe(undefined);
    act(() => {
      cacheRef.current[1]("value");
    });
    expect(configRef.current.cache.get(key)).toBe("value");
    jest.advanceTimersByTime(100);
    expect(configRef.current.cache.get(key)).toBe(undefined);

    const { result: newCacheRef } = renderHook(() => useCache(key));
    expect(newCacheRef.current[0]).toBe(undefined);
  });

  it("sync data correctly", () => {
    const key = Symbol();
    const { result: result0 } = renderHook(() => useCache(key));
    const { result: result1 } = renderHook(() =>
      useCache(key, { cacheSync: false })
    );
    const { result: result2 } = renderHook(() =>
      useCache(key, { cacheSync: true })
    );
    const { result: result3 } = renderHook(() =>
      useCache(key, { cacheSync: { set: true } })
    );
    const { result: result4 } = renderHook(() =>
      useCache(key, { cacheSync: { delete: true } })
    );
    const { result: result5 } = renderHook(() =>
      useCache(key, { cacheSync: { set: true, delete: true } })
    );

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

  it("validate cache data correctly", async () => {
    const key = Symbol();
    const validate = (value: any) => value === "valid";
    const { result, unmount } = renderHook(() =>
      useCache(key, { defaultValue: "default", validate, cacheSync: true })
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
});

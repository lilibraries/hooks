import MemoryCache from "../../src/utils/MemoryCache";
import EventEmitter from "../../src/utils/EventEmitter";

describe("utils/MemoryCache", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("has static properties", () => {
    expect(MemoryCache.DEFAULT_MAX_LISTENERS).toBeGreaterThan(0);
    expect(MemoryCache.DEFAULT_CACHE_TIME).toBeGreaterThan(0);
    expect(MemoryCache.DEFAULT_MAX_CACHE_TIME).toBe(Number.MAX_SAFE_INTEGER);
  });

  it("extends EventEmitter", () => {
    expect(new MemoryCache()).toBeInstanceOf(EventEmitter);
  });

  it("check key and data correctly", () => {
    const cache = new MemoryCache();

    expect(() => {
      cache._checkCacheKey("key");
      cache._checkCacheKey({});
      cache._checkCacheKey(() => {});
      cache._checkCacheData({});
      cache._checkCacheData([]);
    }).not.toThrow();

    const validKey = "key";
    const invalidKey: any = undefined;
    const validData = {};
    const invalidData = undefined;

    [
      () => cache._checkCacheKey(null),
      () => cache._checkCacheKey(undefined),
      () => cache._checkCacheData(undefined),
      () => cache.memorize(invalidKey, validData),
      () => cache.memorize(validKey, invalidData),
      () => cache.set(invalidKey, validData),
      () => cache.set(validKey, invalidData),
    ].forEach((callback) => {
      expect(callback).toThrow(TypeError);
    });
  });

  it("trigger ready event correctly", () => {
    const handler = jest.fn();
    const cache = new MemoryCache();
    cache.on("ready", handler);
    expect(cache.isReady()).toBe(true);
    cache.asReady();
    expect(handler).toBeCalledTimes(0);
    cache._ready = false;
    cache.asReady();
    expect(handler).toBeCalledTimes(1);
    cache.asReady();
    expect(handler).toBeCalledTimes(1);
  });

  it("some methods should return this", () => {
    const cache = new MemoryCache();
    expect(cache.asReady()).toBe(cache);
    expect(cache.setMaxCacheTime(1)).toBe(cache);
    expect(cache.setDefaultCacheTime(1)).toBe(cache);
    expect(cache.memorize("key", "data")).toBe(cache);
    expect(cache.set("key", "data")).toBe(cache);
    expect(cache.delete("key")).toBe(cache);
    expect(cache.clear()).toBe(cache);
  });

  it("memorize data correctly and do not trigger events", () => {
    const cache = new MemoryCache();
    const handler = jest.fn();
    const key = "key";
    const data = { value: "value" };

    cache.on("set", handler);
    cache.on("clear", handler);
    cache.on("delete", handler);
    cache.for(key).on("set", handler);
    cache.for(key).on("delete", handler);

    cache.memorize(key, data);
    expect(cache.get(key)).toBe(data);
    cache.memorize(key, data, { cacheTime: 0 });
    expect(cache.get(key)).toBe(undefined);
    cache.memorize(key, data);
    expect(cache.get(key)).toBe(data);
    cache.memorize(key, data, {
      cacheTimestamp: Date.now() - MemoryCache.DEFAULT_CACHE_TIME,
    });
    expect(cache.get(key)).toBe(undefined);
    cache.memorize(key, data, {
      cacheTime: 1,
      cacheTimestamp: Date.now(),
    });
    expect(cache.get(key)).toBe(data);
    expect(handler).not.toBeCalled();
  });

  it("operate cache correctly", () => {
    const cache = new MemoryCache();
    const key = "key";
    const data = { value: "value" };

    cache.set(key, data);
    expect(cache.get(key)).toBe(data);
    cache.set(key, data, { cacheTime: 0 });
    expect(cache.get(key)).toBe(undefined);
    expect(cache.has(key)).toBe(false);
    expect(cache.getCacheTime(key)).toBe(undefined);
    expect(cache.getCacheTimestamp(key)).toBe(undefined);
    const now = Date.now();
    cache.set(key, data);
    expect(cache.get(key)).toBe(data);
    expect(cache.has(key)).toBe(true);
    expect(cache.getCacheTime(key)).toBe(MemoryCache.DEFAULT_CACHE_TIME);
    expect(cache.getCacheTimestamp(key)).toBeGreaterThanOrEqual(now);
    cache.delete(key);
    expect(cache.has(key)).toBe(false);
    cache.set(key, data);
    expect(cache.has(key)).toBe(true);
    cache.clear();
    expect(cache.has(key)).toBe(false);
  });

  it("trigger events correctly", () => {
    const cache = new MemoryCache();
    const key = "key";
    const data = { value: "value" };

    let callbackKey: any;
    let callbackData: any;
    let callbackDataForKey: any;
    const setHandler = jest.fn().mockImplementation((key: any, data: any) => {
      callbackKey = key;
      callbackData = data;
    });
    const deleteHandler = jest
      .fn()
      .mockImplementation((key: any, data: any) => {
        callbackKey = key;
        callbackData = data;
      });
    const clearHandler = jest.fn();
    const setForkeyHandler = jest.fn().mockImplementation((data: any) => {
      callbackDataForKey = data;
    });
    const deleteForKeyHandler = jest.fn().mockImplementation((data: any) => {
      callbackDataForKey = data;
    });

    cache.on("set", setHandler);
    cache.on("delete", deleteHandler);
    cache.on("clear", clearHandler);
    cache.for(key).on("set", setForkeyHandler);
    cache.for(key).on("delete", deleteForKeyHandler);
    cache.set(key, data);

    expect(setHandler).toBeCalledTimes(1);
    expect(setForkeyHandler).toBeCalledTimes(1);
    expect(callbackKey).toBe(key);
    expect(callbackData).toBe(data);
    expect(callbackDataForKey).toBe(data);
    callbackKey = undefined;
    callbackData = undefined;
    callbackDataForKey = undefined;

    cache.delete("non-exited key");
    cache.delete(key);
    expect(deleteHandler).toBeCalledTimes(1);
    expect(deleteForKeyHandler).toBeCalledTimes(1);
    expect(callbackKey).toBe(key);
    expect(callbackData).toBe(data);
    expect(callbackDataForKey).toBe(data);
    callbackKey = undefined;
    callbackData = undefined;
    callbackDataForKey = undefined;

    cache.set(key, data);
    cache.clear();
    expect(clearHandler).toBeCalledTimes(1);
    expect(setHandler).toBeCalledTimes(2);
    expect(setForkeyHandler).toBeCalledTimes(2);
    expect(deleteHandler).toBeCalledTimes(2);
    expect(deleteForKeyHandler).toBeCalledTimes(2);

    cache.set(key, data);
    cache.set(key, data, { cacheTime: -1 });
    expect(clearHandler).toBeCalledTimes(1);
    expect(setHandler).toBeCalledTimes(3);
    expect(setForkeyHandler).toBeCalledTimes(3);
    expect(deleteHandler).toBeCalledTimes(3);
    expect(deleteForKeyHandler).toBeCalledTimes(3);
  });

  it("should auto delete after cache time", () => {
    const cache = new MemoryCache();

    cache.memorize("key", "data");
    expect(cache.get("key")).toBe("data");
    jest.advanceTimersByTime(MemoryCache.DEFAULT_CACHE_TIME);
    expect(cache.get("key")).toBe(undefined);

    cache.memorize("key", "data", { cacheTime: 1 });
    cache.memorize("key", "data", { cacheTime: 2 });
    jest.advanceTimersByTime(1);
    expect(cache.get("key")).toBe("data");
    jest.advanceTimersByTime(1);
    expect(cache.get("key")).toBe(undefined);

    cache.memorize("key", "data", { cacheTime: 1 });
    expect(jest.getTimerCount()).toBe(1);
    cache.memorize("key", "data", { cacheTime: 0 });
    expect(jest.getTimerCount()).toBe(0);
    expect(cache.get("key")).toBe(undefined);

    cache.set("key", "data");
    expect(cache.get("key")).toBe("data");
    jest.advanceTimersByTime(MemoryCache.DEFAULT_CACHE_TIME);
    expect(cache.get("key")).toBe(undefined);

    cache.set("key", "data", { cacheTime: 1 });
    cache.set("key", "data", { cacheTime: 2 });
    jest.advanceTimersByTime(1);
    expect(cache.get("key")).toBe("data");
    jest.advanceTimersByTime(1);
    expect(cache.get("key")).toBe(undefined);

    cache.set("key", "data", { cacheTime: 1 });
    expect(jest.getTimerCount()).toBe(1);
    cache.set("key", "data", { cacheTime: 0 });
    expect(jest.getTimerCount()).toBe(0);
    expect(cache.get("key")).toBe(undefined);
  });

  it("should set default cache time correctly", () => {
    const cache = new MemoryCache();
    expect(cache.getDefaultCacheTime()).toBe(MemoryCache.DEFAULT_CACHE_TIME);
    cache.setDefaultCacheTime(10);
    cache.set("key", "data");
    expect(cache.get("key")).toBe("data");
    jest.advanceTimersByTime(10);
    expect(cache.get("key")).toBe(undefined);
  });

  it("should set max cache time correctly", () => {
    const cache = new MemoryCache();
    expect(cache.getMaxCacheTime()).toBe(MemoryCache.DEFAULT_MAX_CACHE_TIME);
    cache.setMaxCacheTime(10);
    cache.set("key", "data", { cacheTime: 11 });
    expect(jest.getTimerCount()).toBe(0);
  });

  it("should set max listeners correctly", () => {
    const cache = new MemoryCache();
    cache.setMaxListeners(10);

    let error: Error = new Error();
    const warn = jest.fn().mockImplementation((e: Error) => {
      error = e;
    });
    jest.spyOn(console, "error").mockImplementation(warn);

    const key = Symbol("key");
    let i = 1;
    for (; i <= 10; i++) {
      cache.for(key).on("set", () => {});
    }
    expect(warn).toBeCalledTimes(0);
    cache.for(key).on("set", () => {});
    expect(warn).toBeCalledTimes(1);
    expect(error.name).toBe("Warning(MemoryCache)");
    expect(error.message).toBe(
      "Listened to more than 10 `set` events for `Symbol(key)`, which may lead to memory leaks."
    );
    warn.mockReset();
  });
});

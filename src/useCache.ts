import { useDebugValue, useEffect } from "react";
import warning from "warning";
import { LRUCache } from "lru-cache";

import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import { getCacheEmitter, getDefaultCache } from "./utils/cache";

interface CacheHookOptions<T> {
  /** Default value when the cache value does not exist. */
  defaultValue?: T;
  /** Cache instance. If not specified, a shared internal instance is used. */
  cache?: LRUCache<any, any>;
  /** Cache time in milliseconds. Default is 5 minutes. Set `Infinity` for a permanent cache. */
  cacheTime?: number;
  /** Synchronize data between components on set and/or delete. Default is `false`. */
  cacheSync?: boolean | { set?: boolean; delete?: boolean };
  /** Validate the cache value. If it returns falsy, the `defaultValue` will be used. */
  validate?: (value: any) => boolean;
  /** Data set event. The `value` param will not be validated by the `validate` function. */
  onSet?: (value: any) => void;
  /** Data delete event. The `value` param will not be validated by the `validate` function. */
  onDelete?: (value: any) => void;
}

const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

/**
 * Cache data for a certain period of time, and synchronize data in different
 * components sharing the same `LRUCache` instance. Pass a cache instance
 * created with [`lru-cache`](https://github.com/isaacs/node-lru-cache) via
 * `options.cache`, otherwise a shared internal instance is used.
 *
 * @param key Cache key. Any value except `null` and `undefined`.
 * @param options Options object.
 * @returns Returns a `[value, setCache]` tuple. Passing `undefined` to
 *   `setCache` deletes the cache.
 */
function useCache<T>(
  key: NonNullable<unknown>,
  options: CacheHookOptions<T> & { defaultValue: T },
): readonly [T, (newValue: T | undefined) => void];

function useCache<T>(
  key: NonNullable<unknown>,
  options?: CacheHookOptions<T>,
): readonly [T | undefined, (newValue: T | undefined) => void];

function useCache<T>(key: NonNullable<unknown>, options: CacheHookOptions<T> = {}) {
  const { defaultValue, validate, onSet, onDelete } = options;
  const cache = options.cache ?? getDefaultCache();
  // `LRUCache` treats `ttl: 0` as "never expires" (and `NaN` silently behaves
  // the same), while a non-positive `cacheTime` meant "expire immediately" in
  // v1. Normalize finite values to a minimum of 1 ms (so they expire on the
  // next read), keep `Infinity` as-is, and fall back to the default for `NaN`.
  const cacheTime =
    options.cacheTime === undefined || Number.isNaN(options.cacheTime)
      ? DEFAULT_CACHE_TIME
      : Math.max(options.cacheTime, 1);
  const cacheSync = options.cacheSync ?? false;

  let cacheSyncOnSet = false;
  let cacheSyncOnDelete = false;

  if (cacheSync === true) {
    cacheSyncOnSet = true;
    cacheSyncOnDelete = true;
  } else if (cacheSync) {
    cacheSyncOnSet = !!cacheSync.set;
    cacheSyncOnDelete = !!cacheSync.delete;
  }

  // `LRUCache` expires entries lazily: `peek`/`get` hide (and `get` removes)
  // expired entries. Peek with `allowStale` plus the remaining TTL detects
  // the expiry ourselves, so subscribers can be notified of the deletion.
  const peekExpiredEntry = () => {
    const staleData = cache.peek(key, { allowStale: true });
    return staleData !== undefined && cache.getRemainingTTL(key) <= 0 ? staleData : undefined;
  };

  const readCacheValue = (cachedData: any) => {
    if (cachedData === undefined) {
      return defaultValue;
    }
    if (validate) {
      return validate(cachedData) ? cachedData : defaultValue;
    }
    return cachedData;
  };

  // The render-phase read must stay pure: an expired entry is reported as
  // missing but left in place, and is removed (with a `delete` event) by
  // `getCachedData` inside effects instead. `peek` is also a pure read,
  // unlike `get` which updates the entry's recency.
  const readCachedDataForRender = () => {
    return peekExpiredEntry() !== undefined ? defaultValue : readCacheValue(cache.peek(key));
  };

  const getCachedData = () => {
    const expiredData = peekExpiredEntry();
    if (expiredData !== undefined) {
      cache.delete(key);
      getCacheEmitter(cache).for(key).emit("delete", expiredData);
      return defaultValue;
    }
    return readCacheValue(cache.get(key));
  };

  const [value, setValue] = useSafeState(readCachedDataForRender);
  const setCache = usePersist((newValue: T | undefined) => {
    if (newValue === undefined) {
      if (cache.has(key)) {
        const oldValue = cache.peek(key);
        cache.delete(key);
        getCacheEmitter(cache).for(key).emit("delete", oldValue);
      }
    } else {
      cache.set(key, newValue, { ttl: cacheTime });
      getCacheEmitter(cache).for(key).emit("set", newValue);
    }
  });

  // Remove an expired entry once mounted and notify subscribers, because the
  // initial read only reports it as missing. Deferring the removal here keeps
  // the render phase pure, and StrictMode's double invocation is idempotent:
  // the second run finds no entry.
  const removeExpiredEntry = usePersist(() => {
    getCachedData();
  });

  useEffect(() => {
    removeExpiredEntry();
  }, [removeExpiredEntry]);

  const shouldHandleSet = !!onSet || cacheSyncOnSet;
  const shouldHandleDelete = !!onDelete || cacheSyncOnDelete;

  const handleSet = usePersist((data: T) => {
    if (cacheSyncOnSet) {
      setValue(getCachedData());
    }
    if (onSet) {
      onSet(data);
    }
  });
  const handleDelete = usePersist((data: T) => {
    if (cacheSyncOnDelete) {
      setValue(getCachedData());
    }
    if (onDelete) {
      onDelete(data);
    }
  });

  useEffect(() => {
    if (shouldHandleSet) {
      const emitter = getCacheEmitter(cache).for(key);
      emitter.on("set", handleSet);
      return () => {
        emitter.off("set", handleSet);
      };
    }
  }, [key, cache, shouldHandleSet, handleSet]);

  useEffect(() => {
    if (shouldHandleDelete) {
      const emitter = getCacheEmitter(cache).for(key);
      emitter.on("delete", handleDelete);
      return () => {
        emitter.off("delete", handleDelete);
      };
    }
  }, [key, cache, shouldHandleDelete, handleDelete]);

  useUpdate(() => {
    setValue(getCachedData());
  }, [key, cache]);

  // `key` must be immutable; warn when it changes to avoid corrupting shared state
  useUpdate(() => {
    warning(false, "[useCache] You should provide an immutable value for the `key` option.");
  }, [key]);

  useDebugValue(value);

  return [value, setCache] as const;
}

export default useCache;

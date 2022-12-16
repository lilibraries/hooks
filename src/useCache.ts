import { useDebugValue, useEffect } from "react";
import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import { CacheInterface, useCacheConfig } from "./configs/CacheConfig";

export interface CacheHookOptions<T> {
  defaultValue?: T;
  cache?: CacheInterface;
  cacheTime?: number;
  cacheSync?: boolean | { set?: boolean; delete?: boolean };
  validate?: (value: any) => boolean;
  onSet?: (value: any) => void;
  onDelete?: (value: any) => void;
}

function useCache<T>(
  key: {},
  options: CacheHookOptions<T> & { defaultValue: T }
): readonly [T, (newValue: T | undefined) => void];

function useCache<T>(
  key: {},
  options?: CacheHookOptions<T>
): readonly [T | undefined, (newValue: T | undefined) => void];

function useCache<T>(key: {}, options: CacheHookOptions<T> = {}) {
  const config = useCacheConfig();
  const { defaultValue, validate, onSet, onDelete } = options;

  const cache = options.cache ?? config.cache;
  const cacheTime = options.cacheTime ?? config.cacheTime;
  const cacheSync = options.cacheSync ?? config.cacheSync;

  let cacheSyncOnSet = false;
  let cacheSyncOnDelete = false;

  if (cacheSync === true) {
    cacheSyncOnSet = true;
    cacheSyncOnDelete = true;
  } else if (cacheSync) {
    cacheSyncOnSet = !!cacheSync.set;
    cacheSyncOnDelete = !!cacheSync.delete;
  }

  const getCachedData = () => {
    const cachedData = cache.get(key);
    if (cachedData !== undefined) {
      if (validate) {
        return validate(cachedData) ? cachedData : defaultValue;
      } else {
        return cachedData;
      }
    } else {
      return defaultValue;
    }
  };

  const [value, setValue] = useSafeState(getCachedData);
  const setCache = usePersist((newValue: T | undefined) => {
    if (newValue === undefined) {
      cache.delete(key);
    } else {
      cache.set(key, newValue, { cacheTime });
    }
  });

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
      cache.for(key).on("set", handleSet);
      return () => {
        cache.for(key).off("set", handleSet);
      };
    }
  }, [key, cache, shouldHandleSet, handleSet]);

  useEffect(() => {
    if (shouldHandleDelete) {
      cache.for(key).on("delete", handleDelete);
      return () => {
        cache.for(key).off("delete", handleDelete);
      };
    }
  }, [key, cache, shouldHandleDelete, handleDelete]);

  useUpdate(() => {
    setValue(getCachedData());
  }, [key, cache]);

  useDebugValue(value);

  return [value, setCache] as const;
}

export default useCache;

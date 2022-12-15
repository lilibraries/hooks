import { useCallback, useDebugValue, useEffect } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import usePersist from "./usePersist";
import useMemoizedValue from "./useMemoizedValue";
import { CacheInterface, useCacheConfig } from "./configs/CacheConfig";

export interface CacheHookOptions<T> {
  defaultValue?: T;
  cache?: CacheInterface;
  cacheTime?: number;
  cacheSync?: boolean;
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

  const { validate, onSet, onDelete } = options;
  const { defaultValue: defaultValueOption } = options;
  const defaultValue = useMemoizedValue(defaultValueOption);

  const cache = options.cache ?? config.cache;
  const cacheTime = options.cacheTime ?? config.cacheTime;
  const cacheSync = !!(options.cacheSync ?? config.cacheSync);

  const subscribe = useCallback(
    (listener: () => void) => {
      if (cacheSync) {
        cache.for(key).on("set", listener);
        return () => {
          cache.for(key).off("set", listener);
        };
      } else {
        return () => {};
      }
    },
    [key, cache, cacheSync]
  );
  const getSnapshot = useCallback(
    () => {
      const cachedData = cache.get(key) as T | undefined;
      if (cachedData !== undefined) {
        if (validate) {
          return validate(cachedData) ? cachedData : defaultValue;
        } else {
          return cachedData;
        }
      } else {
        return defaultValue;
      }
    },
    [cache, key, defaultValue] // eslint-disable-line
  );

  const value = useSyncExternalStore(subscribe, getSnapshot);
  const setCache = usePersist((newValue: T | undefined) => {
    if (newValue === undefined) {
      cache.delete(key);
    } else {
      cache.set(key, newValue, { cacheTime });
    }
  });

  const shouldHandleSet = !!onSet;
  const shouldHandleDelete = !!onDelete;

  const handleSet = usePersist((data: T) => {
    if (onSet) {
      onSet(data);
    }
  });
  const handleDelete = usePersist((data: T) => {
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

  useDebugValue(value);

  return [value, setCache] as const;
}

export default useCache;

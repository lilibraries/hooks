import { useCallback, useEffect } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import usePersist from "./usePersist";
import useMemoizedValue from "./useMemoizedValue";
import { useCacheConfig } from "./configs/CacheConfig";

function useCache<T>(
  key: {},
  options: {
    defaultValue?: T;
    cacheTime?: number;
    cacheSync?: boolean;
    validate?: (value: T) => boolean;
    onSet?: (value: T) => void;
    onDelete?: (value: T) => void;
  } = {}
) {
  const config = useCacheConfig();
  const { cache } = config;
  const { validate, onSet, onDelete } = options;
  const { defaultValue: defaultValueOption } = options;
  const defaultValue = useMemoizedValue(defaultValueOption);
  const cacheTime = options.cacheTime ?? config.cacheTime;
  const cacheSync = !!(options.cacheSync ?? config.cacheSync);

  const subscribe = useCallback(
    (listener: () => void) => {
      if (cacheSync) {
        cache.on("set", listener);
        return () => {
          cache.off("set", listener);
        };
      } else {
        return () => {};
      }
    },
    [cache, cacheSync]
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

  const handleSet = usePersist((cacheKey: any, data: T) => {
    if (Object.is(cacheKey, key) && onSet) {
      onSet(data);
    }
  });
  const handleDelete = usePersist((cacheKey: any, data: T) => {
    if (Object.is(cacheKey, key) && onDelete) {
      onDelete(data);
    }
  });

  useEffect(
    () => {
      if (shouldHandleSet) {
        cache.on("set", handleSet);
        return () => {
          cache.off("set", handleSet);
        };
      }
    },
    [cache, shouldHandleSet] // eslint-disable-line
  );
  useEffect(
    () => {
      if (shouldHandleDelete) {
        cache.on("delete", handleDelete);
        return () => {
          cache.off("delete", handleDelete);
        };
      }
    },
    [cache, shouldHandleSet] // eslint-disable-line
  );

  return [value, setCache] as const;
}

export default useCache;

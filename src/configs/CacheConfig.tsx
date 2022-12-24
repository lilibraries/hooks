import React, {
  FC,
  useRef,
  ReactNode,
  useContext,
  useCallback,
  createContext,
  useDebugValue,
} from "react";
import omit from "lodash/omit";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { MemoryCache, mergeWithDefined } from "@lilib/utils";

export interface CacheInterface {
  has(key: any): boolean;
  get(key: any): any;
  set(key: any, data: any, options?: { cacheTime?: number }): any;
  delete(key: any): any;
  isReady(): boolean;
  once(name: "ready", listener: () => void): any;
  off(name: "ready", listener: () => void): any;
  for(key: any): {
    on(name: "set" | "delete", listener: (data: any) => void): any;
    off(name: "set" | "delete", listener: (data: any) => void): any;
  };
}

export interface CacheConfigValue {
  global: boolean;
  cache: CacheInterface;
  cacheTime: number;
  cacheSync: boolean | { set?: boolean; delete?: boolean };
  fallback?: ReactNode;
}

export interface CacheConfigProps extends Partial<CacheConfigValue> {
  inherit?: boolean;
  children?: ReactNode;
}

const globalVar: any = globalThis;
const GLOBAL_CACHE_ID = "__LILIB_HOOKS_GLOBAL_CACHE__";

const defaultValue = {
  global: false,
  cacheTime: 5 * 60 * 1000,
  cacheSync: false,
};

const CacheContext = createContext<CacheConfigValue>({
  ...defaultValue,
  cache: new MemoryCache(),
});
export const useCacheConfig = () => useContext(CacheContext);

const CacheConfig: FC<CacheConfigProps> & {
  Context: typeof CacheContext;
  useConfig: typeof useCacheConfig;
} = (props) => {
  const config = useCacheConfig();
  const cacheRef = useRef<CacheInterface>();
  let value = omit(props, "inherit", "children") as CacheConfigValue;

  if (props.inherit) {
    value = mergeWithDefined(config, value);
  } else {
    value = mergeWithDefined(defaultValue, value);
  }

  if (value.global && globalVar[GLOBAL_CACHE_ID]) {
    value.cache = globalVar[GLOBAL_CACHE_ID];
  }
  if (!value.cache) {
    if (!cacheRef.current) {
      cacheRef.current = new MemoryCache();
    }
    value.cache = cacheRef.current;
  }
  if (value.global && !globalVar[GLOBAL_CACHE_ID]) {
    globalVar[GLOBAL_CACHE_ID] = value.cache;
  }

  const cache = value.cache;
  const subscribe = useCallback(
    (listener: () => void) => {
      if (!cache.isReady()) {
        cache.once("ready", listener);
        return () => {
          cache.off("ready", listener);
        };
      } else {
        return () => {};
      }
    },
    [cache]
  );
  const getSnapshot = useCallback(() => {
    return cache.isReady();
  }, [cache]);
  const ready = useSyncExternalStore(subscribe, getSnapshot);

  useDebugValue(ready ? "Ready" : "Unready");
  useDebugValue(value);

  return (
    <CacheContext.Provider value={value}>
      {ready ? props.children : value.fallback}
    </CacheContext.Provider>
  );
};

CacheConfig.Context = CacheContext;
CacheConfig.useConfig = useCacheConfig;

export default CacheConfig;

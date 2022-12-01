import React, {
  FC,
  useRef,
  ReactNode,
  useContext,
  useCallback,
  createContext,
} from "react";
import omit from "lodash/omit";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import MemoryCache from "../utils/MemoryCache";

interface Cache {
  get(key: any): any;
  set(key: any, data: any, options?: { cacheTime?: number }): any;
  delete(key: any): any;
  isReady(): boolean;
  once(name: "ready", listener: () => void): any;
  off(name: "ready", listener: () => void): any;
  for(key: any): {
    on: (name: "set" | "delete", listener: (data: any) => void) => any;
    off: (name: "set" | "delete", listener: (data: any) => void) => any;
  };
}

interface Value {
  global: boolean;
  cache: Cache;
  cacheTime: number;
  cacheSync: boolean;
  fallback?: ReactNode;
}

interface Props extends Partial<Value> {
  inherit?: boolean;
  children?: ReactNode;
}

const globalVar: any = globalThis;
const GLOBAL_CACHE_ID = "__LILIB_HOOKS_GLOBAL_CACHE__";
const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

const CacheContext = createContext<Value>({
  global: false,
  cache: new MemoryCache(),
  cacheTime: DEFAULT_CACHE_TIME,
  cacheSync: false,
});
export const useCacheConfig = () => useContext(CacheContext);

const CacheConfig: FC<Props> & {
  Context: typeof CacheContext;
  useConfig: typeof useCacheConfig;
} = (props) => {
  const config = useCacheConfig();
  const cacheRef = useRef<Cache>();
  let value = omit(props, "inherit", "children") as Value;

  if (props.inherit) {
    value = { ...config, ...value };
  }
  if (value.global === undefined) {
    value.global = false;
  }
  if (value.cacheTime === undefined) {
    value.cacheTime = DEFAULT_CACHE_TIME;
  }
  if (value.cacheSync === undefined) {
    value.cacheSync = false;
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

  return (
    <CacheContext.Provider value={value}>
      {ready ? props.children : value.fallback}
    </CacheContext.Provider>
  );
};

CacheConfig.Context = CacheContext;
CacheConfig.useConfig = useCacheConfig;

export default CacheConfig;

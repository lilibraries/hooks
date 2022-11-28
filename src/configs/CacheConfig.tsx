import React, { createContext, FC, ReactNode, useContext } from "react";
import omit from "lodash/omit";
import MemoryCache from "../utils/MemoryCache";

interface Value {
  global: boolean;
  cache: MemoryCache;
  cacheTime: number;
  cacheSync: boolean;
  compare: (x: any, y: any) => boolean;
  validate?: (value: any) => boolean;
}

interface Props extends Partial<Value> {
  inherit?: boolean;
  children?: ReactNode;
}

const globalVar: any = globalThis;
const GLOBAL_CACHE_KEY = "__LILIB_HOOKS_GLOBAL_CACHE__";
const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

const CacheContext = createContext<Value>({
  global: false,
  cache: new MemoryCache(),
  cacheTime: DEFAULT_CACHE_TIME,
  cacheSync: false,
  compare: Object.is,
});
const useCacheConfig = () => useContext(CacheContext);

const CacheConfig: FC<Props> & {
  Context: typeof CacheContext;
  useConfig: typeof useCacheConfig;
} = (props) => {
  const config = useCacheConfig();
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
  if (value.compare === undefined) {
    value.compare = Object.is;
  }

  if (value.global && globalVar[GLOBAL_CACHE_KEY]) {
    value.cache = globalVar[GLOBAL_CACHE_KEY];
  }
  if (value.cache === undefined) {
    value.cache = new MemoryCache();
  }
  if (value.global && !globalVar[GLOBAL_CACHE_KEY]) {
    globalVar[GLOBAL_CACHE_KEY] = value.cache;
  }

  return (
    <CacheContext.Provider value={value}>
      {props.children}
    </CacheContext.Provider>
  );
};

CacheConfig.Context = CacheContext;
CacheConfig.useConfig = useCacheConfig;

export default CacheConfig;

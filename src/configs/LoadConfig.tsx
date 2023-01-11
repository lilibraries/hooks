import React, {
  FC,
  useRef,
  ReactNode,
  useContext,
  createContext,
  useDebugValue,
} from "react";
import omit from "lodash/omit";
import { EventEmitter, inBrowser, mergeWithDefined } from "@lilib/utils";

class LoadStore extends EventEmitter {
  _loadings = new Map<any, Function>();
  _reloaders = new Map<any, Function[]>();

  isLoading(key: any, loader?: Function) {
    if (loader) {
      return this._loadings.get(key) === loader;
    } else {
      return this._loadings.has(key);
    }
  }

  setLoading(key: any, loader: Function) {
    this._loadings.set(key, loader);
  }

  deleteLoading(key: any, loader?: Function) {
    if (loader) {
      if (this._loadings.get(key) === loader) {
        this._loadings.delete(key);
      }
    } else {
      this._loadings.delete(key);
    }
  }

  getReloaders(key: any) {
    return this._reloaders.get(key) || [];
  }

  addReloader(key: any, reloader: Function) {
    const reloaders = this._reloaders.get(key);
    if (reloaders) {
      if (!reloaders.includes(reloader)) {
        reloaders.push(reloader);
      }
    } else {
      this._reloaders.set(key, [reloader]);
    }
  }

  removeReloader(key: any, reloader: Function) {
    const reloaders = this._reloaders.get(key);
    if (reloaders) {
      const lastIndex = reloaders.lastIndexOf(reloader);
      if (lastIndex >= 0) {
        reloaders.splice(lastIndex, 1);
      }
      if (!reloaders.length) {
        this._reloaders.delete(key);
      }
    }
  }
}

export interface LoadStoreInterface {
  isLoading(key: any, loader?: Function): boolean;
  setLoading(key: any, loader: Function): any;
  deleteLoading(key: any, loader?: Function): any;
  getReloaders(key: any): Function[];
  addReloader(key: any, reloader: Function): any;
  removeReloader(key: any, reloader: Function): any;
  for(key: any): {
    on(name: "cancel", listener: () => void): any;
    on(name: "success", listener: (data: any) => void): any;
    on(name: "failure", listener: (error: any) => void): any;
    off(name: "cancel", listener: () => void): any;
    off(name: "success", listener: (data: any) => void): any;
    off(name: "failure", listener: (error: any) => void): any;
    emit(name: "cancel"): any;
    emit(name: "success", data: any): any;
    emit(name: "failure", error: any): any;
  };
}

export interface LoadSharedOptions {
  cacheTime?: number;
  staleTime?: number;
  retry?: boolean;
  retryLimit?: number;
  retryInterval?: number | ((count: number) => number);
  fallbackRetry?: boolean;
  fallbackRetryLimit?: number;
  fallbackRetryInterval?: number | ((count: number) => number);
  polling?: boolean;
  pollingInterval?: number;
  pollingInPageHiding?: boolean;
  pollingIntervalInPageHiding?: number;
  autoReloadWaitTime?: number;
  autoReloadOnPageShow?: boolean;
  autoReloadOnWindowFocus?: boolean;
  autoReloadOnNetworkReconnect?: boolean;
}

export interface LoadConfigValue extends Required<LoadSharedOptions> {
  global: boolean;
  store: LoadStoreInterface;
  onSuccess?: (data: any, key?: {}) => void;
  onFailure?: (error: any, key?: {}) => void;
  onFinally?: (key?: {}) => void;
  handleSuccess?: (data: any, key?: {}) => void;
  handleFailure?: (error: any, key?: {}) => void;
  handleFinally?: (key?: {}) => void;
}

export interface LoadConfigProps
  extends Omit<Partial<LoadConfigValue>, "store"> {
  inherit?: boolean;
  children?: ReactNode;
}

const GLOBAL_LOAD_STORE_ID = "__LILIB_HOOKS_GLOBAL_LOAD_STORE__";

const defaultValue = {
  global: false,
  cacheTime: 5 * 60 * 1000,
  staleTime: 0,
  retry: false,
  retryLimit: 3,
  retryInterval: 0,
  fallbackRetry: false,
  fallbackRetryLimit: 3,
  fallbackRetryInterval: 0,
  polling: false,
  pollingInterval: 30 * 1000,
  pollingInPageHiding: false,
  pollingIntervalInPageHiding: 60 * 1000,
  autoReloadWaitTime: 10 * 1000,
  autoReloadOnPageShow: false,
  autoReloadOnWindowFocus: false,
  autoReloadOnNetworkReconnect: false,
};

const LoadContext = createContext<LoadConfigValue>({
  ...defaultValue,
  store: new LoadStore(),
});
export const useLoadConfig = () => useContext(LoadContext);

const LoadConfig: FC<LoadConfigProps> & {
  Context: typeof LoadContext;
  useConfig: typeof useLoadConfig;
} = (props) => {
  const config = useLoadConfig();
  const storeRef = useRef<LoadStoreInterface>();
  let value = omit(props, "inherit", "children") as LoadConfigValue;

  if (props.inherit) {
    value = mergeWithDefined(config, value);
  } else {
    value = mergeWithDefined(defaultValue, value);
  }

  if (value.global && inBrowser && (window as any)[GLOBAL_LOAD_STORE_ID]) {
    value.store = (window as any)[GLOBAL_LOAD_STORE_ID];
  }
  if (!value.store) {
    if (!storeRef.current) {
      storeRef.current = new LoadStore();
    }
    value.store = storeRef.current;
  }
  if (value.global && inBrowser && !(window as any)[GLOBAL_LOAD_STORE_ID]) {
    (window as any)[GLOBAL_LOAD_STORE_ID] = value.store;
  }

  useDebugValue(value);

  return (
    <LoadContext.Provider value={value}>{props.children}</LoadContext.Provider>
  );
};

LoadConfig.Context = LoadContext;
LoadConfig.useConfig = useLoadConfig;

export default LoadConfig;

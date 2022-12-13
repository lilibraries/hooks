import React, {
  FC,
  useRef,
  ReactNode,
  useContext,
  createContext,
  useDebugValue,
} from "react";
import omit from "lodash/omit";
import EventEmitter from "../utils/EventEmitter";
import mergeWithDefined from "../utils/mergeWithDefined";

export class LoadStore extends EventEmitter {
  _loading = new Map<any, Function>();
  _reloaders = new Map<any, Function[]>();

  isLoading(key: any, loader?: Function) {
    if (loader) {
      return this._loading.get(key) === loader;
    } else {
      return this._loading.has(key);
    }
  }

  addLoading(key: any, loader: Function) {
    this._loading.set(key, loader);
  }

  removeLoading(key: any, loader?: Function) {
    if (loader) {
      if (this._loading.get(key) === loader) {
        this._loading.delete(key);
      }
    } else {
      this._loading.delete(key);
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
      let position = -1;
      for (let i = reloaders.length - 1; i >= 0; i--) {
        if (reloaders[i] === reloader) {
          position = i;
          break;
        }
      }
      if (position >= 0) {
        reloaders.splice(position, 1);
      }
      if (!reloaders.length) {
        this._reloaders.delete(key);
      }
    }
  }
}

export interface LoadSharedOptions {
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
  store: LoadStore;
  onSuccess?: (data: any, key?: {}) => void;
  onFailure?: (error: unknown, key?: {}) => void;
  onFinally?: (key?: {}) => void;
  handleSuccess?: (data: any, key?: {}) => void;
  handleFailure?: (error: unknown, key?: {}) => void;
  handleFinally?: (key?: {}) => void;
}

export interface LoadConfigProps
  extends Omit<Partial<LoadConfigValue>, "store"> {
  inherit?: boolean;
  children?: ReactNode;
}

const globalVar: any = globalThis;
const GLOBAL_LOAD_STORE_ID = "__LILIB_HOOKS_GLOBAL_LOAD_STORE__";

const defaultValue = {
  global: false,
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
  autoReloadWaitTime: 5 * 1000,
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
  const storeRef = useRef<LoadStore>();
  let value = omit(props, "inherit", "children") as LoadConfigValue;

  if (props.inherit) {
    value = mergeWithDefined(config, value);
  } else {
    value = mergeWithDefined(defaultValue, value);
  }

  if (value.global && globalVar[GLOBAL_LOAD_STORE_ID]) {
    value.store = globalVar[GLOBAL_LOAD_STORE_ID];
  }
  if (!value.store) {
    if (!storeRef.current) {
      storeRef.current = new LoadStore();
    }
    value.store = storeRef.current;
  }
  if (value.global && !globalVar[GLOBAL_LOAD_STORE_ID]) {
    globalVar[GLOBAL_LOAD_STORE_ID] = value.store;
  }

  useDebugValue(value);

  return (
    <LoadContext.Provider value={value}>{props.children}</LoadContext.Provider>
  );
};

LoadConfig.Context = LoadContext;
LoadConfig.useConfig = useLoadConfig;

export default LoadConfig;

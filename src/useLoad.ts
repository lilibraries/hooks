import "requestidlecallback";
import { DependencyList, useDebugValue, useEffect, useRef } from "react";
import isObject from "lodash/isObject";
import isFunction from "lodash/isFunction";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";
import useSetState from "./useSetState";
import useThrottle from "./useThrottle";
import useLatestRef from "./useLatestRef";
import useMountedRef from "./useMountedRef";
import useUnmountedRef from "./useUnmountedRef";
import { isPageVisible } from "./usePageVisible";
import warning from "./utils/warning";
import mergeWithDefined from "./utils/mergeWithDefined";
import { PromiseResolve } from "./utils/types";
import { useLoadConfig, LoadSharedOptions } from "./configs/LoadConfig";

export type LoadCallback = (...args: any[]) => Promise<any>;
export type LoadData<T extends LoadCallback> = PromiseResolve<ReturnType<T>>;

export interface LoadHookOptions<Callback extends LoadCallback>
  extends LoadSharedOptions {
  key?: {};
  idle?: boolean | IdleRequestOptions;
  imperative?: boolean;
  independent?: boolean;
  fallback?: Callback;
  initialData?: LoadData<Callback>;
  defaultParams?: Parameters<Callback>;
  onSuccess?: (data: LoadData<Callback>) => void;
  onFailure?: (error: unknown) => void;
  onFinally?: () => void;
}

interface Results<Callback extends LoadCallback> {
  data: LoadData<Callback> | undefined;
  error: unknown;
  loading: boolean;
  reloading: boolean;
  initializing: boolean;
  load: (...params: Parameters<Callback>) => ReturnType<Callback>;
  reload: () => void;
  update: (
    newData:
      | LoadData<Callback>
      | ((prevData?: LoadData<Callback>) => LoadData<Callback>)
  ) => void;
  cancel: () => void;
}

interface State<Data> {
  data: Data | undefined;
  error: unknown;
  loading: boolean;
  reloading: boolean;
  initializing: boolean;
}

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps: DependencyList = [],
  options: LoadHookOptions<Callback> = {}
): Readonly<Results<Callback>> {
  const { store, ...config } = useLoadConfig();
  const {
    key, // TODO:
    idle,
    imperative,
    independent, // TODO:
    fallback,
    initialData,
    defaultParams,
    retry,
    retryLimit,
    retryInterval,
    fallbackRetry,
    fallbackRetryLimit,
    fallbackRetryInterval,
    polling,
    pollingInterval,
    pollingInPageHiding,
    pollingIntervalInPageHiding,
    autoReloadWaitTime,
    autoReloadOnPageShow,
    autoReloadOnWindowFocus,
    autoReloadOnNetworkReconnect,
  } = mergeWithDefined(config, options);

  const [state, setState] = useSetState<State<LoadData<Callback>>>(() => {
    const loading = !imperative;
    const hasData = initialData !== undefined;
    return {
      data: initialData,
      error: null,
      loading,
      reloading: loading && hasData,
      initializing: loading && !hasData,
    };
  });

  const idRef = useRef(0);
  const paramsRef = useRef<Parameters<Callback>>();
  const idleTimerRef = useRef(0);
  const retryTimerRef = useRef(0);
  const pollingTimerRef = useRef(0);
  const allowAutoReloadRef = useRef(false);
  const mountedRef = useMountedRef();
  const unmountedRef = useUnmountedRef();
  const callbackRef = useLatestRef(callback);
  const fallbackRef = useLatestRef(fallback);

  const triggerSuccess = usePersist((data: LoadData<Callback>, key?: {}) => {
    if (options.onSuccess) {
      options.onSuccess(data);
    } else if (config.onSuccess) {
      config.onSuccess(data, key);
    }
    if (config.handleSuccess) {
      config.handleSuccess(data, key);
    }
  });

  const triggerFailure = usePersist((error: unknown, key?: {}) => {
    if (options.onFailure) {
      options.onFailure(error);
    } else if (config.onFailure) {
      config.onFailure(error, key);
    }
    if (config.handleFailure) {
      config.handleFailure(error, key);
    }
  });

  const triggerFinally = usePersist((key?: {}) => {
    if (options.onFinally) {
      options.onFinally();
    } else if (config.onFinally) {
      config.onFinally(key);
    }
    if (config.handleFinally) {
      config.handleFinally(key);
    }
  });

  const load = usePersist((...params: Parameters<Callback>) => {
    paramsRef.current = params;
    allowAutoReloadRef.current = true;
    const id = ++idRef.current;
    clearTimeout(retryTimerRef.current);
    clearTimeout(pollingTimerRef.current);
    cancelAutoReload();
    cancelIdleCallback(idleTimerRef.current);

    if (!mountedRef.current) {
      return new Promise(() => {}) as ReturnType<Callback>;
    }

    if (!state.loading) {
      setState({
        loading: true,
        reloading: state.data !== undefined,
        initializing: state.data === undefined,
      });
    }

    const handleFinally = () => {
      triggerFinally(key);
      if (allowAutoReloadRef.current) {
        if (isPageVisible()) {
          if (polling) {
            pollingTimerRef.current = +setTimeout(() => {
              if (id === idRef.current) {
                reload();
              }
            }, pollingInterval);
          }
        } else {
          if (pollingInPageHiding) {
            pollingTimerRef.current = +setTimeout(() => {
              if (id === idRef.current) {
                reload();
              }
            }, pollingIntervalInPageHiding);
          }
        }
      }
    };

    const handleSuccess = (data: LoadData<Callback>) => {
      if (id !== idRef.current) {
        return new Promise(() => {});
      }
      setState({
        data,
        error: null,
        loading: false,
        reloading: false,
        initializing: false,
      });
      triggerSuccess(data, key);
      handleFinally();
      return data;
    };

    const handleFailure = (error: unknown) => {
      if (id !== idRef.current) {
        return new Promise(() => {});
      }
      setState({
        error,
        loading: false,
        reloading: false,
        initializing: false,
      });
      triggerFailure(error, key);
      handleFinally();
      throw error;
    };

    return new Promise<LoadData<Callback>>((resolve, reject) => {
      let retryCount = 0;
      let fallbackInvoked = false;
      let fallbackRetryCount = 0;

      const handleReject = (error: unknown) => {
        if (id !== idRef.current) {
          return;
        }
        if (retry && ++retryCount <= retryLimit) {
          const delay = isFunction(retryInterval)
            ? retryInterval(retryCount)
            : retryInterval;
          if (delay > 0) {
            retryTimerRef.current = +setTimeout(() => {
              if (id === idRef.current) {
                callbackRef.current(...params).then(resolve, handleReject);
              }
            }, delay);
          } else {
            callbackRef.current(...params).then(resolve, handleReject);
          }
        } else if (fallbackRef.current && !fallbackInvoked) {
          fallbackInvoked = true;
          fallbackRef.current(...params).then(resolve, handleReject);
        } else if (
          fallbackRef.current &&
          fallbackInvoked &&
          fallbackRetry &&
          ++fallbackRetryCount <= fallbackRetryLimit
        ) {
          const delay = isFunction(fallbackRetryInterval)
            ? fallbackRetryInterval(fallbackRetryCount)
            : fallbackRetryInterval;
          if (delay > 0) {
            retryTimerRef.current = +setTimeout(() => {
              if (id === idRef.current) {
                if (fallbackRef.current) {
                  fallbackRef.current(...params).then(resolve, handleReject);
                } else {
                  reject(error);
                }
              }
            }, delay);
          } else {
            fallbackRef.current(...params).then(resolve, handleReject);
          }
        } else {
          reject(error);
        }
      };

      if (idle) {
        idleTimerRef.current = requestIdleCallback(
          () => {
            if (id === idRef.current) {
              callbackRef.current(...params).then(resolve, handleReject);
            }
          },
          isObject(idle) ? idle : undefined
        );
      } else {
        callbackRef.current(...params).then(resolve, handleReject);
      }
    }).then(handleSuccess, handleFailure) as ReturnType<Callback>;
  });

  const reload = usePersist(() => {
    const params = paramsRef.current || defaultParams;
    if (process.env.NODE_ENV !== "production") {
      warning(
        params === undefined,
        "You should provide params by setting `defaultParams` option or calling the `load(...params)` method.",
        { scope: "useLoad" }
      );
    }
    if (params) {
      load(...params);
    } else {
      // @ts-ignore
      load();
    }
  });

  const update = usePersist(
    (
      newData:
        | LoadData<Callback>
        | ((prevData?: LoadData<Callback>) => LoadData<Callback>)
    ) => {
      setState((prevState) => ({
        data: isFunction(newData) ? newData(prevState.data) : newData,
      }));
    }
  );

  const cancel = usePersist(() => {
    idRef.current++;
    allowAutoReloadRef.current = false;
    clearTimeout(retryTimerRef.current);
    clearTimeout(pollingTimerRef.current);
    cancelAutoReload();
    cancelIdleCallback(idleTimerRef.current);
    if (!unmountedRef.current && state.loading) {
      setState({ loading: false, reloading: false, initializing: false });
    }
  });

  const [autoReload, { cancel: cancelAutoReload }] = useThrottle(
    () => {
      if (allowAutoReloadRef.current && !state.loading) {
        reload();
      }
    },
    { wait: autoReloadWaitTime, leading: true, trailing: false }
  );

  useEffect(
    () => {
      if (autoReloadOnPageShow) {
        const listener = () => {
          if (isPageVisible()) {
            autoReload();
          }
        };
        document.addEventListener("visibilitychange", listener);
        return () => {
          document.removeEventListener("visibilitychange", listener);
        };
      }
    },
    [autoReloadOnPageShow] // eslint-disable-line
  );

  useEffect(
    () => {
      if (autoReloadOnWindowFocus) {
        window.addEventListener("focus", autoReload);
        return () => {
          window.removeEventListener("focus", autoReload);
        };
      }
    },
    [autoReloadOnWindowFocus] // eslint-disable-line
  );

  useEffect(
    () => {
      if (autoReloadOnNetworkReconnect) {
        window.addEventListener("online", autoReload);
        return () => {
          window.removeEventListener("online", autoReload);
        };
      }
    },
    [autoReloadOnNetworkReconnect] // eslint-disable-line
  );

  useEffect(() => {
    if (key != null) {
      store.addReloader(key, reload);
      return () => {
        store.removeReloader(key, reload);
      };
    }
  }, [key, store, reload]);

  useEffect(
    () => {
      if (!imperative) {
        reload();
      }
    },
    deps // eslint-disable-line
  );

  useUnmount(cancel);
  useDebugValue(state);

  return { ...state, load, reload, update, cancel } as const;
}

export default useLoad;

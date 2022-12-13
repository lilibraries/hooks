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
import warning from "./utils/warning";
import isPageVisible from "./utils/isPageVisible";
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
    key,
    idle,
    imperative,
    independent,
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
  const isAssociated = key != null && !independent;

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
  const canceledRef = useRef(true);
  const mountedRef = useMountedRef();
  const unmountedRef = useUnmountedRef();
  const callbackRef = useLatestRef(callback);
  const fallbackRef = useLatestRef(fallback);
  const loadingRef = useRef<{ key: any; store: typeof store }>();
  const unlistenRef = useRef<() => void>();

  const clearPending = usePersist(() => {
    idRef.current++;
    canceledRef.current = true;
    clearTimeout(retryTimerRef.current);
    clearTimeout(pollingTimerRef.current);
    cancelAutoReload();
    cancelIdleCallback(idleTimerRef.current);
    if (loadingRef.current) {
      const { key, store } = loadingRef.current;
      if (store.isLoading(key, load)) {
        store.for(key).emit("cancel");
        store.removeLoading(key, load);
      }
      loadingRef.current = undefined;
    }
    if (unlistenRef.current) {
      unlistenRef.current();
      unlistenRef.current = undefined;
    }
  });

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
    clearPending();
    paramsRef.current = params;
    canceledRef.current = false;

    if (!mountedRef.current) {
      return new Promise(() => {}) as ReturnType<Callback>;
    }

    if (isAssociated && !store.isLoading(key)) {
      store.addLoading(key, load);
      loadingRef.current = { key, store };
    }

    if (!state.loading) {
      setState({
        loading: true,
        reloading: state.data !== undefined,
        initializing: state.data === undefined,
      });
    }

    const id = idRef.current;
    const isCanceled = () => id !== idRef.current;

    const checkPolling = () => {
      if (!canceledRef.current) {
        if (isPageVisible()) {
          if (polling) {
            pollingTimerRef.current = +setTimeout(() => {
              if (!isCanceled()) {
                reload();
              }
            }, pollingInterval);
          }
        } else {
          if (pollingInPageHiding) {
            pollingTimerRef.current = +setTimeout(() => {
              if (!isCanceled()) {
                reload();
              }
            }, pollingIntervalInPageHiding);
          }
        }
      }
    };

    if (isAssociated && !store.isLoading(key, load)) {
      return new Promise<LoadData<Callback>>((resolve, reject) => {
        const unlisten = () => {
          unlistenRef.current = undefined;
          store.for(key).off("cancel", handleCancel);
          store.for(key).off("failure", handleReject);
          store.for(key).off("success", handleResolve);
        };

        const handleCancel = () => {
          unlisten();
          if (!isCanceled()) {
            reload();
          }
        };
        const handleResolve = (data: LoadData<Callback>) => {
          unlisten();
          if (!isCanceled()) {
            resolve(data);
          }
        };
        const handleReject = (error: unknown) => {
          unlisten();
          if (!isCanceled()) {
            reject(error);
          }
        };

        unlistenRef.current = unlisten;
        store.for(key).on("cancel", handleCancel);
        store.for(key).on("failure", handleReject);
        store.for(key).on("success", handleResolve);
      }).then(
        (data) => {
          if (isCanceled()) {
            return new Promise(() => {});
          }
          triggerSuccess(data, key);
          triggerFinally(key);
          checkPolling();
          return data;
        },

        (error) => {
          if (isCanceled()) {
            return new Promise(() => {});
          }
          triggerFailure(error, key);
          triggerFinally(key);
          checkPolling();
          throw error;
        }
      ) as ReturnType<Callback>;
    }

    return new Promise<LoadData<Callback>>((resolve, reject) => {
      let retryCount = 0;
      let fallbackInvoked = false;
      let fallbackRetryCount = 0;

      const handleReject = (error: unknown) => {
        if (isCanceled()) {
          return;
        }
        if (retry && ++retryCount <= retryLimit) {
          const delay = isFunction(retryInterval)
            ? retryInterval(retryCount)
            : retryInterval;
          if (delay > 0) {
            retryTimerRef.current = +setTimeout(() => {
              if (!isCanceled()) {
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
              if (!isCanceled()) {
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
            if (!isCanceled()) {
              callbackRef.current(...params).then(resolve, handleReject);
            }
          },
          isObject(idle) ? idle : undefined
        );
      } else {
        callbackRef.current(...params).then(resolve, handleReject);
      }
    }).then(
      (data) => {
        if (isCanceled()) {
          return new Promise(() => {});
        }
        const isCurrentLoading = store.isLoading(key, load);
        setState({
          data,
          error: null,
          loading: false,
          reloading: false,
          initializing: false,
        });
        triggerSuccess(data, key);
        if (isAssociated && isCurrentLoading) {
          store.for(key).emit("success", data);
          store.removeLoading(key, load);
        }
        triggerFinally(key);
        checkPolling();
        return data;
      },

      (error) => {
        if (isCanceled()) {
          return new Promise(() => {});
        }
        const isCurrentLoading = store.isLoading(key, load);
        setState({
          error,
          loading: false,
          reloading: false,
          initializing: false,
        });
        triggerFailure(error, key);
        if (isAssociated && isCurrentLoading) {
          store.for(key).emit("failure", error);
          store.removeLoading(key, load);
        }
        triggerFinally(key);
        checkPolling();
        throw error;
      }
    ) as ReturnType<Callback>;
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
    clearPending();
    if (!unmountedRef.current && state.loading) {
      setState({ loading: false, reloading: false, initializing: false });
    }
  });

  const [autoReload, { cancel: cancelAutoReload }] = useThrottle(
    () => {
      if (!canceledRef.current && !state.loading) {
        reload();
      }
    },
    { wait: autoReloadWaitTime, leading: true, trailing: false }
  );

  useEffect(() => {
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
  }, [autoReloadOnPageShow, autoReload]);

  useEffect(() => {
    if (autoReloadOnWindowFocus) {
      window.addEventListener("focus", autoReload);
      return () => {
        window.removeEventListener("focus", autoReload);
      };
    }
  }, [autoReloadOnWindowFocus, autoReload]);

  useEffect(() => {
    if (autoReloadOnNetworkReconnect) {
      window.addEventListener("online", autoReload);
      return () => {
        window.removeEventListener("online", autoReload);
      };
    }
  }, [autoReloadOnNetworkReconnect, autoReload]);

  useEffect(() => {
    if (isAssociated) {
      const handleSuccess = (data: LoadData<Callback>) => {
        if (!store.isLoading(key, load)) {
          setState({
            data,
            error: null,
            loading: false,
            reloading: false,
            initializing: false,
          });
        }
      };
      const handleFailure = (error: unknown) => {
        if (!store.isLoading(key, load)) {
          setState({
            error,
            loading: false,
            reloading: false,
            initializing: false,
          });
        }
      };
      store.for(key).on("success", handleSuccess);
      store.for(key).on("failure", handleFailure);
      return () => {
        store.for(key).off("success", handleSuccess);
        store.for(key).off("failure", handleFailure);
      };
    }
  }, [key, isAssociated, store, load, setState]);

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

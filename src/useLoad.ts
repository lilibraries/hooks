import "requestidlecallback";
import { DependencyList, useDebugValue, useEffect, useRef } from "react";
import isObject from "lodash/isObject";
import isFunction from "lodash/isFunction";
import useUpdate from "./useUpdate";
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
import { useCacheConfig } from "./configs/CacheConfig";
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
  cacheKey?: {};
  cacheValidate?: (data: any) => boolean;
  onSuccess?: (data: LoadData<Callback>) => void;
  onFailure?: (error: any) => void;
  onFinally?: () => void;
}

interface Results<Callback extends LoadCallback> {
  data: LoadData<Callback> | undefined;
  error: any;
  loading: boolean;
  reloading: boolean;
  initializing: boolean;
  load: (...params: Parameters<Callback>) => ReturnType<Callback>;
  force: (...params: Parameters<Callback>) => ReturnType<Callback>;
  reload: (options?: { force?: boolean }) => void;
  update: (
    newData:
      | LoadData<Callback>
      | ((prevData?: LoadData<Callback>) => LoadData<Callback>)
  ) => void;
  cancel: () => void;
}

interface State<Data> {
  data: Data | undefined;
  error: any;
  loading: boolean;
}

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps: DependencyList,
  options: LoadHookOptions<Callback> & { initialData: LoadData<Callback> }
): Readonly<Results<Callback> & { data: LoadData<Callback> }>;

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps?: DependencyList,
  options?: LoadHookOptions<Callback>
): Readonly<Results<Callback>>;

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps: DependencyList = [],
  options: LoadHookOptions<Callback> = {}
): Readonly<Results<Callback>> {
  const { cache } = useCacheConfig();
  const { store, ...config } = useLoadConfig();

  const {
    key,
    idle,
    imperative,
    independent,
    fallback,
    initialData,
    defaultParams,
    cacheKey,
    cacheTime,
    cacheValidate,
    staleTime,
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

  const getCachedData = usePersist(() => {
    if (cacheKey != null && cache.has(cacheKey)) {
      const cachedData = cache.get(cacheKey) as LoadData<Callback>;
      if (cacheValidate) {
        return cacheValidate(cachedData) ? cachedData : initialData;
      } else {
        return cachedData;
      }
    } else {
      return initialData;
    }
  });

  const [state, setState] = useSetState<State<LoadData<Callback>>>(() => ({
    data: cacheKey != null ? getCachedData() : initialData,
    error: null,
    loading: !imperative,
  }));

  const mountedRef = useMountedRef();
  const unmountedRef = useUnmountedRef();
  const callbackRef = useLatestRef(callback);
  const fallbackRef = useLatestRef(fallback);

  const idRef = useRef(0);
  const readyRef = useRef(false);
  const forceRef = useRef(false);
  const paramsRef = useRef<Parameters<Callback>>();
  const loadingRef = useRef<{
    key: any;
    load: Function;
    store: typeof store;
  }>();
  const unlistenRef = useRef<() => void>();
  const idleTimerRef = useRef(0);
  const retryTimerRef = useRef(0);
  const pollingTimerRef = useRef(0);

  const clearPending = usePersist(() => {
    idRef.current++;
    readyRef.current = false;

    clearTimeout(retryTimerRef.current);
    clearTimeout(pollingTimerRef.current);
    cancelAutoReload();
    cancelIdleCallback(idleTimerRef.current);

    if (loadingRef.current) {
      const { key, store } = loadingRef.current;
      if (store.isLoading(key, load)) {
        store.deleteLoading(key, load);
        store.for(key).emit("cancel");
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

  const triggerFailure = usePersist((error: any, key?: {}) => {
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
    readyRef.current = true;
    paramsRef.current = params;

    let force = forceRef.current;
    if (force) {
      store.deleteTimestamp(load);
      forceRef.current = false;
    }

    if (!mountedRef.current) {
      if (process.env.NODE_ENV !== "production") {
        warning(
          true,
          "You should not load data before the component is mounted.",
          { scope: "useLoad" }
        );
      }
      return new Promise(() => {}) as ReturnType<Callback>;
    }

    if (
      !force &&
      staleTime > 0 &&
      state.error == null &&
      state.data !== undefined
    ) {
      const timestamp = store.getTimestamp(load);
      if (timestamp && Date.now() - timestamp <= staleTime) {
        if (state.loading) {
          setState({ loading: false });
        }
        return new Promise((resolve) => {
          resolve(state.data);
        }) as ReturnType<Callback>;
      }
    }

    if (isAssociated && !store.isLoading(key)) {
      store.setLoading(key, load);
      loadingRef.current = { key, load, store };
    }

    let cachedData;
    if (
      state.data === undefined &&
      cacheKey != null &&
      cache.has(cacheKey) &&
      (cachedData = getCachedData())
    ) {
      setState({ data: cachedData, loading: true });
    } else if (!state.loading) {
      setState({ loading: true });
    }

    const id = idRef.current;
    const isCanceled = () => id !== idRef.current;

    const checkPolling = () => {
      if (readyRef.current) {
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

    if (isAssociated && store.isLoading(key) && !store.isLoading(key, load)) {
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
        const handleReject = (error: any) => {
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

      const handleReject = (error: any) => {
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
        if (staleTime > 0) {
          store.setTimestamp(load);
        }
        if (cacheKey != null) {
          cache.set(cacheKey, data, { cacheTime });
        }
        if (isAssociated && store.isLoading(key, load)) {
          store.deleteLoading(key, load);
          store.for(key).emit("success", data);
          loadingRef.current = undefined;
        }
        setState({ data, error: null, loading: false });
        triggerSuccess(data, key);
        triggerFinally(key);
        checkPolling();
        return data;
      },

      (error) => {
        if (isCanceled()) {
          return new Promise(() => {});
        }
        if (isAssociated && store.isLoading(key, load)) {
          store.deleteLoading(key, load);
          store.for(key).emit("failure", error);
          loadingRef.current = undefined;
        }
        setState({ error, loading: false });
        triggerFailure(error, key);
        triggerFinally(key);
        checkPolling();
        throw error;
      }
    ) as ReturnType<Callback>;
  });

  const force = usePersist((...params: Parameters<Callback>) => {
    forceRef.current = true;
    return load(...params);
  });

  const reload = usePersist((options?: { force?: boolean }) => {
    const params = paramsRef.current || defaultParams;
    if (process.env.NODE_ENV !== "production") {
      warning(
        !!callback.length && params === undefined,
        "You should provide params by setting `defaultParams` option or calling the `load(...params)` method.",
        { scope: "useLoad" }
      );
    }
    forceRef.current = !!options && !!options.force;
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
    forceRef.current = false;
    if (!unmountedRef.current && state.loading) {
      setState({ loading: false });
    }
  });

  const [autoReload, { cancel: cancelAutoReload }] = useThrottle(
    () => {
      if (readyRef.current && !state.loading) {
        reload();
      }
    },
    { wait: autoReloadWaitTime, leading: true, trailing: false }
  );

  useEffect(() => {
    if (autoReloadOnPageShow || polling || pollingInPageHiding) {
      const listener = () => {
        if (isPageVisible()) {
          if (autoReloadOnPageShow || polling) {
            autoReload();
          }
        } else {
          if (pollingInPageHiding) {
            autoReload();
          }
        }
      };
      document.addEventListener("visibilitychange", listener);
      return () => {
        document.removeEventListener("visibilitychange", listener);
      };
    }
  }, [autoReloadOnPageShow, polling, pollingInPageHiding, autoReload]);

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
        if (!loadingRef.current || loadingRef.current.load !== load) {
          if (staleTime > 0) {
            store.setTimestamp(load);
          }
          setState({ data, error: null, loading: false });
        }
      };
      const handleFailure = (error: any) => {
        if (!loadingRef.current || loadingRef.current.load !== load) {
          setState({ error, loading: false });
        }
      };
      store.for(key).on("success", handleSuccess);
      store.for(key).on("failure", handleFailure);
      return () => {
        store.for(key).off("success", handleSuccess);
        store.for(key).off("failure", handleFailure);
      };
    }
  }, [key, isAssociated, store, load, staleTime, setState]);

  useEffect(() => {
    if (key != null) {
      store.addReloader(key, reload);
      return () => {
        store.removeReloader(key, reload);
      };
    }
  }, [key, store, reload]);

  useEffect(() => {
    return () => {
      store.deleteTimestamp(load);
    };
  }, [store, load]);

  useEffect(
    () => {
      if (!imperative) {
        reload();
      }
    },
    deps // eslint-disable-line
  );

  useUpdate(() => {
    if (process.env.NODE_ENV !== "production") {
      warning(
        true,
        "You should provide an immutable value for the `key` option.",
        { scope: "useLoad" }
      );
    }
  }, [key]);

  useUnmount(cancel);
  useDebugValue(state);

  return {
    load,
    force,
    reload,
    update,
    cancel,
    ...state,
    reloading: state.loading && state.data !== undefined,
    initializing: state.loading && state.data === undefined,
  } as const;
}

export default useLoad;

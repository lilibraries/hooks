import "requestidlecallback";

import { useDebugValue, useEffect, useRef, type DependencyList } from "react";

import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";
import type { LRUCache } from "lru-cache";
import warning from "warning";

import { getDefaultCache } from "./utils/cache";
import getLoadStore from "./utils/getLoadStore";
import useLatestRef from "./useLatestRef";
import useMountedRef from "./useMountedRef";
import usePersist from "./usePersist";
import useSetState from "./useSetState";
import useThrottle from "./useThrottle";
import useUnmount from "./useUnmount";
import useUnmountedRef from "./useUnmountedRef";
import useUpdate from "./useUpdate";
import isPageVisible from "./utils/isPageVisible";
import mergeDefined from "./utils/mergeDefined";
import type { AnyFunction } from "./utils/types";

export type LoadCallback = (...args: any[]) => Promise<any>;

interface UseLoadOptions<Callback extends LoadCallback> {
  /** A shared key. Multiple `useLoad` instances with the same `key` merge duplicate requests and share the loaded result, and can all be reloaded together via `useReload(key)`. Note: `key` must be an immutable value; changing it triggers a warning and may corrupt shared state. */
  key?: NonNullable<unknown>;
  /** Whether to run the load while the browser is idle (via `requestIdleCallback`) to avoid blocking rendering. Pass `true` or an idle-callback options object. */
  idle?: boolean | IdleRequestOptions;
  /** Whether to trigger loading manually. When `true`, nothing loads on mount; call `load` explicitly. */
  imperative?: boolean;
  /** Whether the request is independent. When `true`, duplicate requests are not merged even if `key` is set (each instance fires its own), but `useReload(key)` can still reload it. */
  independent?: boolean;
  /** A fallback loader invoked when the primary loader still fails after retries are exhausted; usually points to an alternate data source. */
  fallback?: Callback;
  /** Initial data. When set, `data` starts with this value and the returned `data` type no longer includes `undefined`. */
  initialData?: Awaited<ReturnType<Callback>>;
  /** Default params. Used by the first load or by `reload` when no params have been passed via `load(...params)` yet. */
  defaultParams?: Parameters<Callback>;
  /** Cache instance. If not specified, the shared internal instance (the same one used by `useCache`) is used. */
  cache?: LRUCache<any, any>;
  /** Cache key to enable caching. The resolved data is written to the cache, and on mount the initial `data` is read back from it. Must be an immutable value. */
  cacheKey?: NonNullable<unknown>;
  /** Cache time in milliseconds, defaults to 5 minutes. Set `Infinity` for a permanent cache. */
  cacheTime?: number;
  /** Stale time in milliseconds, defaults to 0. Must be used with `cacheKey`. Within `staleTime` after a cache write, `load`/`reload` and automatic reloads resolve the cached data directly without sending a request; bypass with `force(...params)` or `reload({ force: true })`. */
  staleTime?: number;
  /** Validate the cached value. If it returns falsy, `initialData` is used instead. */
  cacheValidate?: (data: any) => boolean;
  /** Whether to automatically retry on failure (at most `retryLimit` times). Pass a function to decide per failure: it receives the error and returns whether to retry. */
  retry?: boolean | ((error: any) => boolean);
  /** Maximum number of automatic retries, defaults to 3. */
  retryLimit?: number;
  /** The wait before a retry (milliseconds). A number or a function computing it from the retry number. Defaults to exponential growth: the `count`-th retry waits 2^(count-1) × 1000 ms. */
  retryInterval?: number | ((count: number) => number);
  /** Whether to keep retrying the fallback function itself after it fails too. Pass a function to decide per failure: it receives the error and returns whether to retry. */
  fallbackRetry?: boolean | ((error: any) => boolean);
  /** Maximum retries for the fallback function, defaults to 3. */
  fallbackRetryLimit?: number;
  /** The wait before retrying the fallback function (milliseconds). A number or a function. Defaults to exponential growth: the `count`-th retry waits 2^(count-1) × 1000 ms. */
  fallbackRetryInterval?: number | ((count: number) => number);
  /** Whether to enable polling. After each request settles (success or failure), waits `pollingInterval` before reloading automatically, until cancelled. */
  polling?: boolean;
  /** The polling interval (milliseconds), defaults to 30000. */
  pollingInterval?: number;
  /** Whether to keep polling while the page is hidden. */
  pollingInPageHidden?: boolean;
  /** The polling interval while the page is hidden (milliseconds), defaults to 60000. */
  pollingIntervalInPageHidden?: number;
  /** Throttle time for automatic reloads (milliseconds): among consecutive triggers only the first runs, later triggers within the window are ignored. Defaults to 10000. */
  autoReloadWaitTime?: number;
  /** Whether to automatically reload when the page becomes visible again. */
  autoReloadOnPageShow?: boolean;
  /** Whether to automatically reload when the window regains focus. */
  autoReloadOnWindowFocus?: boolean;
  /** Whether to automatically reload when the network recovers (online event). */
  autoReloadOnNetworkReconnect?: boolean;
  /** Called on success with the loaded data. */
  onSuccess?: (data: Awaited<ReturnType<Callback>>) => void;
  /** Called on failure with the error object. */
  onFailure?: (error: any) => void;
  /** Called when loading settles (success or failure). */
  onFinally?: () => void;
}

interface Results<Callback extends LoadCallback> {
  /** The loaded data; `undefined` until a load has succeeded. */
  data: Awaited<ReturnType<Callback>> | undefined;
  /** The error of the most recent failure, `null` on success. */
  error: any;
  /** Whether a load is in progress (includes the initial load and reloads). */
  loading: boolean;
  /** Whether this is a reload with existing data (`loading` and `data` already present). */
  reloading: boolean;
  /** Whether this is the initial load (`loading` with no data yet). */
  initializing: boolean;
  /** Manual load function: its params are passed to `callback` as is and it returns a Promise (resolves with the data on success, rejects with the error on failure). Note: calling it before the component mounts returns a Promise that never settles, so do not call it during `useLayoutEffect`. */
  load: (...params: Parameters<Callback>) => ReturnType<Callback>;
  /** Force load function: like `load`, but skips the `staleTime` cache hit and always sends the request. */
  force: (...params: Parameters<Callback>) => ReturnType<Callback>;
  /** Reload function: cancels the in-flight request (including retries, polling, etc.) first, then reloads with the params from the most recent `load` call (or `defaultParams` if none were ever passed). Pass `{ force: true }` to skip the `staleTime` cache hit. */
  reload: (options?: { force?: boolean }) => void;
  /** Local update function: mutates `data` directly (no request), accepts a new value or a function computed from the old value. */
  update: (
    newData:
      Awaited<ReturnType<Callback>> | ((prevData?: Awaited<ReturnType<Callback>>) => Awaited<ReturnType<Callback>>),
  ) => void;
  /** Cancel function: aborts the current load and stops all pending tasks such as retries and polling. The Promise returned by the cancelled `load` stays pending forever (neither resolves nor rejects). */
  cancel: () => void;
}

interface State<Data> {
  data: Data | undefined;
  error: any;
  loading: boolean;
}

/** Exponentially growing retry wait time (milliseconds): the `count`-th retry waits 2^(count-1) × 1000 ms. So the 1st retry waits 1 second, the 2nd 2 seconds, the 3rd 4 seconds, and so on. */
function getRetryInterval(count: number) {
  return Math.pow(2, count - 1) * 1000;
}

/** Resolve a retry option against the error of the current failure: a boolean means "always"/"never", a function decides per error and returns whether to retry. */
function resolveRetryOption(option: boolean | ((error: any) => boolean), error: any) {
  return isFunction(option) ? option(error) : option;
}

const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

const defaultLoadOptions = {
  cacheTime: DEFAULT_CACHE_TIME,
  staleTime: 0,
  retry: false,
  retryLimit: 3,
  retryInterval: getRetryInterval,
  fallbackRetry: false,
  fallbackRetryLimit: 3,
  fallbackRetryInterval: getRetryInterval,
  polling: false,
  pollingInterval: 30 * 1000,
  pollingInPageHidden: false,
  pollingIntervalInPageHidden: 60 * 1000,
  autoReloadWaitTime: 10 * 1000,
  autoReloadOnPageShow: false,
  autoReloadOnWindowFocus: false,
  autoReloadOnNetworkReconnect: false,
};

/**
 * Load asynchronous data, typically for network requests. `callback` must return a Promise.
 *
 * Key features:
 * - Shared loading: multiple instances with the same `key` merge duplicate requests and share results
 * - Caching (`cacheKey`, `cacheTime`, `staleTime`, `cacheValidate`)
 * - Failure retry (`retry`) and failure fallback (`fallback`)
 * - Polling (`polling`)
 * - Automatic reload when the page becomes visible / the window gains focus / the network recovers
 * - Loading during browser idle time (`idle`)
 *
 * Loads automatically after mount by default (and again when `deps` change);
 * set `options.imperative` to `true` to trigger loading manually via `load` instead.
 *
 * @param callback The loader; its params are forwarded by `load`, must return a Promise; the resolved value becomes `data`.
 * @param deps The dependency array; any change triggers an automatic reload; defaults to `[]` (load once after mount).
 * @param options The options object, see `UseLoadOptions`.
 * @returns Returns an object with the load state (`data`, `error`, `loading`, `reloading`, `initializing`) and the control functions (`load`, `force`, `reload`, `update`, `cancel`).
 */
function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps: DependencyList,
  options: UseLoadOptions<Callback> & { initialData: Awaited<ReturnType<Callback>> },
): Readonly<Results<Callback> & { data: Awaited<ReturnType<Callback>> }>;

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps?: DependencyList,
  options?: UseLoadOptions<Callback>,
): Readonly<Results<Callback>>;

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps: DependencyList = [],
  options: UseLoadOptions<Callback> = {},
): Readonly<Results<Callback>> {
  const store = getLoadStore();

  const {
    key,
    idle,
    imperative,
    independent,
    fallback,
    initialData,
    defaultParams,
    cache: customCache,
    cacheKey,
    cacheTime,
    staleTime,
    cacheValidate,
    retry,
    retryLimit,
    retryInterval,
    fallbackRetry,
    fallbackRetryLimit,
    fallbackRetryInterval,
    polling,
    pollingInterval,
    pollingInPageHidden,
    pollingIntervalInPageHidden,
    autoReloadWaitTime,
    autoReloadOnPageShow,
    autoReloadOnWindowFocus,
    autoReloadOnNetworkReconnect,
  } = mergeDefined(defaultLoadOptions, options);
  const isAssociated = key != null && !independent;

  // The default cache instance is shared with `useCache`: data cached by this hook can be read by `useCache` and vice versa.
  const cache = customCache ?? getDefaultCache();
  // `LRUCache` treats `ttl: 0` as "never expires" (and `NaN` silently behaves the same), while a non-positive
  // `cacheTime` meant "expire immediately" in v1. Normalize finite values to a minimum of 1 ms, map `Infinity` to
  // `ttl: 0` (never expires, without registering a pointless one-shot autopurge timer per write), and fall back to
  // the default for `NaN`.
  const normalizedCacheTime = Number.isNaN(cacheTime)
    ? DEFAULT_CACHE_TIME
    : cacheTime === Infinity
      ? 0
      : Math.max(cacheTime, 1);

  /** Read the cached data for `cacheKey`: returns `initialData` when there is no valid cache entry or when `cacheValidate` rejects the cached value. `peek` is a pure read, safe during render. */
  const getCachedData = usePersist(() => {
    if (cacheKey != null) {
      const cachedData = cache.peek(cacheKey) as Awaited<ReturnType<Callback>> | undefined;
      if (cachedData !== undefined) {
        return cacheValidate && !cacheValidate(cachedData) ? initialData : cachedData;
      }
    }
    return initialData;
  });

  const [state, setState] = useSetState<State<Awaited<ReturnType<Callback>>>>(() => ({
    data: getCachedData(),
    error: null,
    loading: !imperative,
  }));

  const mountedRef = useMountedRef();
  const unmountedRef = useUnmountedRef();
  const callbackRef = useLatestRef(callback);
  const fallbackRef = useLatestRef(fallback);

  /** Request token: incremented whenever a new request starts or is cancelled, so old requests can detect staleness via `isCanceled()` */
  const idRef = useRef(0);
  /** Whether `load()` has started at least once: polling and automatic reloads are allowed only when `true` */
  const readyRef = useRef(false);
  /** Whether the next `load` should bypass the `staleTime` cache hit, set by `force()` / `reload({ force: true })` */
  const forceRef = useRef(false);
  const paramsRef = useRef<Parameters<Callback> | undefined>(undefined);
  const loadingRef = useRef<{ key: NonNullable<unknown>; load: AnyFunction; store: typeof store } | undefined>(
    undefined,
  );
  const unlistenRef = useRef<(() => void) | undefined>(undefined);
  const idleTimerRef = useRef(0);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pollingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reloadRef = useRef<(() => void) | undefined>(undefined);
  const loadRef = useRef<((...params: Parameters<Callback>) => ReturnType<Callback>) | undefined>(undefined);

  // leading and non-trailing: among consecutive triggers (e.g. rapid visibility toggles) only the first runs, later triggers within autoReloadWaitTime are ignored.
  const [autoReload] = useThrottle(
    () => {
      if (readyRef.current && !state.loading) {
        reloadRef.current?.();
      }
    },
    { wait: autoReloadWaitTime, leading: true, trailing: false },
  );

  // Terminate all pending tasks of this instance: the in-flight request, retry/polling timers, the idle callback, and the shared-request listeners.
  const clearPending = usePersist(() => {
    idRef.current++;
    readyRef.current = false;

    clearTimeout(retryTimerRef.current);
    clearTimeout(pollingTimerRef.current);
    cancelIdleCallback(idleTimerRef.current);

    if (loadingRef.current) {
      const { key, load, store } = loadingRef.current;
      if (store.isLoading(key, load)) {
        store.deleteLoading(key, load);
        store.peek(key)?.emit("cancel");
      }
      loadingRef.current = undefined;
    }

    if (unlistenRef.current) {
      unlistenRef.current();
      unlistenRef.current = undefined;
    }
  });

  const triggerSuccess = usePersist((data: Awaited<ReturnType<Callback>>) => {
    if (options.onSuccess) {
      options.onSuccess(data);
    }
  });

  const triggerFailure = usePersist((error: any) => {
    if (options.onFailure) {
      options.onFailure(error);
    }
  });

  const triggerFinally = usePersist(() => {
    if (options.onFinally) {
      options.onFinally();
    }
  });

  const load = usePersist((...params: Parameters<Callback>) => {
    // loadRef.current is assigned during render (see loadRef.current = load below) and `load` only runs when called by the user, so the `!` (non-null assertion) is safe here.
    const currentLoad = loadRef.current!;

    clearPending();
    readyRef.current = true;
    paramsRef.current = params;

    if (!mountedRef.current) {
      warning(false, "[useLoad] You should not load data before the component is mounted.");
      return new Promise(() => {}) as ReturnType<Callback>;
    }

    const force = forceRef.current;
    if (force) {
      forceRef.current = false;
    }

    const id = idRef.current;
    const isCanceled = () => id !== idRef.current;

    const checkPolling = () => {
      if (readyRef.current) {
        if (isPageVisible()) {
          if (polling) {
            pollingTimerRef.current = setTimeout(() => {
              if (!isCanceled()) {
                reloadRef.current?.();
              }
            }, pollingInterval);
          }
        } else {
          if (pollingInPageHidden) {
            pollingTimerRef.current = setTimeout(() => {
              if (!isCanceled()) {
                reloadRef.current?.();
              }
            }, pollingIntervalInPageHidden);
          }
        }
      }
    };

    // Fresh cache hit within `staleTime` (the write happened no longer ago than `staleTime`): resolve the cached
    // data directly without sending a request. `getRemainingTTL() >= cacheTime - staleTime` is equivalent to
    // "elapsed time since the write <= staleTime" and also holds for an infinite `cacheTime`.
    if (!force && staleTime > 0 && cacheKey != null && cache.has(cacheKey) && state.error == null) {
      if (cache.getRemainingTTL(cacheKey) >= cacheTime - staleTime) {
        const data = state.data !== undefined ? state.data : getCachedData();
        // Only resolve directly when there is usable data; otherwise fall through to send the request
        // (e.g. `cacheValidate` rejected the cached value and no `initialData` was provided).
        if (data !== undefined) {
          if (state.data === undefined) {
            setState({ data, loading: false });
          } else if (state.loading) {
            setState({ loading: false });
          }
          // A fresh hit skips only the request, not the next poll: keep the
          // polling chain alive (the request paths call this on settlement).
          checkPolling();
          return new Promise((resolve) => {
            resolve(data);
          }) as ReturnType<Callback>;
        }
      }
    }

    if (isAssociated && !store.isLoading(key)) {
      store.setLoading(key, currentLoad);
      loadingRef.current = { key, load: currentLoad, store };
    }

    // The fresh-cache branch above already resolved when the entry is still within `staleTime`.
    const cachedData =
      state.data === undefined && cacheKey != null && cache.has(cacheKey) ? getCachedData() : undefined;
    if (cachedData !== undefined) {
      setState({ data: cachedData, loading: true });
    } else if (!state.loading) {
      setState({ loading: true });
    }

    // Another instance is already loading the same key: merge the request and wait for its result instead of firing a duplicate.
    if (isAssociated && store.isLoading(key) && !store.isLoading(key, currentLoad)) {
      return new Promise<Awaited<ReturnType<Callback>>>((resolve, reject) => {
        const unlisten = () => {
          unlistenRef.current = undefined;
          store.for(key).off("cancel", handleCancel);
          store.for(key).off("failure", handleReject);
          store.for(key).off("success", handleResolve);
        };

        const handleCancel = () => {
          unlisten();
          if (!isCanceled()) {
            reloadRef.current?.();
          }
        };
        const handleResolve = (data: Awaited<ReturnType<Callback>>) => {
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
          triggerSuccess(data);
          triggerFinally();
          checkPolling();
          return data;
        },

        (error) => {
          if (isCanceled()) {
            return new Promise(() => {});
          }
          triggerFailure(error);
          triggerFinally();
          checkPolling();
          throw error;
        },
      ) as ReturnType<Callback>;
    }

    return new Promise<Awaited<ReturnType<Callback>>>((resolve, reject) => {
      let retryCount = 0;
      let fallbackInvoked = false;
      let fallbackRetryCount = 0;

      const handleReject = (error: any) => {
        if (isCanceled()) {
          return;
        }
        // Failure handling order: retry the primary loader -> then try the fallback function -> optionally retry the fallback after it fails -> finally reject.
        // `retry`/`fallbackRetry` accept a boolean or a function receiving the error and returning whether to retry; once the fallback has been invoked the primary loader is never retried again.
        if (!fallbackInvoked && resolveRetryOption(retry, error) && ++retryCount <= retryLimit) {
          const delay = isFunction(retryInterval) ? retryInterval(retryCount) : retryInterval;
          if (delay > 0) {
            retryTimerRef.current = setTimeout(() => {
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
          resolveRetryOption(fallbackRetry, error) &&
          ++fallbackRetryCount <= fallbackRetryLimit
        ) {
          const delay = isFunction(fallbackRetryInterval)
            ? fallbackRetryInterval(fallbackRetryCount)
            : fallbackRetryInterval;
          if (delay > 0) {
            retryTimerRef.current = setTimeout(() => {
              if (!isCanceled()) {
                if (fallbackRef.current) {
                  fallbackRef.current(...params).then(resolve, handleReject);
                } else {
                  reject(error);
                }
              }
            }, delay);
          } else {
            if (fallbackRef.current) {
              fallbackRef.current(...params).then(resolve, handleReject);
            } else {
              reject(error);
            }
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
          isObject(idle) ? idle : undefined,
        );
      } else {
        callbackRef.current(...params).then(resolve, handleReject);
      }
    }).then(
      (data) => {
        if (isCanceled()) {
          return new Promise(() => {});
        }
        if (cacheKey != null) {
          cache.set(cacheKey, data, { ttl: normalizedCacheTime });
        }
        if (isAssociated && store.isLoading(key, currentLoad)) {
          store.deleteLoading(key, currentLoad);
          store.peek(key)?.emit("success", data);
          loadingRef.current = undefined;
        }
        setState({ data, error: null, loading: false });
        triggerSuccess(data);
        triggerFinally();
        checkPolling();
        return data;
      },

      (error) => {
        if (isCanceled()) {
          return new Promise(() => {});
        }
        if (isAssociated && store.isLoading(key, currentLoad)) {
          store.deleteLoading(key, currentLoad);
          store.peek(key)?.emit("failure", error);
          loadingRef.current = undefined;
        }
        setState({ error, loading: false });
        triggerFailure(error);
        triggerFinally();
        checkPolling();
        throw error;
      },
    ) as ReturnType<Callback>;
  });

  loadRef.current = load;

  const force = usePersist((...params: Parameters<Callback>) => {
    forceRef.current = true;
    return load(...params);
  });

  const reload = usePersist((options?: { force?: boolean }) => {
    const params = paramsRef.current || defaultParams;
    warning(
      !callback.length || params !== undefined,
      "[useLoad] You should provide params by setting `defaultParams` option or calling the `load(...params)` method.",
    );
    forceRef.current = !!options && !!options.force;
    if (params) {
      load(...params);
    } else {
      load(...([] as unknown as Parameters<Callback>));
    }
  });

  reloadRef.current = reload;

  const update = usePersist(
    (
      newData:
        Awaited<ReturnType<Callback>> | ((prevData?: Awaited<ReturnType<Callback>>) => Awaited<ReturnType<Callback>>),
    ) => {
      setState((prevState) => ({
        data: isFunction(newData) ? newData(prevState.data) : newData,
      }));
    },
  );

  const cancel = usePersist(() => {
    clearPending();
    forceRef.current = false;
    if (!unmountedRef.current && state.loading) {
      setState({ loading: false });
    }
  });

  useEffect(() => {
    if (autoReloadOnPageShow || polling || pollingInPageHidden) {
      const listener = () => {
        if (isPageVisible()) {
          if (autoReloadOnPageShow || polling) {
            autoReload();
          }
        } else {
          if (pollingInPageHidden) {
            autoReload();
          }
        }
      };
      document.addEventListener("visibilitychange", listener);
      return () => {
        document.removeEventListener("visibilitychange", listener);
      };
    }
  }, [autoReloadOnPageShow, polling, pollingInPageHidden, autoReload]);

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

  // Requests fired by this instance itself are handled inside load(), so they are
  // excluded here via loadingRef.
  useEffect(() => {
    if (isAssociated) {
      const handleSuccess = (data: Awaited<ReturnType<Callback>>) => {
        if (!loadingRef.current || loadingRef.current.load !== load) {
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
    deps, // eslint-disable-line
  );

  // `key` must be immutable (see UseLoadOptions.key); warn when it changes to avoid corrupting shared state.
  useUpdate(() => {
    warning(false, "[useLoad] You should provide an immutable value for the `key` option.");
  }, [key]);

  // On unmount, terminate the pending tasks without updating state, so no state
  // update is scheduled on an unmounting component.
  useUnmount(() => {
    clearPending();
    forceRef.current = false;
  });
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

import { DependencyList, useDebugValue } from "react";
import usePersist from "./usePersist";
import useSetState from "./useSetState";
import assignWithDefined from "./utils/assignWithDefined";
import { PromiseResolve } from "./utils/types";
import { SharedOptions, useLoadConfig, LoadConfigValue } from "./LoadConfig";

export type LoadCallback = (...args: any[]) => Promise<any>;
export type LoadData<T extends LoadCallback> = PromiseResolve<ReturnType<T>>;

interface Options<Callback extends LoadCallback> extends SharedOptions {
  key?: {};
  idle?: boolean;
  imperative?: boolean;
  independent?: boolean;
  fallback?: Callback;
  initialData?: LoadData<Callback>;
  defaultParams?: Parameters<Callback>;
  onSuccess?: (data: LoadData<Callback>) => void;
  onFailure?: (error: any) => void;
  onFinally?: () => void;
}

interface Results<Callback extends LoadCallback> {
  data: LoadData<Callback> | undefined;
  error: unknown;
  loading: boolean;
  reloading: boolean;
  initializing: boolean;
  load: Callback;
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
  error: any;
  loading: boolean;
  reloading: boolean;
  initializing: boolean;
}

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps: DependencyList,
  options: Options<Callback> = {}
): Readonly<Results<Callback>> {
  const config = useLoadConfig();
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
  } = assignWithDefined<LoadConfigValue & Options<Callback>>(
    {},
    config,
    options
  );

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

  const load = usePersist(function (this: any, ...args: Parameters<Callback>) {
    return callback.apply(this, args);
  } as Callback);

  const reload = usePersist(() => {});

  const update = usePersist(() => {});

  const cancel = usePersist(() => {});

  useDebugValue(state);

  return { ...state, load, reload, update, cancel } as const;
}

export default useLoad;

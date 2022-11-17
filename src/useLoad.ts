import { DependencyList } from "react";
import { ResolvePromise } from "./types";

export declare function useLoad<
  Callback extends (...args: any[]) => Promise<any>,
  Data = ResolvePromise<ReturnType<Callback>>
>(
  callback: Callback,
  deps: DependencyList,
  options?: {
    key?: {};

    idle?: boolean;
    imperative?: boolean;
    independent?: boolean;

    fallback?: Callback;
    initialData?: Data;
    defaultParams?: Parameters<Callback>;

    cache?: boolean;
    cacheKey?: {};
    cacheSync?: boolean;
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

    onSuccess: (data: Data) => void;
    onFailure: (error: any) => void;
    onFinally: () => void;
  }
): {
  data: Data | undefined;
  error: any;
  loading: boolean;
  reloading: boolean;
  initializing: boolean;
  load: Callback;
  reload: () => void;
  update: (newData: Data | ((prevData?: Data) => Data)) => void;
  cancel: () => void;
};

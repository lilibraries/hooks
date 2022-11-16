import { DependencyList } from "react";
import { ResolvePromise } from "./types";

export declare function useLoad<
  C extends (...args: any[]) => Promise<any>,
  D = ResolvePromise<ReturnType<C>>
>(
  callback: C,
  deps: DependencyList,
  options?: {
    key?: any;
    idle?: boolean;
    imperative?: boolean;
    fallback?: C;
    initialData?: D;
    defaultParams?: Parameters<C>;

    cacheTime?: number;
    staleTime?: number;

    retryLimit?: number;
    retryInterval?: number | ((count: number) => number);
    fallbackRetryLimit?: number;
    fallbackRetryInterval?: number | ((count: number) => number);

    pollingInterval?: number;
    pollingInPageHiding?: boolean;
    pollingIntervalInPageHiding?: number;

    autoReloadWaitTime?: number;
    autoReloadOnPageShow?: boolean;
    autoReloadOnWindowFocus?: boolean;
    autoReloadOnNetworkReconnect?: boolean;

    onSuccess: (data: D) => void;
    onFailure: (error: any) => void;
    onFinally: () => void;
  }
): {
  data: D;
  error: any;
  loading: boolean;
  reloading: boolean;
  initializing: boolean;
  load: C;
  reload: () => void;
  update: (newData: D | ((prevData?: D) => D)) => void;
  cancel: () => void;
};

import useLoad, { LoadCallback, LoadData } from "./useLoad";

export interface SubmitHookOptions<Callback, Data> {
  idle?: boolean;
  fallback?: Callback;
  retry?: boolean;
  retryLimit?: number;
  retryInterval?: number | ((count: number) => number);
  fallbackRetry?: boolean;
  fallbackRetryLimit?: number;
  fallbackRetryInterval?: number | ((count: number) => number);
  onSuccess?: (data: Data) => void;
  onFailure?: (error: any) => void;
  onFinally?: () => void;
}

const defaultOptions = {
  key: undefined,
  imperative: true,
  independent: true,
  initialData: undefined,
  defaultParams: undefined,
  cacheKey: undefined,
  staleTime: 0,
  polling: false,
  pollingInPageHiding: false,
  autoReloadOnPageShow: false,
  autoReloadOnWindowFocus: false,
  autoReloadOnNetworkReconnect: false,
};

function useSubmit<Callback extends LoadCallback>(
  callback: Callback,
  options?: SubmitHookOptions<Callback, LoadData<Callback>>
) {
  const { force: submit, loading: submitting } = useLoad(callback, [], {
    ...options,
    ...defaultOptions,
  });

  return { submit, submitting } as const;
}

export default useSubmit;

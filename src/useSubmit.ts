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
  const {
    data,
    error,
    force: submit,
    loading: submitting,
    _reset_for_submit_you_should_not_use_: reset,
  } = useLoad(callback, [], {
    ...options,
    ...defaultOptions,
  });

  return { data, error, submitting, submit, reset } as const;
}

export default useSubmit;

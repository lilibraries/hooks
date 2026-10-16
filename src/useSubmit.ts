import useLoad, { type LoadCallback } from "./useLoad";

interface UseSubmitOptions<Callback, Data> {
  /** Whether to run the submit while the browser is idle (via `requestIdleCallback`). Can be `true` or an idle-callback options object. */
  idle?: boolean | IdleRequestOptions;
  /** A fallback submit function invoked after the primary one fails, usually pointing to an alternate data source. */
  fallback?: Callback;
  /** Whether to automatically retry on failure. Pass a function to decide per failure: it receives the error and returns whether to retry. */
  retry?: boolean | ((error: any) => boolean);
  /** Maximum number of retries, defaults to 3. */
  retryLimit?: number;
  /** The retry interval (milliseconds); can be a function computing it from the retry number. Defaults to exponential growth: the `count`-th retry waits 2^(count-1) × 1000 ms. */
  retryInterval?: number | ((count: number) => number);
  /** Whether to keep retrying the fallback function after it fails too. Pass a function to decide per failure: it receives the error and returns whether to retry. */
  fallbackRetry?: boolean | ((error: any) => boolean);
  /** Maximum retries for the fallback function, defaults to 3. */
  fallbackRetryLimit?: number;
  /** The fallback retry interval (milliseconds); can be a function. Defaults to exponential growth: the `count`-th retry waits 2^(count-1) × 1000 ms. */
  fallbackRetryInterval?: number | ((count: number) => number);
  /** Called on submit success. */
  onSuccess?: (data: Data) => void;
  /** Called on submit failure. */
  onFailure?: (error: any) => void;
  /** Called when the submit settles (success or failure). */
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
  pollingInPageHidden: false,
  autoReloadOnPageShow: false,
  autoReloadOnWindowFocus: false,
  autoReloadOnNetworkReconnect: false,
};

/**
 * Built on `useLoad` with a trimmed feature set: supports only a few options and never runs automatically. Typically used for network requests such as create, update, and delete.
 *
 * The returned `submit` is implemented by `useLoad`'s `force`, so each submission cancels the previous pending submission and always sends the request.
 *
 * @param callback The submit function; its params are forwarded by `submit`, must return a Promise; the resolved value is the success data.
 * @param options The options object (see `UseSubmitOptions`).
 * @returns Returns a `{ submit, submitting, error }` object: `submit` is the submit function, `submitting` indicates whether a submission is in progress, and `error` is the error of the most recent failure (`null` on success).
 */
function useSubmit<Callback extends LoadCallback>(
  callback: Callback,
  options?: UseSubmitOptions<Callback, Awaited<ReturnType<Callback>>>,
) {
  const {
    force: submit,
    loading: submitting,
    error,
  } = useLoad(callback, [], {
    ...options,
    ...defaultOptions,
  });

  return { submit, submitting, error } as const;
}

export default useSubmit;

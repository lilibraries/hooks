import { PromiseResolve } from "./utils/types";

export interface SubmitHookOptions<Callback, Data> {
  key?: {};
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

export declare function useSubmit<
  Callback extends (...args: any[]) => Promise<any>,
  Data = PromiseResolve<ReturnType<Callback>>
>(
  callback: Callback,
  options?: SubmitHookOptions<Callback, Data>
): {
  data: Data | undefined;
  error: any;
  submitting: boolean;
  submit: Callback;
  reset: () => void;
  cancel: () => void;
};

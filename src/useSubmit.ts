import { ResolvePromise } from "./types";

export declare function useSubmit<
  Callback extends (...args: any[]) => Promise<any>,
  Data = ResolvePromise<ReturnType<Callback>>
>(
  callback: Callback,
  options?: {
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
): {
  data: Data | undefined;
  error: any;
  submitting: boolean;
  submit: Callback;
  reset: () => void;
  cancel: () => void;
};

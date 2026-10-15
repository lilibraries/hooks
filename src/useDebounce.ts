import { useMemo, useRef } from "react";

import debounce from "lodash/debounce";
import isNumber from "lodash/isNumber";
import isObject from "lodash/isObject";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";

export interface UseDebounceOptions {
  wait?: number;
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Use a debounced callback.
 *
 * @param callback The callback to debounce.
 * @param options The debounce wait time (milliseconds), or an options object.
 * @param options.wait The debounce wait time (milliseconds).
 * @param options.maxWait The maximum wait time (milliseconds).
 * @param options.leading Whether to invoke at the start.
 * @param options.trailing Whether to invoke at the end.
 * @returns Returns a `[debounced, { flush, cancel }]` tuple.
 */
function useDebounce<T extends (...args: any[]) => any>(callback: T, options?: number | UseDebounceOptions) {
  let wait = 0;
  let maxWait = Infinity;
  let leading = false;
  let trailing = true;

  if (isNumber(options)) {
    wait = options;
  } else if (isObject(options)) {
    if (options.wait !== undefined) {
      wait = +options.wait;
    }
    if (options.maxWait !== undefined) {
      maxWait = +options.maxWait;
    }
    if (options.leading !== undefined) {
      leading = !!options.leading;
    }
    if (options.trailing !== undefined) {
      trailing = !!options.trailing;
    }
  }

  const callbackRef = useLatestRef(callback);
  const debouncedRef = useRef<ReturnType<typeof debounce> | undefined>(undefined);

  // Rebuild the debounced function when debounce options change; useMemo (rather
  // than useEffect) ensures calls to `debounced` within the same render already
  // use the new function.
  // Flush the old function before rebuilding to run its pending call immediately
  // and avoid leftover timers.
  useMemo(
    () => {
      debouncedRef.current?.flush();
      debouncedRef.current = debounce(
        function (this: any, ...args: Parameters<T>) {
          return callbackRef.current.apply(this, args);
        },
        wait,
        { maxWait, leading, trailing },
      );
    },
    [wait, maxWait, leading, trailing], // eslint-disable-line
  );

  const debounced = usePersist(function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    return debouncedRef.current?.apply(this, args);
  });

  const flush = usePersist((): ReturnType<T> | undefined => {
    return debouncedRef.current?.flush();
  });

  const cancel = usePersist(() => {
    debouncedRef.current?.cancel();
  });

  useUnmount(cancel);

  return [debounced, { flush, cancel }] as const;
}

export default useDebounce;

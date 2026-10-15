import { useMemo, useRef } from "react";

import isNumber from "lodash/isNumber";
import isObject from "lodash/isObject";
import throttle from "lodash/throttle";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";

export interface UseThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Use a throttled callback.
 *
 * @param callback The callback to throttle.
 * @param options The throttle wait time (milliseconds), or an options object.
 * @param options.wait The throttle wait time (milliseconds).
 * @param options.leading Whether to invoke at the start.
 * @param options.trailing Whether to invoke at the end.
 * @returns Returns a `[throttled, { flush, cancel }]` tuple.
 */
function useThrottle<T extends (...args: any[]) => any>(callback: T, options?: number | UseThrottleOptions) {
  let wait = 0;
  let leading = false;
  let trailing = true;

  if (isNumber(options)) {
    wait = options;
  } else if (isObject(options)) {
    if (options.wait !== undefined) {
      wait = +options.wait;
    }
    if (options.leading !== undefined) {
      leading = !!options.leading;
    }
    if (options.trailing !== undefined) {
      trailing = !!options.trailing;
    }
  }

  const callbackRef = useLatestRef(callback);
  const throttledRef = useRef<ReturnType<typeof throttle> | undefined>(undefined);

  // Rebuild the throttled function when throttle options change; useMemo (rather
  // than useEffect) ensures calls to `throttled` within the same render already
  // use the new function.
  // Flush the old function before rebuilding to run its pending call immediately
  // and avoid leftover timers.
  useMemo(() => {
    throttledRef.current?.flush();
    throttledRef.current = throttle(
      function (this: any, ...args: Parameters<T>) {
        return callbackRef.current.apply(this, args);
      },
      wait,
      { leading, trailing },
    );
  }, [wait, leading, trailing, callbackRef]);

  const throttled = usePersist(function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    return throttledRef.current?.apply(this, args);
  });

  const flush = usePersist((): ReturnType<T> | undefined => {
    return throttledRef.current?.flush();
  });

  const cancel = usePersist(() => {
    throttledRef.current?.cancel();
  });

  useUnmount(cancel);

  return [throttled, { flush, cancel }] as const;
}

export default useThrottle;

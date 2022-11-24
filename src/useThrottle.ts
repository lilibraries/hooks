import { useMemo, useRef } from "react";
import isObject from "lodash/isObject";
import throttle from "lodash/throttle";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";
import useLatestRef from "./useLatestRef";

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  options?: number | ThrottleOptions
) {
  let wait = 0;
  let leading = false;
  let trailing = true;

  if (typeof options === "number") {
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
  const throttledRef = useRef<ReturnType<typeof throttle>>();

  useMemo(
    () => {
      throttledRef.current?.flush();
      throttledRef.current = throttle(
        function (...args: Parameters<T>) {
          // @ts-ignore
          return callbackRef.current.apply(this, args);
        },
        wait,
        { leading, trailing }
      );
    },
    [wait, leading, trailing] // eslint-disable-line
  );

  const throttled = usePersist(function (
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    // @ts-ignore
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

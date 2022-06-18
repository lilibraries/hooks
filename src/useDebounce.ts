import { useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";
import isObject from "./utils/isObject";

export interface DebounceOptions {
  wait?: number;
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  options?: number | DebounceOptions
) {
  let wait = 0;
  let maxWait = Infinity;
  let leading = false;
  let trailing = true;

  if (typeof options === "number") {
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
  const debouncedRef = useRef<ReturnType<typeof debounce>>();

  useMemo(
    () => {
      debouncedRef.current?.flush();
      debouncedRef.current = debounce(
        function (...args: Parameters<T>) {
          // @ts-ignore
          return callbackRef.current.apply(this, args);
        },
        wait,
        { maxWait, leading, trailing }
      );
    },
    [wait, maxWait, leading, trailing] // eslint-disable-line
  );

  const debounced = usePersist(function (
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    // @ts-ignore
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

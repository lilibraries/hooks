import { useCallback, useRef } from "react";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";

function createDebounceHook(throttle: boolean = false) {
  return function <T extends (...args: any[]) => any>(
    callback: T,
    options: number | { wait: number; leading?: boolean; trailing?: boolean }
  ) {
    let wait: number;
    let leading = false;
    let trailing = true;

    if (typeof options === "number") {
      wait = options;
    } else if (typeof options === "object" && options) {
      if ("wait" in options) {
        wait = +options.wait;
      }
      if ("leading" in options) {
        leading = !!options.leading;
      }
      if ("trailing" in options) {
        trailing = !!options.trailing;
      }
    }

    const thisRef = useRef<ThisType<T>>();
    const argsRef = useRef<Parameters<T>>();
    const resultRef = useRef<ReturnType<T>>();

    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const lastCallTimeRef = useRef<number>();
    const lastExecuteTimeRef = useRef<number>();

    const handler = usePersist(() => {
      const now = Date.now();
      const lastCallTime = lastCallTimeRef.current as number;
      const lastExecuteTime = lastExecuteTimeRef.current as number;
      const sinceLastCall = now - lastCallTime;
      const sinceLastExecute = now - lastExecuteTime;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (sinceLastCall >= wait || (throttle && sinceLastExecute >= wait)) {
        timerRef.current = undefined;
        lastCallTimeRef.current = undefined;

        if (trailing && argsRef.current) {
          lastExecuteTimeRef.current = now;
          resultRef.current = callback.apply(thisRef.current, argsRef.current);
        }
      } else {
        const lastCallRemaining = wait - sinceLastCall;
        const lastExecuteRemaining = wait - sinceLastExecute;
        const remaining = throttle
          ? Math.min(lastCallRemaining, lastExecuteRemaining)
          : lastCallRemaining;

        timerRef.current = setTimeout(handler, remaining);
      }
    });

    const debounced = usePersist(function (...args: Parameters<T>) {
      const now = Date.now();
      const lastCallTime = lastCallTimeRef.current;

      // @ts-ignore
      thisRef.current = this;
      argsRef.current = args;
      lastCallTimeRef.current = now;

      if (
        (lastCallTime === undefined || now - lastCallTime >= wait) &&
        timerRef.current === undefined
      ) {
        lastExecuteTimeRef.current = now;
        timerRef.current = setTimeout(handler, wait);

        if (leading) {
          resultRef.current = callback.apply(thisRef.current, argsRef.current);
        }
      }

      return resultRef.current;
    });

    const cancel = useCallback(() => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }

      thisRef.current = undefined;
      argsRef.current = undefined;
      lastCallTimeRef.current = undefined;
      lastExecuteTimeRef.current = undefined;
    }, []);

    const flush = usePersist(() => {
      if (timerRef.current !== undefined && argsRef.current) {
        resultRef.current = callback.apply(thisRef.current, argsRef.current);
        cancel();
      }
      return resultRef.current;
    });

    useUnmount(cancel);

    return [debounced, { flush, cancel }] as const;
  };
}

export default createDebounceHook;

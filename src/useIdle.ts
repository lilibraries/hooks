import "requestidlecallback";

import { useRef } from "react";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";

/**
 * Invoke a callback when the browser is idle. Uses `window.requestIdleCallback`
 * by default, falling back to `setTimeout` when unavailable.
 *
 * @param callback The callback invoked when idle.
 * @param options The options passed to `window.requestIdleCallback`.
 * @returns Returns a `[start, cancel]` tuple: `start` schedules the callback and `cancel` aborts it.
 */
function useIdle(callback: () => void, options?: IdleRequestOptions) {
  const timerRef = useRef<number | undefined>(undefined);
  const callbackRef = useLatestRef(callback);

  const cancel = usePersist(() => {
    if (timerRef.current !== undefined) {
      cancelIdleCallback(timerRef.current);
      timerRef.current = undefined;
    }
  });

  const start = usePersist(() => {
    cancel();
    timerRef.current = requestIdleCallback(() => {
      callbackRef.current();
    }, options);
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useIdle;

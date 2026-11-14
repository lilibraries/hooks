import { useDebugValue, useRef } from "react";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useThrottle, { type UseThrottleOptions } from "./useThrottle";
import useUpdate from "./useUpdate";

interface UseThrottledValueActions<T> {
  /** Apply the latest value immediately, or `finalValue` when it is specified. */
  flush: (finalValue?: T) => void;

  /** Abort the pending update. */
  cancel: () => void;
}

/**
 * Throttle a value.
 *
 * @param value The value to throttle.
 * @param options The throttle wait time (milliseconds), or an options object (same as `useThrottle`).
 * @returns Returns a `[throttledValue, actions]` tuple: `actions` keeps a stable identity and
 *   contains `flush`, which applies the latest value immediately (or `finalValue` if
 *   given), and `cancel`, which aborts the pending update.
 */
function useThrottledValue<T>(value: T, options?: number | UseThrottleOptions) {
  const valueRef = useLatestRef(value);
  const [throttledValue, setThrottledValue] = useSafeState(value);
  const [updateThrottledValue, { cancel }] = useThrottle(setThrottledValue, options);

  const flush = usePersist(function (finalValue?: T) {
    cancel();
    if (arguments.length > 0) {
      setThrottledValue(finalValue as T);
    } else {
      setThrottledValue(valueRef.current);
    }
  });

  useUpdate(() => {
    updateThrottledValue(value);
  }, [value]);

  const actionsRef = useRef<UseThrottledValueActions<T> | undefined>(undefined);

  if (!actionsRef.current) {
    actionsRef.current = { flush, cancel };
  }

  useDebugValue(throttledValue);

  return [throttledValue, actionsRef.current] as const;
}

export default useThrottledValue;

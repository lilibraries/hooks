import { useDebugValue } from "react";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useThrottle, { type UseThrottleOptions } from "./useThrottle";
import useUpdate from "./useUpdate";

/**
 * Throttle a value.
 *
 * @param value The value to throttle.
 * @param options The throttle wait time (milliseconds), or an options object (same as `useThrottle`).
 * @returns Returns a `[throttledValue, { flush, cancel }]` tuple.
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

  useDebugValue(throttledValue);

  return [throttledValue, { flush, cancel }] as const;
}

export default useThrottledValue;

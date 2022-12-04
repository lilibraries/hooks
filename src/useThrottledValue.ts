import { useDebugValue } from "react";
import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useLatestRef from "./useLatestRef";
import useThrottle, { ThrottleOptions } from "./useThrottle";

function useThrottledValue<T>(value: T, options?: number | ThrottleOptions) {
  const valueRef = useLatestRef(value);
  const [throttledValue, setThrottledValue] = useSafeState(value);
  const [updateThrottledValue, { cancel }] = useThrottle(
    setThrottledValue,
    options
  );

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

import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useLatestRef from "./useLatestRef";
import useThrottle, { ThrottleOptions } from "./useThrottle";

function useThrottled<T>(value: T, options?: number | ThrottleOptions) {
  const valueRef = useLatestRef(value);
  const [throttled, setThrottled] = useSafeState(value);
  const [changeDelay, { cancel }] = useThrottle(setThrottled, options);

  const flush = usePersist(function (finalValue?: T) {
    cancel();
    if (arguments.length > 0) {
      setThrottled(finalValue as T);
    } else {
      setThrottled(valueRef.current);
    }
  });

  useUpdate(
    () => {
      changeDelay(value);
    },
    [value] // eslint-disable-line
  );

  return [throttled, { flush, cancel }] as const;
}

export default useThrottled;

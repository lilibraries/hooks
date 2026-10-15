import { useDebugValue } from "react";

import useDebounce, { type UseDebounceOptions } from "./useDebounce";
import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useUpdate from "./useUpdate";

/**
 * Debounce a value.
 *
 * @param value The value to debounce.
 * @param options The debounce wait time (milliseconds), or an options object (same as `useDebounce`).
 * @returns Returns a `[debouncedValue, { flush, cancel }]` tuple.
 */
function useDebouncedValue<T>(value: T, options?: number | UseDebounceOptions) {
  const valueRef = useLatestRef(value);
  const [debouncedValue, setDebouncedValue] = useSafeState(value);
  const [updateDebouncedValue, { cancel }] = useDebounce(setDebouncedValue, options);

  const flush = usePersist(function (finalValue?: T) {
    cancel();
    if (arguments.length > 0) {
      setDebouncedValue(finalValue as T);
    } else {
      setDebouncedValue(valueRef.current);
    }
  });

  useUpdate(() => {
    updateDebouncedValue(value);
  }, [value]);

  useDebugValue(debouncedValue);

  return [debouncedValue, { flush, cancel }] as const;
}

export default useDebouncedValue;

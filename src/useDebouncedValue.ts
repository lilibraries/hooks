import { useDebugValue, useRef } from "react";

import useDebounce, { type UseDebounceOptions } from "./useDebounce";
import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useUpdate from "./useUpdate";

interface UseDebouncedValueActions<T> {
  /** Apply the latest value immediately, or `finalValue` when it is specified. */
  flush: (finalValue?: T) => void;

  /** Abort the pending update. */
  cancel: () => void;
}

/**
 * Debounce a value.
 *
 * @param value The value to debounce.
 * @param options The debounce wait time (milliseconds), or an options object (same as `useDebounce`).
 * @returns Returns a `[debouncedValue, actions]` tuple: `actions` keeps a stable identity and
 *   contains `flush`, which applies the latest value immediately (or `finalValue` if
 *   given), and `cancel`, which aborts the pending update.
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

  const actionsRef = useRef<UseDebouncedValueActions<T> | undefined>(undefined);

  if (!actionsRef.current) {
    actionsRef.current = { flush, cancel };
  }

  useDebugValue(debouncedValue);

  return [debouncedValue, actionsRef.current] as const;
}

export default useDebouncedValue;

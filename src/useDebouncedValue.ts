import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useLatestRef from "./useLatestRef";
import useDebounce, { DebounceOptions } from "./useDebounce";

function useDebouncedValue<T>(value: T, options?: number | DebounceOptions) {
  const valueRef = useLatestRef(value);
  const [debouncedValue, setDebouncedValue] = useSafeState(value);
  const [updateDebouncedValue, { cancel }] = useDebounce(
    setDebouncedValue,
    options
  );

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

  return [debouncedValue, { flush, cancel }] as const;
}

export default useDebouncedValue;

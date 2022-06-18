import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useLatestRef from "./useLatestRef";
import useDebounce, { DebounceOptions } from "./useDebounce";

function useDebounced<T>(value: T, options?: number | DebounceOptions) {
  const valueRef = useLatestRef(value);
  const [debounced, setDebounced] = useSafeState(value);
  const [changeDelay, { cancel }] = useDebounce(setDebounced, options);

  const flush = usePersist(function (finalValue?: T) {
    cancel();
    if (arguments.length > 0) {
      setDebounced(finalValue as T);
    } else {
      setDebounced(valueRef.current);
    }
  });

  useUpdate(
    () => {
      changeDelay(value);
    },
    [value] // eslint-disable-line
  );

  return [debounced, { flush, cancel }] as const;
}

export default useDebounced;

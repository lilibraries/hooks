import { useRef, useState } from "react";
import { is } from "./utils";
import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useLastest from "./useLastest";
import createDebounceHook from "./createDebounceHook";

function createDebouncedValueHook(throttle: boolean = false) {
  const useDebounce = createDebounceHook(throttle);

  return function <T>(
    value: T,
    options: number | { wait: number; leading?: boolean; trailing?: boolean }
  ) {
    const valueRef = useLastest(value);
    const [debouncedValue, setDebouncedValue] = useState(value);
    const debouncedValueRef = useRef(debouncedValue);

    function changeValue(newValue: T) {
      if (!is(debouncedValueRef.current, newValue)) {
        debouncedValueRef.current = newValue;
        setDebouncedValue(newValue);
      }
    }
    const [changeDelay, { cancel }] = useDebounce(changeValue, options);

    const flush = usePersist(function (finalValue?: T) {
      cancel();
      if (arguments.length > 0) {
        changeValue(finalValue as T);
      } else {
        changeValue(valueRef.current);
      }
    });

    useUpdate(
      () => {
        changeDelay(value);
      },
      [value] // eslint-disable-line
    );

    return [debouncedValue, { flush, cancel }] as const;
  };
}

export default createDebouncedValueHook;

import { useDebugValue } from "react";

import usePersist from "./usePersist";
import useSafeState from "./useSafeState";

/**
 * Manage a boolean state with three operations: toggle, set true, and set false.
 *
 * @param initialValue The initial value, defaults to `false`.
 * @returns Returns a `[value, { toggle, toggleOn, toggleOff }]` tuple.
 */
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useSafeState(!!initialValue);

  const toggle = usePersist((newValue?: boolean) => {
    if (newValue !== undefined) {
      setValue(!!newValue);
    } else {
      setValue((value) => !value);
    }
  });

  const toggleOn = usePersist(() => {
    setValue(true);
  });

  const toggleOff = usePersist(() => {
    setValue(false);
  });

  useDebugValue(value);

  return [value, { toggle, toggleOn, toggleOff }] as const;
}

export default useToggle;

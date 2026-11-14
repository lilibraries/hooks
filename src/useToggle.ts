import { useDebugValue, useRef } from "react";

import usePersist from "./usePersist";
import useSafeState from "./useSafeState";

interface UseToggleActions {
  /** Toggle the value, or set it to `newValue` (cast to boolean) when `newValue` is not `undefined`. */
  toggle: (newValue?: boolean) => void;

  /** Set the value to `true`. */
  toggleOn: () => void;

  /** Set the value to `false`. */
  toggleOff: () => void;
}

/**
 * Manage a boolean state with three operations: toggle, set true, and set false.
 *
 * @param initialValue The initial value, defaults to `false`.
 * @returns Returns a `[value, actions]` tuple. `actions` keeps a stable identity and
 *   contains `toggle`, `toggleOn`, and `toggleOff`.
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

  const actionsRef = useRef<UseToggleActions | undefined>(undefined);

  if (!actionsRef.current) {
    actionsRef.current = { toggle, toggleOn, toggleOff };
  }

  useDebugValue(value);

  return [value, actionsRef.current] as const;
}

export default useToggle;

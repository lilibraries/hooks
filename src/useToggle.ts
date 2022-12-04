import { useDebugValue } from "react";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";

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

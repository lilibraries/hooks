import { useState } from "react";
import usePersist from "./usePersist";

function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(!!initialValue);

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

  return [value, { toggle, toggleOn, toggleOff }] as const;
}

export default useToggle;

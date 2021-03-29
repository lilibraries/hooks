import { useCallback, useState } from "react";

function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(!!initialValue);

  const toggle = useCallback((newValue?: boolean) => {
    if (newValue !== undefined) {
      setValue(!!newValue);
    } else {
      setValue((value) => !value);
    }
  }, []);

  const toggleOn = useCallback(() => {
    setValue(true);
  }, []);

  const toggleOff = useCallback(() => {
    setValue(false);
  }, []);

  return [value, { toggle, toggleOn, toggleOff }] as const;
}

export default useToggle;

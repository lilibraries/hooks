import { useEffect } from "react";

function createMountHook(useHook: typeof useEffect) {
  return function (effect: () => void) {
    useHook(() => {
      effect();
    }, []);
  };
}

export default createMountHook;

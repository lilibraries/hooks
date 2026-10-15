import { useEffect, useRef } from "react";

/**
 * Run an effect when the component unmounts.
 *
 * @param effect The effect to run when the component unmounts.
 */
function useUnmount(effect: () => void) {
  const effectRef = useRef(effect);
  // Track the latest effect on every render so the newest function (not the first render's closure) runs on unmount
  effectRef.current = effect;

  useEffect(() => {
    return () => {
      effectRef.current();
    };
  }, []);
}

export default useUnmount;

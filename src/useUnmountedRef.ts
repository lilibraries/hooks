import { useEffect, useRef } from "react";

/**
 * Return a ref object for checking whether the component has unmounted.
 *
 * @returns `ref.current` is `true` if the component has unmounted, otherwise `false`.
 */
function useUnmountedRef() {
  const unmountedRef = useRef(false);

  useEffect(() => {
    unmountedRef.current = false;

    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return unmountedRef;
}

export default useUnmountedRef;

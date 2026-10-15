import { useEffect, useRef } from "react";

/**
 * Return a ref object for checking whether the component has mounted.
 *
 * @returns `ref.current` is `true` if the component has mounted, otherwise `false`.
 */
function useMountedRef() {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}

export default useMountedRef;

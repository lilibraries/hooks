import { useEffect, useRef } from "react";

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

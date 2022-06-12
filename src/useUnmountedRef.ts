import { useRef } from "react";
import useUnmount from "./useUnmount";

function useUnmountedRef() {
  const mountedRef = useRef(false);

  useUnmount(() => {
    mountedRef.current = true;
  });

  return mountedRef;
}

export default useUnmountedRef;

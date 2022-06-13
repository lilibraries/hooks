import { useRef } from "react";
import useUnmount from "./useUnmount";

function useUnmountedRef() {
  const unmountedRef = useRef(false);

  useUnmount(() => {
    unmountedRef.current = true;
  });

  return unmountedRef;
}

export default useUnmountedRef;

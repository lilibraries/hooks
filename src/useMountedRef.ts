import { useRef } from "react";
import useMount from "./useMount";

function useMountedRef() {
  const mountedRef = useRef(false);

  useMount(() => {
    mountedRef.current = true;
  });

  return mountedRef;
}

export default useMountedRef;

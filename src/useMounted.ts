import { useRef } from "react";
import useMount from "./useMount";

function useMounted() {
  const mounted = useRef(false);

  useMount(() => {
    mounted.current = true;
  });

  return mounted;
}

export default useMounted;

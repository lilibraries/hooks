import { useRef } from "react";

function useOnce(effect: () => void) {
  const calledRef = useRef(false);

  if (!calledRef.current) {
    effect();
    calledRef.current = true;
  }
}

export default useOnce;

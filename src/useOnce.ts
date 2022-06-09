import { useRef } from "react";

function useOnce(callback: () => void) {
  const calledRef = useRef(false);

  if (!calledRef.current) {
    callback();
    calledRef.current = true;
  }
}

export default useOnce;

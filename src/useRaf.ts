import { useCallback, useRef } from "react";
import useUnmount from "./useUnmount";
import usePersist from "./usePersist";

function useRaf(callback: () => void) {
  const timerRef = useRef<number>();
  const handler = usePersist(callback);

  const cancel = useCallback(() => {
    if (timerRef.current !== undefined) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const start = usePersist(() => {
    cancel();
    timerRef.current = requestAnimationFrame(() => {
      handler();
    });
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useRaf;

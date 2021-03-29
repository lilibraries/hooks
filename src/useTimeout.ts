import { useCallback, useRef } from "react";
import useUpdate from "./useUpdate";
import useUnmount from "./useUnmount";
import usePersist from "./usePersist";

function useTimeout(callback: () => void, ms: number) {
  const handler = usePersist(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const cancel = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const start = usePersist(() => {
    cancel();
    timerRef.current = setTimeout(handler, ms);
  });

  useUpdate(
    () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(handler, ms);
      }
    },
    [ms] // eslint-disable-line
  );

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useTimeout;

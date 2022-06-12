import { useRef } from "react";
import useUnmount from "./useUnmount";
import usePersist from "./usePersist";

function useTimeout(callback: () => void, delay?: number) {
  const handler = usePersist(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const cancel = usePersist(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  });

  const start = usePersist(() => {
    cancel();
    timerRef.current = setTimeout(handler, delay);
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useTimeout;

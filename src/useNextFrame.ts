import { useRef } from "react";
import raf from "raf";
import useUnmount from "./useUnmount";
import usePersist from "./usePersist";

function useNextFrame(callback: () => void) {
  const timerRef = useRef<number>();
  const handler = usePersist(callback);

  const cancel = usePersist(() => {
    if (timerRef.current !== undefined) {
      raf.cancel(timerRef.current);
      timerRef.current = undefined;
    }
  });

  const start = usePersist(() => {
    cancel();
    timerRef.current = raf(() => {
      timerRef.current = raf(handler);
    });
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useNextFrame;

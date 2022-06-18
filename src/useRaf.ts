import { useRef } from "react";
import raf from "raf";
import useUnmount from "./useUnmount";
import usePersist from "./usePersist";
import useLatestRef from "./useLatestRef";

function useRaf(callback: () => void) {
  const timerRef = useRef<number>();
  const callbackRef = useLatestRef(callback);

  const cancel = usePersist(() => {
    if (timerRef.current !== undefined) {
      raf.cancel(timerRef.current);
      timerRef.current = undefined;
    }
  });

  const start = usePersist(() => {
    cancel();
    timerRef.current = raf(() => {
      callbackRef.current();
    });
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useRaf;

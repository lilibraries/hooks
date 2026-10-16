import { useRef } from "react";

import usePersist from "./usePersist";
import useUnmount from "./useUnmount";

/**
 * Execute a callback after a delay.
 *
 * @param callback The callback to execute after the delay.
 * @param timeout The delay (milliseconds).
 * @returns Returns a `[start, cancel]` tuple: `start` begins the timer and `cancel` aborts it.
 */
function useTimeout(callback: () => void, timeout?: number) {
  const handler = usePersist(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancel = usePersist(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  });

  const start = usePersist(() => {
    cancel();
    timerRef.current = setTimeout(handler, timeout);
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useTimeout;

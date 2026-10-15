import { useRef } from "react";

import raf from "raf";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";

/**
 * Invoke a callback before the browser repaints, via `requestAnimationFrame`.
 *
 * @param callback The callback invoked before the browser repaints.
 * @returns Returns a `[start, cancel]` tuple.
 */
function useRaf(callback: () => void) {
  const timerRef = useRef<number | undefined>(undefined);
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

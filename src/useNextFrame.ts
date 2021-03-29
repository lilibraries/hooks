import { useCallback, useRef } from "react";
import useUnmount from "./useUnmount";
import usePersist from "./usePersist";

function useNextFrame(callback: () => void) {
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
    // Use `requestAnimationFrame` twice to ensure the `callback` is invoked
    // after the current painting in all browsers.
    // See: https://github.com/whatwg/html/issues/2569
    timerRef.current = requestAnimationFrame(() => {
      timerRef.current = requestAnimationFrame(handler);
    });
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useNextFrame;

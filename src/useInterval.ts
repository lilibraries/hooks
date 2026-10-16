import { useRef } from "react";

import useTimeout from "./useTimeout";

/**
 * Invoke a callback repeatedly.
 *
 * @param callback The callback to invoke repeatedly.
 * @param interval The interval (milliseconds).
 * @returns Returns a `[start, cancel]` tuple: `start` begins the loop, clearing any previous one, and `cancel` stops it.
 */
function useInterval(callback: () => void, interval?: number) {
  const startRef = useRef<(() => void) | undefined>(undefined);

  const [start, cancel] = useTimeout(() => {
    callback();
    startRef.current?.();
  }, interval);

  startRef.current = start;

  return [start, cancel] as const;
}

export default useInterval;

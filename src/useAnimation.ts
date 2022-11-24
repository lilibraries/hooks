import { useCallback, useRef } from "react";
import raf from "raf";
import useUnmount from "./useUnmount";
import usePersist from "./usePersist";
import useLatestRef from "./useLatestRef";

function useAnimation(
  callback: (percent: number) => void,
  options:
    | number
    | { duration: number; algorithm?: (percent: number) => number }
) {
  let duration: number;
  let algorithm: (percent: number) => number;

  if (typeof options === "number") {
    duration = options;
  } else if (options) {
    if (options.duration) {
      duration = +options.duration;
    }
    if (options.algorithm) {
      algorithm = options.algorithm;
    }
  }

  const timerRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const callbackRef = useLatestRef(callback);

  const step = usePersist((timestamp: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    let percent = duration > 0 ? elapsed / duration : 1;

    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    if (percent < 1) {
      timerRef.current = raf(step);
    }

    if (algorithm) {
      callbackRef.current(algorithm(percent));
    } else {
      callbackRef.current(percent);
    }
  });

  const cancel = useCallback(() => {
    if (timerRef.current !== undefined) {
      raf.cancel(timerRef.current);
      timerRef.current = undefined;
    }
    startTimeRef.current = undefined;
  }, []);

  const start = usePersist(() => {
    cancel();
    timerRef.current = raf(step);
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useAnimation;

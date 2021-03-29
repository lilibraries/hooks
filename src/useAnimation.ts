import { useCallback, useRef } from "react";
import useUnmount from "./useUnmount";
import usePersist from "./usePersist";

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
  } else if (typeof options === "object" && options !== null) {
    if ("duration" in options) {
      duration = +options.duration;
    }
    if (typeof options.algorithm === "function") {
      algorithm = options.algorithm;
    }
  }

  const timerRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const handler = usePersist(callback);

  const step = usePersist((timestamp: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    let percent = duration > 0 ? elapsed / duration : 1;

    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    if (percent < 1) {
      timerRef.current = requestAnimationFrame(step);
    }

    if (algorithm) {
      handler(algorithm(percent));
    } else {
      handler(percent);
    }
  });

  const cancel = useCallback(() => {
    if (timerRef.current !== undefined) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = undefined;
    }
    startTimeRef.current = undefined;
  }, []);

  const start = usePersist(() => {
    cancel();
    timerRef.current = requestAnimationFrame(step);
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useAnimation;

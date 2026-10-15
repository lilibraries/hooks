import { useCallback, useRef } from "react";

import isNumber from "lodash/isNumber";
import raf from "raf";
import warning from "warning";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";

interface UseAnimateOptions {
  duration: number;
  algorithm?: (percent: number) => number;
}

/**
 * Run JavaScript animations with this hook.
 *
 * @param callback The animation step function, receives a percentage number (0~1) as its first argument.
 * @param options The animation duration (milliseconds), or an options object.
 * @param options.duration The duration (milliseconds) in options-object form, required; ignored when a number is passed directly.
 * @param options.algorithm An optional easing function. The animation runs linearly by default; use this option to override that behavior.
 * @returns Returns a `[start, cancel]` tuple: `start` begins the animation and `cancel` aborts it.
 */
function useAnimate(callback: (percent: number) => void, options: number | UseAnimateOptions) {
  let duration: number = 0;
  let algorithm: (percent: number) => number;

  if (isNumber(options)) {
    duration = options;
  } else if (options) {
    if (options.duration) {
      duration = +options.duration;
    }
    if (options.algorithm) {
      algorithm = options.algorithm;
    }
  }

  warning(duration > 0, "[useAnimate] The `duration` option must be a positive number, but received `%s`.", duration);

  const timerRef = useRef(0);
  const startTimeRef = useRef(0);
  const stepRef = useRef<(timestamp: number) => void>(() => {});
  const callbackRef = useLatestRef(callback);

  const step = usePersist((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    let percent = duration > 0 ? elapsed / duration : 1;

    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    if (percent < 1) {
      timerRef.current = raf(stepRef.current);
    }

    if (algorithm) {
      callbackRef.current(algorithm(percent));
    } else {
      callbackRef.current(percent);
    }
  });

  stepRef.current = step;

  const cancel = useCallback(() => {
    if (timerRef.current) {
      raf.cancel(timerRef.current);
      timerRef.current = 0;
    }
    startTimeRef.current = 0;
  }, []);

  const start = usePersist(() => {
    cancel();
    timerRef.current = raf(step);
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useAnimate;

import { useDebugValue } from "react";

import isNumber from "lodash/isNumber";
import isObject from "lodash/isObject";
import warning from "warning";

import useSafeState from "./useSafeState";
import useTimeout from "./useTimeout";
import useUpdate from "./useUpdate";

interface UseDelayedValueOptions {
  delay: number;
  shouldDelay?: (value: any) => boolean;
  compare?: (x: any, y: any) => boolean;
}

/**
 * Delay updates to a value.
 *
 * @param value The value whose updates should be delayed.
 * @param options The delay time (milliseconds), or an options object.
 * @param options.delay The delay time (milliseconds), required.
 * @param options.compare A function to determine whether the new and old values are equal, defaults to `Object.is`.
 * @param options.shouldDelay A function to determine whether an update should be delayed; returning `false` updates immediately and synchronously.
 * @returns The delayed value.
 */
function useDelayedValue<T>(value: T, options: number | UseDelayedValueOptions) {
  let delay = 0;
  let compare = Object.is;
  let shouldDelay: (value: any) => boolean = () => true;

  if (isNumber(options)) {
    delay = options;
  } else if (isObject(options)) {
    delay = +options.delay;

    if (options.shouldDelay) {
      shouldDelay = options.shouldDelay;
    }
    if (options.compare) {
      compare = options.compare;
    }
  }

  warning(
    delay > 0,
    "[useDelayedValue] The `delay` option must be a positive number, but received `%s`.",
    delay,
  );

  const [state, setState] = useSafeState(value);
  const [update, cancelUpdate] = useTimeout(() => setState(value), delay);

  useUpdate(() => {
    if (!compare(value, state)) {
      if (shouldDelay(value)) {
        update();
      } else {
        cancelUpdate();
        setState(value);
      }
    } else {
      cancelUpdate();
    }
  }, [value]);

  useDebugValue(state);

  return state;
}

export default useDelayedValue;

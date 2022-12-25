import { useDebugValue } from "react";
import isNumber from "lodash/isNumber";
import isObject from "lodash/isObject";
import { warning } from "@lilib/utils";
import useUpdate from "./useUpdate";
import useTimeout from "./useTimeout";
import useSafeState from "./useSafeState";

export interface DelayedValueHookOptions {
  delay: number;
  include?: (value: any) => boolean;
  compare?: (x: any, y: any) => boolean;
}

function useDelayedValue<T>(
  value: T,
  options: number | DelayedValueHookOptions
) {
  let delay = 0;
  let include = (value: any) => true;
  let compare = Object.is;

  if (isNumber(options)) {
    delay = options;
  } else if (isObject(options)) {
    delay = +options.delay;

    if (options.include) {
      include = options.include;
    }
    if (options.compare) {
      compare = options.compare;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    warning(
      !isNumber(delay) || !(delay > 0),
      "You should provide a positive number as the delay time.",
      { scope: "useDelayedValue" }
    );
  }

  const [state, setState] = useSafeState(value);
  const [update, cancelUpdate] = useTimeout(() => setState(value), delay);

  useUpdate(() => {
    if (!compare(value, state)) {
      if (include(value)) {
        update();
      } else {
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

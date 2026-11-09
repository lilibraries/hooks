import { useDebugValue, useRef } from "react";

import isFunction from "lodash/isFunction";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useUnmountedRef from "./useUnmountedRef";

interface UseControllableStateOptions<T> {
  /** The controlled value. The state is controlled whenever `value` is not `undefined`. Keep it defined for the whole lifetime of the component; falling back to `undefined` turns the state into uncontrolled. */
  value?: T;
  /** The initial value used while the state is uncontrolled. It is ignored when `value` is provided and later changes to it do not reset the state. */
  defaultValue?: T;
  /** Called with the next value once it actually changes, in both controlled and uncontrolled modes. */
  onChange?: (value: T) => void;
}

type SetControllableState<T> = (nextState: T | ((prevState: T) => T)) => void;

/**
 * Unify a value that can be either controlled or uncontrolled, which is the
 * common requirement of form and overlay components.
 *
 * The state is controlled whenever `value` is not `undefined`: the returned
 * value always mirrors `value`, the internal state is not updated, and changes
 * are reported through `onChange`. Otherwise the state is uncontrolled: it
 * starts with `defaultValue`, changes are stored internally, and `onChange` is
 * still called. Switching between the two modes resumes from the latest value
 * of the previous mode.
 *
 * @param options The options object, see `UseControllableStateOptions`.
 * @returns Returns a `[state, setState]` tuple. `setState` accepts a new value
 *   or an updater function computed from the current value, calls `onChange`
 *   only when the value actually changes, and keeps a stable identity.
 */
function useControllableState<T>(
  options: UseControllableStateOptions<T> & { defaultValue: T },
): readonly [T, SetControllableState<T>];

function useControllableState<T>(
  options: UseControllableStateOptions<T> & { value: T },
): readonly [T, SetControllableState<T>];

function useControllableState<T>(
  options?: UseControllableStateOptions<T>,
): readonly [T | undefined, SetControllableState<T | undefined>];

function useControllableState<T>(options: UseControllableStateOptions<T> = {}) {
  const { value, defaultValue, onChange } = options;
  const isControlled = value !== undefined;

  // The initial state mirrors the controlled value so that switching to
  // uncontrolled right after mounting does not fall back to `defaultValue`.
  const [state, setState] = useSafeState<T | undefined>(() =>
    isControlled ? value : defaultValue,
  );

  const valueRef = useLatestRef(value);
  const stateRef = useLatestRef(state);
  const onChangeRef = useLatestRef(onChange);
  const unmountedRef = useUnmountedRef();

  // Remember the latest controlled value so that switching to uncontrolled
  // resumes from it instead of the stale internal state.
  const lastControlledValueRef = useRef<T | undefined>(value);
  if (isControlled) {
    lastControlledValueRef.current = value;
  }

  // Realign the internal state when switching from controlled to uncontrolled.
  // Adjusting state during render (the supported pattern for deriving state from
  // props) makes the very first uncontrolled render already return the latest
  // controlled value, instead of showing a stale value for one frame.
  const [wasControlled, setWasControlled] = useSafeState(isControlled);
  if (wasControlled !== isControlled) {
    setWasControlled(isControlled);
    if (!isControlled && lastControlledValueRef.current !== undefined) {
      setState(lastControlledValueRef.current);
    }
  }

  const setControllableState = usePersist(
    (nextState: T | undefined | ((prevState: T | undefined) => T | undefined)) => {
      if (unmountedRef.current) {
        return;
      }

      const controlledValue = valueRef.current;
      const prevState = controlledValue !== undefined ? controlledValue : stateRef.current;
      const nextValue = isFunction(nextState)
        ? (nextState as (prevState: T | undefined) => T | undefined)(prevState)
        : nextState;

      if (Object.is(nextValue, prevState)) {
        return;
      }

      if (controlledValue === undefined) {
        // Update the ref eagerly so that consecutive functional updates in the
        // same batch accumulate from the freshly computed value.
        stateRef.current = nextValue;
        setState(nextValue);
      }

      if (onChangeRef.current) {
        onChangeRef.current(nextValue as T);
      }
    },
  );

  const currentState = isControlled ? value : state;

  useDebugValue(currentState);

  return [currentState, setControllableState] as const;
}

export default useControllableState;

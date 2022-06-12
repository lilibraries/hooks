import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";

function useControllableState<S>(
  defaultState: S,
  controlledState?: S
): readonly [S, (newState: S) => void];

function useControllableState<S = undefined>(): readonly [
  S | undefined,
  (newState?: S | undefined) => void
];

function useControllableState<S>(defaultState?: S, controlledState?: S) {
  const isControlled = controlledState != null;
  const [state, setSafeState] = useSafeState(
    isControlled ? controlledState : defaultState
  );

  useUpdate(() => {
    if (isControlled) {
      setSafeState(controlledState);
    }
  }, [isControlled, controlledState]);

  const setState = usePersist((newState?: S) => {
    if (!isControlled) {
      setSafeState(newState);
    }
  });

  return [state, setState] as const;
}

export default useControllableState;

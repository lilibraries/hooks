import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import isFunction from "./utils/isFunction";

function useSetState<S extends object>(initialState: S | (() => S)) {
  const [state, setSafeState] = useSafeState(initialState);

  const setState = usePersist(
    (patch: Partial<S> | ((prevState: S) => Partial<S>)) => {
      setSafeState((prevState) => {
        const patchState = isFunction(patch) ? patch(prevState) : patch;
        return { ...prevState, ...patchState };
      });
    }
  );

  return [state, setState] as const;
}

export default useSetState;

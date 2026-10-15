import isFunction from "lodash/isFunction";

import usePersist from "./usePersist";
import useSafeState from "./useSafeState";

/**
 * Similar to the `this.setState` method of class components. Requires an object as the initial state, allows partial state updates, and merges the new state into the old one.
 *
 * @param initialState The initial state object.
 * @returns Returns a `[state, setState]` tuple.
 */
function useSetState<S extends object>(initialState: S | (() => S)) {
  const [state, setSafeState] = useSafeState(initialState);

  const setState = usePersist((patch: Partial<S> | ((prevState: S) => Partial<S>)) => {
    setSafeState((prevState) => {
      const patchState = isFunction(patch) ? patch(prevState) : patch;
      return { ...prevState, ...patchState };
    });
  });

  return [state, setState] as const;
}

export default useSetState;

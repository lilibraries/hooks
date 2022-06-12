import { useState, Dispatch, SetStateAction } from "react";
import usePersist from "./usePersist";
import useUnmountedRef from "./useUnmountedRef";

function useSafeState<S>(
  initialState: S | (() => S)
): readonly [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): readonly [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);

  const setSafeState = usePersist((newState: SetStateAction<S | undefined>) => {
    if (unmountedRef.current) {
      return;
    }
    setState(newState);
  });

  return [state, setSafeState] as const;
}

export default useSafeState;

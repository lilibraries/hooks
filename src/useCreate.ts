import { DependencyList, useRef } from "react";
import useMountedRef from "./useMountedRef";
import usePreviousRef from "./usePreviousRef";
import depsEqual from "./utils/depsEqual";

function useCreate<T>(create: () => T, deps: DependencyList = []): T {
  const mountedRef = useMountedRef();
  const prevDepsRef = usePreviousRef(deps);
  const valueRef = useRef<T>();

  if (
    !mountedRef.current ||
    (prevDepsRef.current && !depsEqual(prevDepsRef.current, deps))
  ) {
    valueRef.current = create();
  }

  return valueRef.current as T;
}

export default useCreate;

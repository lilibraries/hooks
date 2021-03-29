import { DependencyList, useRef } from "react";
import { areDepsEqual } from "./utils";
import useMounted from "./useMounted";
import usePrevious from "./usePrevious";

function useCreate<T>(create: () => T, deps: DependencyList = []): T {
  const mountedRef = useMounted();
  const previousDepsRef = usePrevious(deps);
  const valueRef = useRef<T>();

  if (!mountedRef.current || !areDepsEqual(previousDepsRef.current, deps)) {
    valueRef.current = create();
  }

  return valueRef.current as T;
}

export default useCreate;

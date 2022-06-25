import { useRef } from "react";
import deepEqual from "fast-deep-equal/es6/react";
import useMountedRef from "./useMountedRef";

function useMemoizedValue<T>(value: T): T {
  const resultRef = useRef(value);
  const mountedRef = useMountedRef();

  if (mountedRef.current) {
    if (!deepEqual(resultRef.current, value)) {
      resultRef.current = value;
    }
  }

  return resultRef.current;
}

export default useMemoizedValue;

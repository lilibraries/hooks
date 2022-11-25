import { useRef } from "react";
import deepEqual from "fast-deep-equal";
import useMountedRef from "./useMountedRef";

function useMemoizedValue<T>(
  value: T,
  compare?: (x: any, y: any) => boolean
): T {
  const resultRef = useRef(value);
  const mountedRef = useMountedRef();

  if (mountedRef.current) {
    if (!(compare || deepEqual)(resultRef.current, value)) {
      resultRef.current = value;
    }
  }

  return resultRef.current;
}

export default useMemoizedValue;

import { useDebugValue, useRef } from "react";
import isEqual from "lodash/isEqual";
import useMountedRef from "./useMountedRef";

function useMemoizedValue<T>(
  value: T,
  compare: (x: any, y: any) => boolean = isEqual
): T {
  const resultRef = useRef(value);
  const mountedRef = useMountedRef();

  if (mountedRef.current) {
    if (!compare(resultRef.current, value)) {
      resultRef.current = value;
    }
  }

  useDebugValue(resultRef.current === value ? "Latest" : "Previous");

  return resultRef.current;
}

export default useMemoizedValue;

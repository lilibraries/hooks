import { useDebugValue, useRef } from "react";

import isEqual from "lodash/isEqual";

import useMountedRef from "./useMountedRef";

/**
 * Return the previous value while the value stays unchanged, using deep comparison by default.
 *
 * @param value The current value.
 * @param compare The comparison function to determine whether the new and old values are equal, defaults to deep comparison.
 * @returns The previous value if unchanged, otherwise the current value.
 */
function useMemoizedValue<T>(value: T, compare: (x: any, y: any) => boolean = isEqual): T {
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

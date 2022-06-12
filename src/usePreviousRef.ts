import { useRef } from "react";
import useMountedRef from "./useMountedRef";

function usePreviousRef<T>(value: T) {
  const mountedRef = useMountedRef();
  const latestRef = useRef(value);
  const previousRef = useRef<T>();

  if (mountedRef.current) {
    previousRef.current = latestRef.current;
  }
  latestRef.current = value;

  return previousRef;
}

export default usePreviousRef;

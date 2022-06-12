import { useRef } from "react";

function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatestRef;

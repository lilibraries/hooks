import { useRef } from "react";

function useLastest<T>(value: T) {
  const valueRef = useRef(value);
  valueRef.current = value;
  return valueRef;
}

export default useLastest;

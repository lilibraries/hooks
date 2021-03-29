import { useRef } from "react";

function usePrevious<T>(value: T) {
  const lastestRef = useRef(value);
  const previousRef = useRef(value);

  previousRef.current = lastestRef.current;
  lastestRef.current = value;

  return previousRef;
}

export default usePrevious;

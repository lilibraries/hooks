import { useRef } from "react";

/**
 * Return a ref object whose `current` property points to the value from the previous update (kept while the value is unchanged), `undefined` on the first render.
 *
 * @param value The current value.
 * @returns Returns a ref object whose `current` is the value from the previous update.
 */
function usePreviousRef<T>(value: T) {
  const currentRef = useRef(value);
  const previousRef = useRef<T | undefined>(undefined);

  if (value !== currentRef.current) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef;
}

export default usePreviousRef;

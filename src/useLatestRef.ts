import { useRef } from "react";

/**
 * Return a ref object whose `current` property always points to the latest value.
 * Typical use case: reading the latest value inside long-lived callbacks (timers,
 * event listeners) to avoid stale closures.
 *
 * @param value The latest value.
 * @returns Returns a ref object whose `current` always points to the latest `value`.
 */
function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatestRef;

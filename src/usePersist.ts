import { useRef } from "react";

import useLatestRef from "./useLatestRef";

/**
 * Return the same function identity regardless of how the `callback` argument changes. The returned function behaves exactly like `callback`.
 * Typical use case: the callback must go into a dependency array (e.g. `useEffect`), yet calls should always use the latest logic.
 *
 * @param callback The callback function.
 * @returns Returns a stable function.
 */
function usePersist<T extends (...args: any[]) => any>(callback: T) {
  const callbackRef = useLatestRef(callback);
  const reCallbackRef = useRef<((...args: Parameters<T>) => ReturnType<T>) | undefined>(undefined);

  if (!reCallbackRef.current) {
    reCallbackRef.current = function (this: any, ...args) {
      return callbackRef.current.apply(this, args);
    };
  }

  return reCallbackRef.current;
}

export default usePersist;

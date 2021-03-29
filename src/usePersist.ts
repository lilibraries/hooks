import { useRef } from "react";
import useLastest from "./useLastest";

function usePersist<T extends (...args: any[]) => any>(callback: T): T {
  const lastestCallbackRef = useLastest(callback);
  const persistedCallbackRef = useRef<T>();

  if (persistedCallbackRef.current === undefined) {
    persistedCallbackRef.current = function (this: any, ...args) {
      return lastestCallbackRef.current.apply(this, args);
    } as T;
  }

  return persistedCallbackRef.current;
}

export default usePersist;

import { useRef } from "react";
import useLatestRef from "./useLatestRef";

function usePersist<T extends (...args: any[]) => any>(callback: T): T {
  const resultRef = useRef<T>();
  const callbackRef = useLatestRef(callback);

  if (!resultRef.current) {
    resultRef.current = function (this: any, ...args) {
      return callbackRef.current.apply(this, args);
    } as T;
  }

  return resultRef.current;
}

export default usePersist;

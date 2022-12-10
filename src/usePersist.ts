import { useRef } from "react";
import useLatestRef from "./useLatestRef";

function usePersist<T extends (...args: any[]) => any>(callback: T) {
  const resultRef = useRef<(...args: Parameters<T>) => ReturnType<T>>();
  const callbackRef = useLatestRef(callback);

  if (!resultRef.current) {
    resultRef.current = function (this: any, ...args) {
      return callbackRef.current.apply(this, args);
    };
  }

  return resultRef.current;
}

export default usePersist;

import "requestidlecallback";
import { useRef } from "react";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";
import useLatestRef from "./useLatestRef";

function useIdle(callback: () => void, options?: IdleRequestOptions) {
  const timerRef = useRef<number>();
  const callbackRef = useLatestRef(callback);

  const cancel = usePersist(() => {
    if (timerRef.current !== undefined) {
      cancelIdleCallback(timerRef.current);
      timerRef.current = undefined;
    }
  });

  const start = usePersist(() => {
    cancel();
    timerRef.current = requestIdleCallback(() => {
      callbackRef.current();
    }, options);
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useIdle;

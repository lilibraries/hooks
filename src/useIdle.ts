import { useCallback, useRef } from "react";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";

function requestIdleCallbackPolyfill(callback: () => void) {
  return setTimeout(callback, 1);
}
function cancelIdleCallbackPolyfill(id: ReturnType<typeof setTimeout>) {
  clearTimeout(id);
}

let requestIdleCallback = requestIdleCallbackPolyfill;
let cancelIdleCallback = cancelIdleCallbackPolyfill;

if (typeof window !== "undefined") {
  if (
    (window as any).requestIdleCallback &&
    (window as any).cancelIdleCallback
  ) {
    requestIdleCallback = (window as any).requestIdleCallback;
    cancelIdleCallback = (window as any).cancelIdleCallback;
  }
}

function useIdle(callback: () => void) {
  const timerRef = useRef<ReturnType<typeof requestIdleCallback>>();
  const handler = usePersist(callback);

  const cancel = useCallback(() => {
    if (timerRef.current !== undefined) {
      cancelIdleCallback(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const start = usePersist(() => {
    cancel();
    timerRef.current = requestIdleCallback(() => {
      handler();
    });
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useIdle;

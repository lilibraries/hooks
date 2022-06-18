import { useRef } from "react";
import usePersist from "./usePersist";
import useUnmount from "./useUnmount";
import useLatestRef from "./useLatestRef";

const hasNative =
  typeof window !== "undefined" &&
  !!window.requestIdleCallback &&
  !!window.cancelIdleCallback;

const requestIdleCallback = (callback: () => void) => {
  if (hasNative) {
    return window.requestIdleCallback(callback);
  } else {
    return +setTimeout(callback, 1);
  }
};

const cancelIdleCallback = (id: number) => {
  if (hasNative) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

function useIdle(callback: () => void) {
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
    });
  });

  useUnmount(cancel);

  return [start, cancel] as const;
}

export default useIdle;

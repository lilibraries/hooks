import { useEffect } from "react";
import usePersist from "./usePersist";

function useEventListener<T extends EventTarget, E extends Event>(
  target: T | null,
  type: string,
  listener: (this: T, event: E) => any,
  options?: boolean | AddEventListenerOptions
) {
  let capture: boolean | undefined;
  let once: boolean | undefined;
  let passive: boolean | undefined;

  if (typeof options === "boolean") {
    capture = options;
  } else if (typeof options === "object" && options !== null) {
    if ("capture" in options) capture = !!options.capture;
    if ("once" in options) once = !!options.once;
    if ("passive" in options) passive = !!options.passive;
  }

  const handler = usePersist(listener);

  useEffect(() => {
    if (target && target.addEventListener && target.removeEventListener) {
      target.addEventListener(type, handler as EventListener, {
        capture,
        once,
        passive,
      });

      return () => {
        target.removeEventListener(type, handler as EventListener, {
          capture,
        });
      };
    }
  }, [target, type, handler, capture, once, passive]);
}

export default useEventListener;

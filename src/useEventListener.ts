import usePersist from "./usePersist";
import useTargetEffect from "./useTargetEffect";
import isObject from "./utils/isObject";
import getTarget from "./utils/getTarget";
import isEventTarget from "./utils/isEventTarget";
import { TargetCreator } from "./types";

function useEventListener<
  T extends EventTarget = EventTarget,
  E extends Event = Event
>(
  target: TargetCreator<T>,
  eventName: string,
  listener: (event: E) => void,
  options?: boolean | AddEventListenerOptions
) {
  let capture: boolean | undefined;
  let once: boolean | undefined;
  let passive: boolean | undefined;

  if (typeof options === "boolean") {
    capture = options;
  } else if (isObject(options)) {
    if (options.capture !== undefined) {
      capture = !!options.capture;
    }
    if (options.once !== undefined) {
      once = !!options.once;
    }
    if (options.passive !== undefined) {
      passive = !!options.passive;
    }
  }

  const handler = usePersist(listener) as EventListener;

  useTargetEffect(
    () => {
      const element = getTarget(target);

      if (isEventTarget(element)) {
        element.addEventListener(eventName, handler, {
          capture,
          once,
          passive,
        });

        return () => {
          element.removeEventListener(eventName, handler, {
            capture,
          });
        };
      }
    },
    [eventName, capture, once, passive],
    [target]
  );
}

export default useEventListener;

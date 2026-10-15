import type { RefObject } from "react";

import isBoolean from "lodash/isBoolean";
import isObject from "lodash/isObject";

import usePersist from "./usePersist";
import useRefEffect from "./useRefEffect";
import isEventTarget from "./utils/isEventTarget";
import unref from "./utils/unref";

/**
 * Attach an event listener to a target.
 *
 * @param target The event target or its ref.
 * @param eventName The event name.
 * @param listener The event listener.
 * @param options A boolean or `AddEventListenerOptions` object.
 */
function useEventListener<T extends EventTarget = EventTarget, E extends Event = Event>(
  target: T | RefObject<T | null>,
  eventName: string,
  listener: (event: E) => void,
  options?: boolean | AddEventListenerOptions,
) {
  let capture: boolean | undefined;
  let once: boolean | undefined;
  let passive: boolean | undefined;

  if (isBoolean(options)) {
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

  useRefEffect(() => {
    const element = unref(target);

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
  }, [eventName, capture, once, passive, target]);
}

export default useEventListener;

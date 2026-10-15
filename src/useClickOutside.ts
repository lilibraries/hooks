import type { RefObject } from "react";

import useLatestRef from "./useLatestRef";
import useRefEffect from "./useRefEffect";
import unref from "./utils/unref";

interface UseClickOutsideOptions {
  container?: Element | RefObject<Element | null>;
  eventName?: string | string[];
}

/**
 * Fires a callback when a click happens outside the target area.
 *
 * @param target The target area: a single element or element ref, or an array of them.
 * @param listener The callback invoked when a click happens outside the target area.
 * @param options The options object.
 * @param options.container The element (or its ref) that receives the event listener, defaults to `document`.
 * @param options.eventName The event name(s) to listen for, defaults to `"mousedown"`.
 */
function useClickOutside<E extends Event = Event>(
  target: Node | RefObject<Node | null> | (Node | RefObject<Node | null>)[],
  listener: (event: E) => void,
  options?: UseClickOutsideOptions,
) {
  const { container, eventName = "mousedown" } = options || {};
  const eventNames = Array.isArray(eventName) ? eventName : [eventName];
  const listenerRef = useLatestRef(listener);
  // Resolve target elements only when the event fires, so lazily mounted targets
  // (refs assigned just before the event) still work correctly
  const targetsRef = useLatestRef(Array.isArray(target) ? target : [target]);

  useRefEffect(() => {
    function handler(event: Event) {
      let hasElement = false;

      for (const item of targetsRef.current) {
        const element = unref(item);
        if (element) {
          hasElement = true;
          if (event.target instanceof Node && element.contains(event.target)) {
            return;
          }
        }
      }

      // Fire the callback only when at least one target element is valid
      // (all-invalid targets are treated as not ready)
      if (hasElement) {
        listenerRef.current(event as E);
      }
    }

    const containerElement = unref(container) || document;

    for (const eventName of eventNames) {
      containerElement.addEventListener(eventName, handler);
    }

    return () => {
      for (const eventName of eventNames) {
        containerElement.removeEventListener(eventName, handler);
      }
    };
  }, [...eventNames, container]);
}

export default useClickOutside;

import type { RefObject } from "react";

import useLatestRef from "./useLatestRef";
import useRefEffect from "./useRefEffect";
import unref from "./utils/unref";

/**
 * Fire a callback when the focus moves into or out of the target area.
 *
 * The callback fires only when the focus crosses the boundary of the target
 * area, so moving the focus between elements of the target area (or between
 * multiple targets) does not fire it.
 *
 * @param target The target area: a single element or element ref, or an array
 *   of them. A target that has focus itself counts as within.
 * @param listener The callback invoked with whether the focus is within the
 *   target area, and the event that reports the crossing: `focusin` on an
 *   element inside the area when the focus enters, `focusout` on it when the
 *   focus leaves.
 */
function useFocusWithin<E extends FocusEvent = FocusEvent>(
  target: Node | RefObject<Node | null> | (Node | RefObject<Node | null>)[],
  listener: (isFocusWithin: boolean, event: E) => void,
) {
  const listenerRef = useLatestRef(listener);
  const targetsRef = useLatestRef(Array.isArray(target) ? target : [target]);

  useRefEffect(() => {
    function getElements() {
      const elements: Node[] = [];

      for (const item of targetsRef.current) {
        const element = unref(item);
        if (element) {
          elements.push(element);
        }
      }

      return elements;
    }

    function contains(elements: Node[], node: EventTarget | null) {
      return node instanceof Node && elements.some((element) => element.contains(node));
    }

    function handler(event: FocusEvent) {
      const elements = getElements();
      if (!elements.length) {
        return;
      }

      // Only the event fired on an element inside the target area describes a
      // crossing; the counterpart event of the outside element is ignored.
      if (!contains(elements, event.target)) {
        return;
      }
      // The focus only moved within the target area.
      if (contains(elements, event.relatedTarget)) {
        return;
      }

      listenerRef.current(event.type === "focusin", event as E);
    }

    document.addEventListener("focusin", handler);
    document.addEventListener("focusout", handler);

    return () => {
      document.removeEventListener("focusin", handler);
      document.removeEventListener("focusout", handler);
    };
  }, []);
}

export default useFocusWithin;

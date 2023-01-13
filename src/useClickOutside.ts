import { EffectTarget, getEffectTarget } from "@lilib/utils";
import useLatestRef from "./useLatestRef";
import useTargetEffect from "./useTargetEffect";

export interface ClickOutsideHookOptions {
  container?: EffectTarget<Element>;
  eventName?: string | string[];
}

function useClickOutside<E extends Event = Event>(
  target: EffectTarget<Node> | EffectTarget<Node>[],
  listener: (event: E) => void,
  options?: ClickOutsideHookOptions
) {
  const targets = Array.isArray(target) ? target : [target];
  const { container, eventName = "mousedown" } = options || {};
  const eventNames = Array.isArray(eventName) ? eventName : [eventName];
  const listenerRef = useLatestRef(listener);

  useTargetEffect(
    () => {
      const targetElements = targets.map(getEffectTarget).filter(Boolean);

      if (!targetElements.length) {
        return;
      }

      function handler(event: any) {
        for (const element of targetElements) {
          if (element && element.contains(event.target)) {
            return;
          }
        }
        listenerRef.current(event);
      }

      const containerElement = getEffectTarget(container) || document;

      for (const eventName of eventNames) {
        containerElement.addEventListener(eventName, handler);
      }

      return () => {
        for (const eventName of eventNames) {
          containerElement.removeEventListener(eventName, handler);
        }
      };
    },
    eventNames,
    targets
  );
}

export default useClickOutside;

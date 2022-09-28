import useLatestRef from "./useLatestRef";
import useTargetEffect from "./useTargetEffect";
import getTarget from "./utils/getTarget";
import { TargetCreator } from "./types";

function useClickAway<E extends Event = Event>(
  target: TargetCreator<Node> | TargetCreator<Node>[],
  listener: (event: E) => void,
  options?: {
    container?: TargetCreator<Element>;
    eventName?: string | string[];
  }
) {
  const targets = Array.isArray(target) ? target : [target];
  const { container, eventName = "mousedown" } = options || {};
  const eventNames = Array.isArray(eventName) ? eventName : [eventName];
  const listenerRef = useLatestRef(listener);

  useTargetEffect(
    () => {
      function handler(event: any) {
        for (const element of targets.map(getTarget)) {
          if (element && element.contains(event.target)) {
            return;
          }
        }
        listenerRef.current(event);
      }

      const el = getTarget(container) || document;

      for (const eventName of eventNames) {
        el.addEventListener(eventName, handler);
      }

      return () => {
        for (const eventName of eventNames) {
          el.removeEventListener(eventName, handler);
        }
      };
    },
    eventNames,
    targets
  );
}

export default useClickAway;

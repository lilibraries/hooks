import { useDebugValue, useRef } from "react";

import useEventListener from "./useEventListener";
import useRafState from "./useRafState";
import inBrowser from "./utils/inBrowser";

interface UsePointerPositionOptions {
  /** Whether to track the pointer. Defaults to `true`. */
  enabled?: boolean;
}

interface PointerPosition {
  /** Horizontal position in CSS pixels, relative to the viewport's left edge. */
  readonly x: number;
  /** Vertical position in CSS pixels, relative to the viewport's top edge. */
  readonly y: number;
  /** The kind of pointer: `"mouse"`, `"pen"`, `"touch"`, or `""` when unknown. */
  readonly pointerType: string;
}

function isSamePosition(previous: PointerPosition | undefined, next: PointerPosition) {
  return (
    !!previous &&
    previous.x === next.x &&
    previous.y === next.y &&
    previous.pointerType === next.pointerType
  );
}

/**
 * Track the position of the pointer in viewport coordinates.
 *
 * @param options The options object.
 * @param options.enabled Whether to track the pointer. Defaults to `true`.
 * @returns Returns the latest pointer position, or `undefined` before the first pointer
 *   event and outside the browser.
 */
function usePointerPosition(options?: UsePointerPositionOptions): PointerPosition | undefined {
  const { enabled = true } = options || {};

  const [position, setPosition] = useRafState<PointerPosition>();
  const lastPositionRef = useRef<PointerPosition | undefined>(undefined);

  const windowRef = {
    get current() {
      return inBrowser && enabled ? window : null;
    },
  };

  const update = (event: PointerEvent) => {
    if (!enabled) {
      return;
    }

    const next = {
      x: event.clientX,
      y: event.clientY,
      pointerType: event.pointerType,
    };

    if (isSamePosition(lastPositionRef.current, next)) {
      return;
    }

    lastPositionRef.current = next;
    setPosition(next);
  };

  useEventListener<Window, PointerEvent>(windowRef, "pointermove", update, { passive: true });
  useEventListener<Window, PointerEvent>(windowRef, "pointerdown", update, { passive: true });

  useDebugValue(position);

  return position;
}

export default usePointerPosition;

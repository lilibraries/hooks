import { useDebugValue, useRef, type RefObject } from "react";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useRefEffect from "./useRefEffect";
import useSafeState from "./useSafeState";
import useTimeout from "./useTimeout";
import isNonNegativeNumber from "./utils/isNonNegativeNumber";
import unref from "./utils/unref";
import warn from "./utils/warn";

interface UseHoverOptions {
  /** Delay (milliseconds) before reporting `true` after the pointer enters. Defaults to `0`. */
  enterDelay?: number;
  /** Delay (milliseconds) before reporting `false` after the pointer leaves. Defaults to `0`. */
  leaveDelay?: number;
}

/**
 * Detect whether the pointer hovers over one of the targets.
 *
 * All targets form a single hover area: moving the pointer between them is not
 * a leave, and with `leaveDelay` even a gap between them can be crossed.
 *
 * @param target The hovered target or its ref, or an array of them.
 * @param options The options object.
 * @param options.enterDelay The delay (milliseconds) before reporting `true` after the pointer enters, defaults to `0`.
 * @param options.leaveDelay The delay (milliseconds) before reporting `false` after the pointer leaves, defaults to `0`.
 * @returns Returns `true` if the pointer hovers over any of the targets, otherwise `false`.
 */
function useHover(
  target: Element | RefObject<Element | null> | (Element | RefObject<Element | null>)[],
  options?: UseHoverOptions,
) {
  const { enterDelay = 0, leaveDelay = 0 } = options || {};

  warn(
    isNonNegativeNumber(enterDelay),
    "[useHover] The `enterDelay` option must be a non-negative number, but received `%s`.",
    enterDelay,
  );
  warn(
    isNonNegativeNumber(leaveDelay),
    "[useHover] The `leaveDelay` option must be a non-negative number, but received `%s`.",
    leaveDelay,
  );

  const enterTimeout = isNonNegativeNumber(enterDelay) ? enterDelay : 0;
  const leaveTimeout = isNonNegativeNumber(leaveDelay) ? leaveDelay : 0;

  const targets = Array.isArray(target) ? target : [target];
  const [hovered, setHovered] = useSafeState(false);
  const enterTimeoutRef = useLatestRef(enterTimeout);
  const leaveTimeoutRef = useLatestRef(leaveTimeout);

  // The decided value, written synchronously: an enter and a leave can be
  // dispatched in the same task, before either of them is committed.
  const desiredRef = useRef(false);
  // An enter delay is running, so moving to another target must not restart it.
  const enterPendingRef = useRef(false);
  // Elements the pointer is currently over.
  const insideRef = useRef(new Set<Element>());

  const commit = usePersist((next: boolean) => {
    if (desiredRef.current === next) {
      return;
    }
    desiredRef.current = next;
    setHovered(next);
  });

  const [startEnter, cancelEnter] = useTimeout(() => {
    enterPendingRef.current = false;
    commit(true);
  }, enterTimeout);
  const [startLeave, cancelLeave] = useTimeout(() => commit(false), leaveTimeout);

  const cancelPendingEnter = usePersist(() => {
    enterPendingRef.current = false;
    cancelEnter();
  });

  useRefEffect(() => {
    const elements: Element[] = [];

    for (const item of targets) {
      const element = unref(item);
      if (element) {
        elements.push(element);
      }
    }

    function isInsideArea(node: EventTarget | null) {
      return node instanceof Node && elements.some((element) => element.contains(node));
    }

    // An element taken out of the document receives no `mouseleave`.
    function forgetDisconnected() {
      for (const element of insideRef.current) {
        if (!element.isConnected) {
          insideRef.current.delete(element);
        }
      }
    }

    function enter(element: Element) {
      // The pointer may come back before the leave delay elapses.
      cancelLeave();
      insideRef.current.add(element);
      // A pending enter delay keeps running while the pointer moves between targets.
      if (desiredRef.current || enterPendingRef.current) {
        return;
      }
      if (enterTimeoutRef.current > 0) {
        enterPendingRef.current = true;
        startEnter();
      } else {
        commit(true);
      }
    }

    function leave(relatedTarget: EventTarget | null) {
      forgetDisconnected();
      // Another target of the area was entered: the area is still hovered.
      if (isInsideArea(relatedTarget) || insideRef.current.size > 0) {
        return;
      }
      cancelPendingEnter();
      if (!desiredRef.current) {
        return;
      }
      if (leaveTimeoutRef.current > 0) {
        startLeave();
      } else {
        commit(false);
      }
    }

    function handleEnter(event: Event) {
      enter(event.currentTarget as Element);
    }

    function handleLeave(event: Event) {
      insideRef.current.delete(event.currentTarget as Element);
      leave((event as MouseEvent).relatedTarget);
    }

    // Targets that were removed, replaced or detached are no longer hovered.
    let removed = false;
    for (const element of insideRef.current) {
      if (!elements.includes(element) || !element.isConnected) {
        insideRef.current.delete(element);
        removed = true;
      }
    }
    if (removed) {
      leave(null);
    }

    for (const element of elements) {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      for (const element of elements) {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, targets);

  useDebugValue(hovered);

  return hovered;
}

export default useHover;

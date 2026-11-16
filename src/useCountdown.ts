import { useDebugValue, useRef } from "react";

import useEventListener from "./useEventListener";
import useLatestRef from "./useLatestRef";
import useLayoutMount from "./useLayoutMount";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useTimeout from "./useTimeout";
import useUnmountedRef from "./useUnmountedRef";
import inBrowser from "./utils/inBrowser";
import isFiniteNumber from "./utils/isFiniteNumber";
import isPositiveNumber from "./utils/isPositiveNumber";
import warn from "./utils/warn";

interface UseCountdownOptions {
  /** The absolute deadline as a timestamp (epoch milliseconds); takes precedence over `duration`. */
  deadline?: number;

  /** The duration (milliseconds), converted to a deadline when the countdown starts. */
  duration?: number;

  /**
   * The interval (milliseconds) between two state updates, defaults to `1000`. It only
   * controls how often `remainingTime` is refreshed: the value is always recomputed from
   * the deadline, so a longer interval never makes the countdown drift.
   */
  interval?: number;

  /** Whether to start counting down on mount, defaults to `true`. */
  autoStart?: boolean;

  /** Called once when the deadline of a countdown target is reached. */
  onEnd?: () => void;
}

interface UseCountdownActions {
  /**
   * Start, or restart, counting down to `deadline` or `duration`, falling back to the hook
   * options. It clears any previous countdown first.
   */
  start: (options?: { deadline?: number; duration?: number }) => void;

  /** Freeze `remainingTime` until `resume()` is called. Pausing a finished countdown does nothing. */
  pause: () => void;

  /** Continue counting down from the frozen `remainingTime`. Does nothing unless paused. */
  resume: () => void;
}

/**
 * Count down to a deadline and return the remaining time in milliseconds.
 *
 * The countdown is driven by the deadline rather than by decrementing a counter on every
 * tick, so a throttled background tab never falls behind, and it re-synchronizes as soon
 * as the page becomes visible or focused again.
 *
 * @param options The options object.
 * @param options.deadline The absolute deadline as a timestamp (epoch milliseconds); takes
 * precedence over `duration`.
 * @param options.duration The duration (milliseconds), converted to a deadline when the
 * countdown starts.
 * @param options.interval The interval (milliseconds) between two state updates, defaults
 * to `1000`. It only controls how often `remainingTime` is refreshed.
 * @param options.autoStart Whether to start counting down on mount, defaults to `true`.
 * @param options.onEnd Called once when the deadline of a countdown target is reached,
 * including when the deadline has already passed when the countdown starts.
 * @returns Returns a `[remainingTime, actions]` tuple: `remainingTime` is the remaining
 * time in milliseconds and is never negative; `actions` keeps a stable identity and
 * contains `start`, which starts or restarts the countdown, `pause`, and `resume`. Whether
 * the countdown is paused is not part of the returned value, so keep track of it yourself
 * when the UI needs it.
 */
function useCountdown(options?: UseCountdownOptions) {
  const { deadline, duration, interval, autoStart = true, onEnd } = options || {};

  warn(
    interval === undefined || isPositiveNumber(interval),
    "[useCountdown] The `interval` option must be a positive number, but received `%s`.",
    interval,
  );

  const tickInterval = isPositiveNumber(interval) ? interval : 1000;

  const [remainingTime, setRemainingTime] = useSafeState<number>(() =>
    isFiniteNumber(duration) ? Math.max(duration, 0) : 0,
  );

  const remainingTimeRef = useRef(remainingTime);
  // The deadline the remaining time is computed from. `Infinity` means no countdown has
  // been started yet; `resume()` rewrites it, so it is not a stable target identity.
  const deadlineRef = useRef(Number.POSITIVE_INFINITY);
  // The target the current countdown was started for: restarting the same one must not
  // emit `onEnd` again, starting a different one must.
  const targetRef = useRef(Number.NaN);
  const pausedRef = useRef(false);
  const endedRef = useRef(false);
  const onEndRef = useLatestRef(onEnd);
  const unmountedRef = useUnmountedRef();
  const timerRef = useRef<{ start: () => void; cancel: () => void } | undefined>(undefined);

  const commit = usePersist((next: number) => {
    // Update the ref eagerly so repeated reads before the next render see the new value.
    remainingTimeRef.current = next;
    setRemainingTime(next);
  });

  const emitEnd = usePersist(() => {
    if (endedRef.current || unmountedRef.current) {
      return;
    }
    endedRef.current = true;
    onEndRef.current?.();
  });

  const tick = usePersist(() => {
    const deadline = deadlineRef.current;
    if (pausedRef.current || !Number.isFinite(deadline)) {
      return;
    }

    const next = Math.max(deadline - Date.now(), 0);

    if (next === 0) {
      // Cancel this loop before `commit` / `emitEnd`: a re-entrant restart (from `onEnd`, or
      // from a layout effect when `commit` re-renders synchronously) must keep the timer it
      // attaches, and a tick still queued after an event-driven synchronization must be dropped.
      timerRef.current?.cancel();
      if (remainingTimeRef.current !== 0) {
        commit(0);
      }
      emitEnd();
      // Do not re-arm: a finished countdown must stop waking this instance up. This is why
      // the loop is a self-scheduled timeout instead of `useInterval`, which always re-arms
      // after the callback returns.
      return;
    }

    if (next !== remainingTimeRef.current) {
      commit(next);
    }

    timerRef.current?.start();
  });

  const [startTicking, cancelTicking] = useTimeout(tick, tickInterval);
  timerRef.current = { start: startTicking, cancel: cancelTicking };

  const start = usePersist((next?: { deadline?: number; duration?: number }) => {
    let resolvedDeadline: number | undefined;

    if (next && next.deadline !== undefined) {
      resolvedDeadline = next.deadline;
    } else if (next && next.duration !== undefined) {
      resolvedDeadline = Date.now() + next.duration;
    } else if (deadline !== undefined) {
      resolvedDeadline = deadline;
    } else if (duration !== undefined) {
      resolvedDeadline = Date.now() + duration;
    }

    if (resolvedDeadline === undefined || !Number.isFinite(resolvedDeadline)) {
      warn(false, "[useCountdown] Either `deadline` or `duration` must be a finite number.");
      return;
    }

    // A different target resets the guard, restarting the same one does not, so a
    // StrictMode remount never emits `onEnd` twice for the same countdown.
    if (resolvedDeadline !== targetRef.current) {
      targetRef.current = resolvedDeadline;
      endedRef.current = false;
    }

    deadlineRef.current = resolvedDeadline;
    pausedRef.current = false;

    const remaining = Math.max(resolvedDeadline - Date.now(), 0);

    if (remaining === 0) {
      // Cancel before `commit` so a re-entrant restart keeps the timer it attaches.
      cancelTicking();
      commit(remaining);
      emitEnd();
    } else {
      commit(remaining);
      startTicking();
    }
  });

  const pause = usePersist(() => {
    const deadline = deadlineRef.current;
    if (pausedRef.current || !Number.isFinite(deadline)) {
      return;
    }

    const next = Math.max(deadline - Date.now(), 0);
    if (next === 0) {
      cancelTicking();
      commit(0);
      emitEnd();
      return;
    }

    pausedRef.current = true;
    commit(next);
    cancelTicking();
  });

  const resume = usePersist(() => {
    if (!pausedRef.current) {
      return;
    }

    pausedRef.current = false;

    const remaining = remainingTimeRef.current;
    if (remaining === 0) {
      // Defensive: `pause()` never freezes at zero, but a zero remaining must not re-arm the loop.
      emitEnd();
      return;
    }

    deadlineRef.current = Date.now() + remaining;
    commit(remaining);
    startTicking();
  });

  useLayoutMount(() => {
    if (autoStart) {
      start();
    }
  });

  const documentRef = useRef<Document | null>(inBrowser ? document : null);
  const windowRef = useRef<Window | null>(inBrowser ? window : null);

  useEventListener(documentRef, "visibilitychange", tick);
  useEventListener(windowRef, "pageshow", tick);
  useEventListener(windowRef, "focus", tick);

  const actionsRef = useRef<UseCountdownActions | undefined>(undefined);

  if (!actionsRef.current) {
    actionsRef.current = { start, pause, resume };
  }

  useDebugValue(remainingTime);

  return [remainingTime, actionsRef.current] as const;
}

export default useCountdown;

import { useDebugValue, useRef, type Dispatch, type SetStateAction } from "react";

import isFunction from "lodash/isFunction";

import useMount from "./useMount";
import usePersist from "./usePersist";
import useRaf from "./useRaf";
import useSafeState from "./useSafeState";
import useUnmountedRef from "./useUnmountedRef";

// Reduce the captured array (not the ref) so React may replay the updater safely.
function applyUpdates<S>(state: S, updates: SetStateAction<S>[]) {
  return updates.reduce<S>((previous, update) => {
    return isFunction(update) ? (update as (previous: S) => S)(previous) : update;
  }, state);
}

/**
 * Same usage as `React.useState`, but the updates made within one animation frame are merged and committed once, on the next frame.
 * Use it for sources that fire more often than a frame where only the latest value in a frame matters, e.g. streamed messages or raw pointer events.
 *
 * @param initialState The initial state, or a function returning it.
 * @returns Returns a `[state, setState]` tuple: `setState` takes a value or an updater and commits on the next frame.
 */
function useRafState<S>(initialState: S | (() => S)): readonly [S, Dispatch<SetStateAction<S>>];

function useRafState<S = undefined>(): readonly [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
];

function useRafState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useSafeState<S | undefined>(initialState);
  const updatesRef = useRef<SetStateAction<S | undefined>[]>([]);
  const scheduledRef = useRef(false);

  const [startRaf] = useRaf(() => {
    const updates = updatesRef.current;
    // Drain and unschedule first, so updates queued while React re-renders schedule a new frame.
    updatesRef.current = [];
    scheduledRef.current = false;

    setState((previous) => applyUpdates(previous, updates));
  });

  const setRafState = usePersist((update: SetStateAction<S | undefined>) => {
    if (unmountedRef.current) {
      return;
    }

    const updates = updatesRef.current;
    const last = updates.length - 1;
    if (last >= 0 && !isFunction(update) && !isFunction(updates[last])) {
      // Consecutive plain values overwrite each other; keeping only the last one bounds
      // the queue while animation frames are paused (the document is hidden).
      updates[last] = update;
    } else {
      updates.push(update);
    }

    // `startRaf()` replaces the pending frame, so schedule only when idle; otherwise
    // continuous input would postpone the commit indefinitely.
    if (!scheduledRef.current) {
      scheduledRef.current = true;
      startRaf();
    }
  });

  // `useRaf` cancels the pending frame on teardown (StrictMode remount, Activity), which
  // leaves the flag stale: re-arm it so updates queued before that are still committed.
  useMount(() => {
    scheduledRef.current = false;
    if (updatesRef.current.length > 0) {
      scheduledRef.current = true;
      startRaf();
    }
  });

  useDebugValue(state);

  return [state, setRafState] as const;
}

export default useRafState;

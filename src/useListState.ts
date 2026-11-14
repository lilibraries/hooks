import { useDebugValue, useRef } from "react";

import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";

interface UseListStateActions<T> {
  /** Replace the whole list, or update it from the previous list. The updater must be pure and may be called more than once. */
  set: (nextState: T[] | ((prevState: T[]) => T[])) => void;

  /** Append items to the end. */
  push: (...items: T[]) => void;

  /** Insert items at the beginning, keeping their order. */
  unshift: (...items: T[]) => void;

  /** Remove and return the last item. */
  pop: () => T | undefined;

  /** Remove and return the first item. */
  shift: () => T | undefined;

  /** Replace the item at the given index. */
  setAt: (index: number, item: T) => void;

  /** Remove and return the item at the given index. */
  removeAt: (index: number) => T | undefined;

  /** Insert items before the given index; `index` may equal the current length. */
  insertAt: (index: number, ...items: T[]) => void;

  /** Move the item at `from` so that it lands at index `to`; the list length is unchanged. */
  move: (from: number, to: number) => void;

  /** Remove every item equal to `item`. */
  remove: (item: T) => void;

  /** Remove all items. */
  clear: () => void;
}

/**
 * Manage an array state with `set`, two-end insertion (`push`, `unshift`),
 * two-end removal (`pop`, `shift`), index operations (`setAt`, `removeAt`,
 * `insertAt`), reordering (`move`), value-based removal (`remove`), and
 * clearing (`clear`).
 *
 * Removal that targets a single item returns what it removed: `pop`, `shift`
 * and `removeAt` return the removed item. Batch removals (`remove`, `clear`)
 * return nothing. Returned values reflect the latest list, so consecutive calls
 * in the same batch are accurate.
 *
 * Every operation is a no-op when it would not change the list: indexes out of
 * range are ignored and the same list reference is returned, which avoids
 * re-rendering.
 *
 * @param initialState The initial list, or a function returning it. Defaults to
 *   an empty array. The function is evaluated lazily and must be pure, because
 *   React may invoke it more than once in StrictMode.
 * @returns Returns a `[list, actions]` tuple. `actions` keeps a stable identity
 *   and contains eleven operations, each of which starts from the latest list.
 */
function useListState<T>(initialState?: T[] | (() => T[])): readonly [T[], UseListStateActions<T>] {
  const [list, setList] = useSafeState<T[]>(() => {
    return typeof initialState === "function" ? initialState() : (initialState ?? []);
  });
  const listRef = useLatestRef(list);

  // Compute twice on purpose: once now to advance the ref eagerly for
  // same-batch reads, and once inside React's updater so that a render that
  // rebases or replays pending updates is not overwritten. Both calls must be
  // pure, and a no-op returns the previous list so nothing is dispatched.
  const commit = (compute: (prevList: T[]) => T[]) => {
    const prevList = listRef.current;
    const nextList = compute(prevList);

    if (!Object.is(nextList, prevList)) {
      listRef.current = nextList;
      setList(compute);
    }
  };

  const set = usePersist((nextState: T[] | ((prevState: T[]) => T[])) => {
    commit((prevList) => (typeof nextState === "function" ? nextState(prevList) : nextState));
  });

  const push = usePersist((...items: T[]) => {
    if (items.length > 0) {
      commit((prevList) => [...prevList, ...items]);
    }
  });

  const unshift = usePersist((...items: T[]) => {
    if (items.length > 0) {
      commit((prevList) => [...items, ...prevList]);
    }
  });

  const pop = usePersist((): T | undefined => {
    const prevState = listRef.current;

    if (prevState.length > 0) {
      const removedItem = prevState[prevState.length - 1];
      commit((prevList) => (prevList.length > 0 ? prevList.slice(0, -1) : prevList));
      return removedItem;
    }
  });

  const shift = usePersist((): T | undefined => {
    const prevState = listRef.current;

    if (prevState.length > 0) {
      const removedItem = prevState[0];
      commit((prevList) => (prevList.length > 0 ? prevList.slice(1) : prevList));
      return removedItem;
    }
  });

  const setAt = usePersist((index: number, item: T) => {
    if (!Number.isInteger(index)) {
      return;
    }

    commit((prevList) => {
      if (index < 0 || index >= prevList.length || Object.is(prevList[index], item)) {
        return prevList;
      }
      const nextList = prevList.slice();
      nextList[index] = item;
      return nextList;
    });
  });

  const removeAt = usePersist((index: number): T | undefined => {
    const prevState = listRef.current;

    if (Number.isInteger(index) && index >= 0 && index < prevState.length) {
      const removedItem = prevState[index];
      commit((prevList) => {
        if (index >= prevList.length) {
          return prevList;
        }
        const nextList = prevList.slice();
        nextList.splice(index, 1);
        return nextList;
      });
      return removedItem;
    }
  });

  const insertAt = usePersist((index: number, ...items: T[]) => {
    if (!Number.isInteger(index) || items.length === 0) {
      return;
    }

    commit((prevList) => {
      if (index < 0 || index > prevList.length) {
        return prevList;
      }
      const nextList = prevList.slice();
      nextList.splice(index, 0, ...items);
      return nextList;
    });
  });

  const move = usePersist((from: number, to: number) => {
    if (!Number.isInteger(from) || !Number.isInteger(to)) {
      return;
    }

    commit((prevList) => {
      const { length } = prevList;

      if (from === to || from < 0 || from >= length || to < 0 || to >= length) {
        return prevList;
      }
      const nextList = prevList.slice();
      const [movedItem] = nextList.splice(from, 1);
      nextList.splice(to, 0, movedItem);
      return nextList;
    });
  });

  const remove = usePersist((item: T) => {
    commit((prevList) => {
      const nextList = prevList.filter((prevItem) => !Object.is(prevItem, item));
      return nextList.length === prevList.length ? prevList : nextList;
    });
  });

  const clear = usePersist(() => {
    commit((prevList) => (prevList.length > 0 ? [] : prevList));
  });

  const actionsRef = useRef<UseListStateActions<T> | undefined>(undefined);

  if (!actionsRef.current) {
    actionsRef.current = {
      set,
      push,
      unshift,
      pop,
      shift,
      setAt,
      removeAt,
      insertAt,
      move,
      remove,
      clear,
    };
  }

  useDebugValue(list, (current) => `${current.length} item(s)`);

  return [list, actionsRef.current] as const;
}

export default useListState;

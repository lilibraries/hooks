# useListState

Manage an array state with positional operations, reordering and value-based removal.

## API

```ts
function useListState<T>(initialState?: T[] | (() => T[])): [
  list: T[],
  actions: {
    set: (nextState: T[] | ((prevState: T[]) => T[])) => void;
    push: (...items: T[]) => void;
    unshift: (...items: T[]) => void;
    pop: () => T | undefined;
    shift: () => T | undefined;
    setAt: (index: number, item: T) => void;
    removeAt: (index: number) => T | undefined;
    insertAt: (index: number, ...items: T[]) => void;
    move: (from: number, to: number) => void;
    remove: (item: T) => void;
    clear: () => void;
  },
];
```

Parameters:

- **`initialState`:** The initial list, or a function that returns it. Defaults to an empty array. The function is evaluated lazily and must be pure, because React may invoke it more than once in StrictMode.

Results:

- **`list`:** The current list.
- **`actions`:** Actions object with a stable identity. Each action starts from the latest list, so consecutive calls in the same batch work as expected.
  - **`actions.set`:** Replace the whole list, or update it from the previous list. An updater function must be pure and may be called more than once. Unlike `useSetState`, this replaces instead of merging.
  - **`actions.push`:** Append items to the end.
  - **`actions.unshift`:** Insert items at the beginning, keeping their order.
  - **`actions.pop`:** Remove and return the last item, or `undefined` when the list is empty.
  - **`actions.shift`:** Remove and return the first item, or `undefined` when the list is empty.
  - **`actions.setAt`:** Replace the item at the given index. Similar to `Array.prototype.with`, but an out-of-range index is a no-op instead of throwing a `RangeError`.
  - **`actions.removeAt`:** Remove and return the item at the given index, or `undefined` when the index is out of range.
  - **`actions.insertAt`:** Insert items before the given index. `index` may equal the current length, which is the same as `push`.
  - **`actions.move`:** Move the item at `from` so that it lands at index `to`. The list length is unchanged.
  - **`actions.remove`:** Remove every item equal to `item`.
  - **`actions.clear`:** Remove all items.

## Notes

- Out-of-range or non-integer indexes, and any operation that would not change the list, are no-ops: the same list reference is returned and no re-render is triggered.
- Returned values reflect the list known at call time; if an uncommitted `startTransition` is replayed on a different base, `pop` / `shift` / `removeAt` may return an item that differs from the one actually removed.
- `remove` matches items with `Object.is`, so object items must be the same reference as the one in the list; a mismatched `remove` does nothing. Prefer primitive items such as ids.

## Example

The following example manages a task list: adding tasks, moving them up or down, removing a single task and clearing them all.

```tsx
import { useState } from "react";

import { useListState } from "@lilib/hooks";

function Example() {
  const [draft, setDraft] = useState("");
  const [tasks, { push, removeAt, move, clear }] = useListState(["Write docs", "Review tests"]);

  const addTask = () => {
    const task = draft.trim();
    if (task) {
      push(task);
      setDraft("");
    }
  };

  return (
    <>
      <div>
        <input
          value={draft}
          placeholder="New task"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTask();
            }
          }}
        />{" "}
        <button onClick={addTask}>Add</button> <button onClick={clear}>Clear all</button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{" "}
            <button disabled={index === 0} onClick={() => move(index, index - 1)}>
              Up
            </button>{" "}
            <button disabled={index === tasks.length - 1} onClick={() => move(index, index + 1)}>
              Down
            </button>{" "}
            <button onClick={() => removeAt(index)}>Remove</button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default Example;
```

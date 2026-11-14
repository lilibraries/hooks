import { StrictMode } from "react";
import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useListState from "../src/useListState";

describe("useListState", () => {
  it("defaults to an empty array", () => {
    const { result } = renderHook(() => useListState<number>());
    expect(result.current[0]).toEqual([]);
  });

  it("accepts an initial array", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("evaluates the function form of the initial state lazily", () => {
    const factory = jest.fn(() => [1, 2]);
    const { result, rerender } = renderHook(() => useListState(factory));
    const callsAfterMount = factory.mock.calls.length;

    rerender();

    expect(factory).toHaveBeenCalledTimes(callsAfterMount);
    expect(result.current[0]).toEqual([1, 2]);
  });

  it("set replaces the whole list", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;

    act(() => actions.set([4]));

    expect(result.current[0]).toEqual([4]);
  });

  it("set supports updates computed from the previous list", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;

    act(() => actions.set((prevState) => prevState.filter((item) => item > 1)));

    expect(result.current[0]).toEqual([2, 3]);
  });

  it("set keeps the same reference when the updater returns the previous list", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [list, actions] = result.current;

    act(() => actions.set((prevState) => prevState));

    expect(result.current[0]).toBe(list);
  });

  it("consecutive set updates compute from the latest list", () => {
    const { result } = renderHook(() => useListState([1]));
    const [, actions] = result.current;

    act(() => {
      actions.set((prevState) => [...prevState, 2]);
      actions.set((prevState) => [...prevState, 3]);
    });

    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("push appends items to the end", () => {
    const { result } = renderHook(() => useListState([1]));
    const [, actions] = result.current;

    act(() => actions.push(2, 3));

    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("consecutive push calls accumulate", () => {
    const { result } = renderHook(() => useListState([1]));
    const [, actions] = result.current;

    act(() => {
      actions.push(2);
      actions.push(3);
    });

    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("unshift inserts items at the beginning keeping their order", () => {
    const { result } = renderHook(() => useListState([3]));
    const [, actions] = result.current;

    act(() => actions.unshift(1, 2));

    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("push and unshift without items are no-ops", () => {
    const { result } = renderHook(() => useListState([1]));
    const [list, actions] = result.current;

    act(() => {
      actions.push();
      actions.unshift();
    });

    expect(result.current[0]).toBe(list);
  });

  it("pop removes and returns the last item", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;
    let removed: number | undefined;

    act(() => {
      removed = actions.pop();
    });

    expect(removed).toBe(3);
    expect(result.current[0]).toEqual([1, 2]);
  });

  it("shift removes and returns the first item", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;
    let removed: number | undefined;

    act(() => {
      removed = actions.shift();
    });

    expect(removed).toBe(1);
    expect(result.current[0]).toEqual([2, 3]);
  });

  it("pop and shift return undefined for an empty list", () => {
    const { result } = renderHook(() => useListState<number>([]));
    const [list, actions] = result.current;
    let popped: number | undefined;
    let shifted: number | undefined;

    act(() => {
      popped = actions.pop();
      shifted = actions.shift();
    });

    expect(popped).toBeUndefined();
    expect(shifted).toBeUndefined();
    expect(result.current[0]).toBe(list);
  });

  it("consecutive pop calls return the items actually removed", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;
    let first: number | undefined;
    let second: number | undefined;

    act(() => {
      first = actions.pop();
      second = actions.pop();
    });

    expect(first).toBe(3);
    expect(second).toBe(2);
    expect(result.current[0]).toEqual([1]);
  });

  it("consecutive actions of different kinds in the same batch see the latest list", () => {
    const { result } = renderHook(() => useListState([1, 2]));
    const [, actions] = result.current;
    let popped: number | undefined;

    act(() => {
      actions.push(3);
      popped = actions.pop();
      actions.unshift(0);
    });

    expect(popped).toBe(3);
    expect(result.current[0]).toEqual([0, 1, 2]);
  });

  it("setAt replaces the item at the index", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;

    act(() => actions.setAt(1, 9));

    expect(result.current[0]).toEqual([1, 9, 3]);
  });

  it("setAt with the same item is a no-op", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [list, actions] = result.current;

    act(() => actions.setAt(1, 2));

    expect(result.current[0]).toBe(list);
  });

  it("removeAt removes and returns the item at the index", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;
    let removed: number | undefined;

    act(() => {
      removed = actions.removeAt(1);
    });

    expect(removed).toBe(2);
    expect(result.current[0]).toEqual([1, 3]);
  });

  it("consecutive removeAt calls return the items actually removed", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;
    let first: number | undefined;
    let second: number | undefined;

    act(() => {
      first = actions.removeAt(0);
      second = actions.removeAt(0);
    });

    expect(first).toBe(1);
    expect(second).toBe(2);
    expect(result.current[0]).toEqual([3]);
  });

  it("insertAt inserts at the beginning, in the middle and at the end", () => {
    const { result } = renderHook(() => useListState([1, 4]));
    const [, actions] = result.current;

    act(() => actions.insertAt(0, 0));
    expect(result.current[0]).toEqual([0, 1, 4]);

    act(() => actions.insertAt(2, 2, 3));
    expect(result.current[0]).toEqual([0, 1, 2, 3, 4]);

    act(() => actions.insertAt(result.current[0].length, 5));
    expect(result.current[0]).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("index operations with out-of-range indexes are no-ops", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [list, actions] = result.current;
    let removed: number | undefined;

    act(() => {
      actions.setAt(-1, 9);
      actions.setAt(3, 9);
      removed = actions.removeAt(-1);
      actions.removeAt(3);
      actions.insertAt(-1, 9);
      actions.insertAt(4, 9);
      actions.insertAt(0);
    });

    expect(removed).toBeUndefined();
    expect(result.current[0]).toBe(list);
  });

  it("index operations with non-integer indexes are no-ops", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [list, actions] = result.current;
    let removed: number | undefined;

    act(() => {
      actions.setAt(1.5, 9);
      removed = actions.removeAt(1.5);
      actions.insertAt(1.5, 9);
      actions.move(1.5, 0);
    });

    expect(removed).toBeUndefined();
    expect(result.current[0]).toBe(list);
  });

  it("move moves an item backwards and forwards", () => {
    const { result } = renderHook(() => useListState([1, 2, 3, 4]));
    const [, actions] = result.current;

    act(() => actions.move(0, 2));
    expect(result.current[0]).toEqual([2, 3, 1, 4]);

    act(() => actions.move(3, 1));
    expect(result.current[0]).toEqual([2, 4, 3, 1]);
  });

  it("move with the same or an out-of-range index is a no-op", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [list, actions] = result.current;

    act(() => {
      actions.move(1, 1);
      actions.move(-1, 0);
      actions.move(0, 3);
      actions.move(3, 0);
    });

    expect(result.current[0]).toBe(list);
  });

  it("remove deletes every matching item", () => {
    const target = { id: 1 };
    const other = { id: 2 };
    const { result } = renderHook(() => useListState([target, other, target]));
    const [, actions] = result.current;

    act(() => actions.remove(target));

    expect(result.current[0]).toHaveLength(1);
    expect(result.current[0][0]).toBe(other);
  });

  it("remove does not match a different object with the same shape", () => {
    const target = { id: 1 };
    const { result } = renderHook(() => useListState([target]));
    const [list, actions] = result.current;

    act(() => actions.remove({ id: 1 }));

    expect(result.current[0]).toBe(list);
  });

  it("remove without a match is a no-op", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [list, actions] = result.current;

    act(() => actions.remove(9));

    expect(result.current[0]).toBe(list);
  });

  it("clear removes all items", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]));
    const [, actions] = result.current;

    act(() => actions.clear());

    expect(result.current[0]).toEqual([]);
  });

  it("clear on an empty list is a no-op", () => {
    const { result } = renderHook(() => useListState<number>([]));
    const [list, actions] = result.current;

    act(() => actions.clear());

    expect(result.current[0]).toBe(list);
  });

  it("no-op actions do not re-render", () => {
    let renders = 0;
    const { result } = renderHook(() => {
      renders += 1;
      return useListState([1, 2, 3]);
    });
    const [list, actions] = result.current;
    renders = 0;

    act(() => {
      actions.set(list);
      actions.set((prevState) => prevState);
      actions.setAt(0, 1);
      actions.setAt(9, 1);
      actions.insertAt(1.5, 1);
      actions.insertAt(0);
      actions.removeAt(9);
      actions.move(0, 0);
      actions.remove(9);
      actions.push();
      actions.unshift();
    });

    expect(result.current[0]).toBe(list);
    expect(renders).toBe(0);

    // Self-check: make sure the counter observes renders at all.
    act(() => actions.push(4));
    expect(renders).toBe(1);
  });

  it("returns a new list reference when the list changes", () => {
    const { result } = renderHook(() => useListState([1]));
    const [list, actions] = result.current;

    act(() => actions.push(2));

    expect(result.current[0]).not.toBe(list);
  });

  it("actions identity is stable across rerenders", () => {
    const { result, rerender } = renderHook(() => useListState([1]));
    const [, actions] = result.current;

    rerender();

    expect(result.current[1]).toBe(actions);
  });

  it("calling actions after unmount does not throw or warn", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result, unmount } = renderHook(() => useListState([1]));
    const [, actions] = result.current;

    unmount();

    expect(() => {
      act(() => {
        actions.push(2);
        actions.pop();
        actions.clear();
      });
    }).not.toThrow();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("works under StrictMode", () => {
    const { result } = renderHook(() => useListState([1, 2, 3]), { wrapper: StrictMode });
    const [, actions] = result.current;
    let removed: number | undefined;

    act(() => {
      removed = actions.pop();
    });

    expect(removed).toBe(3);
    expect(result.current[0]).toEqual([1, 2]);
  });
});

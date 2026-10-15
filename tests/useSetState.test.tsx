import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useSetState from "../src/useSetState";

interface State {
  a: number;
  b?: string;
  c?: boolean;
}

describe("useSetState", () => {
  it("returns the initial state object", () => {
    const { result } = renderHook(() => useSetState<State>({ a: 1 }));
    expect(result.current[0]).toEqual({ a: 1 });
  });

  it("supports the function form of the initial state", () => {
    const { result } = renderHook(() =>
      useSetState<State>(() => {
        return { a: 2 };
      }),
    );
    expect(result.current[0]).toEqual({ a: 2 });
  });

  it("partial updates merge with the old state", () => {
    const { result } = renderHook(() => useSetState<State>({ a: 1, b: "x" }));
    const [, setState] = result.current;

    act(() => setState({ c: true }));
    expect(result.current[0]).toEqual({ a: 1, b: "x", c: true });
  });

  it("updating an existing key overrides the old value", () => {
    const { result } = renderHook(() => useSetState<State>({ a: 1, b: "x" }));
    const [, setState] = result.current;

    act(() => setState({ a: 100 }));
    expect(result.current[0]).toEqual({ a: 100, b: "x" });
  });

  it("supports function updates computed from the old state", () => {
    const { result } = renderHook(() => useSetState<State>({ a: 1 }));
    const [, setState] = result.current;

    act(() => setState((prev) => ({ a: prev.a + 1 })));
    expect(result.current[0]).toEqual({ a: 2 });
  });

  it("the old state received by a function update is the pre-merge state", () => {
    const { result } = renderHook(() => useSetState<State>({ a: 1, b: "x" }));
    const [, setState] = result.current;
    let received: State | null = null;

    act(() =>
      setState((prev) => {
        received = prev;
        return { a: prev.a + 1 };
      }),
    );

    expect(received).toEqual({ a: 1, b: "x" });
    expect(result.current[0]).toEqual({ a: 2, b: "x" });
  });

  it("consecutive updates compute from the latest state", () => {
    const { result } = renderHook(() => useSetState<State>({ a: 0 }));
    const [, setState] = result.current;

    act(() => {
      setState((prev) => ({ a: prev.a + 1 }));
      setState((prev) => ({ a: prev.a + 1 }));
      setState((prev) => ({ a: prev.a + 1 }));
    });

    expect(result.current[0]).toEqual({ a: 3 });
  });

  it("each update returns a new object without mutating the old one", () => {
    const { result } = renderHook(() => useSetState<State>({ a: 1 }));
    const [initialState, setState] = result.current;

    act(() => setState({ a: 2 }));

    expect(initialState).toEqual({ a: 1 });
    expect(result.current[0]).toEqual({ a: 2 });
    expect(result.current[0]).not.toBe(initialState);
  });

  it("setState identity is stable", () => {
    const { result, rerender } = renderHook(() => useSetState<State>({ a: 1 }));
    const [, setState] = result.current;

    rerender();

    expect(result.current[1]).toBe(setState);
  });
});

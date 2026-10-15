import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useToggle from "../src/useToggle";

describe("useToggle", () => {
  it("default initial value is false", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it("can specify an initial value", () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it("the initial value is normalized to a boolean", () => {
    const { result } = renderHook(() => useToggle(1 as unknown as boolean));
    expect(result.current[0]).toBe(true);
  });

  it("toggle() switches between true/false", () => {
    const { result } = renderHook(() => useToggle());
    const [, { toggle }] = result.current;

    act(() => toggle());
    expect(result.current[0]).toBe(true);

    act(() => toggle());
    expect(result.current[0]).toBe(false);
  });

  it("toggle(newValue) sets the state explicitly", () => {
    const { result } = renderHook(() => useToggle(true));
    const [, { toggle }] = result.current;

    act(() => toggle(false));
    expect(result.current[0]).toBe(false);

    act(() => toggle(true));
    expect(result.current[0]).toBe(true);
  });

  it("toggle(newValue) normalizes the argument", () => {
    const { result } = renderHook(() => useToggle(false));
    const [, { toggle }] = result.current;

    act(() => toggle("truthy" as unknown as boolean));
    expect(result.current[0]).toBe(true);
  });

  it("toggleOn() sets it to true", () => {
    const { result } = renderHook(() => useToggle(false));
    const [, { toggleOn }] = result.current;

    act(() => toggleOn());
    expect(result.current[0]).toBe(true);

    act(() => toggleOn());
    expect(result.current[0]).toBe(true);
  });

  it("toggleOff() sets it to false", () => {
    const { result } = renderHook(() => useToggle(true));
    const [, { toggleOff }] = result.current;

    act(() => toggleOff());
    expect(result.current[0]).toBe(false);

    act(() => toggleOff());
    expect(result.current[0]).toBe(false);
  });

  it("the three operation function identities are stable", () => {
    const { result, rerender } = renderHook(() => useToggle());
    const [, { toggle, toggleOn, toggleOff }] = result.current;

    rerender();

    expect(result.current[1].toggle).toBe(toggle);
    expect(result.current[1].toggleOn).toBe(toggleOn);
    expect(result.current[1].toggleOff).toBe(toggleOff);
  });
});

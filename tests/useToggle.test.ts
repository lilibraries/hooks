import { useToggle } from "@lilib/hooks";
import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

describe("useToggle", () => {
  it("should always return the same actions", () => {
    const { result, rerender } = renderHook(() => useToggle());
    const [, actions1] = result.current;
    rerender();
    const [, actions2] = result.current;

    expect(actions1.toggle).toBe(actions2.toggle);
    expect(actions1.toggleOn).toBe(actions2.toggleOn);
    expect(actions1.toggleOff).toBe(actions2.toggleOff);
  });

  it("should set value correctly", () => {
    const { rerender, result } = renderHook((value) => useToggle(value), {
      initialProps: true,
    });

    expect(result.current[0]).toBe(true);

    rerender(false);
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggle(false));
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].toggle(true));
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggleOff());
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].toggleOff());
    expect(result.current[0]).toBe(false);

    act(() => result.current[1].toggleOn());
    expect(result.current[0]).toBe(true);

    act(() => result.current[1].toggleOn());
    expect(result.current[0]).toBe(true);
  });
});

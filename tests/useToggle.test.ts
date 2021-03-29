import { useToggle } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useToggle", () => {
  it("should return the same actions when the component rerenders", () => {
    const { result, rerender } = renderHook(() => useToggle());
    const [, actions1] = result.current;
    rerender();
    const [, actions2] = result.current;

    expect(actions1.toggle).toEqual(actions2.toggle);
    expect(actions1.toggleOn).toEqual(actions2.toggleOn);
    expect(actions1.toggleOff).toEqual(actions2.toggleOff);
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

import { usePersist } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("usePersist", () => {
  it("should return the same function when the component rerenders", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const { rerender, result } = renderHook((cb) => usePersist(cb), {
      initialProps: mock1,
    });
    const temp1 = result.current;
    rerender(mock2);
    const temp2 = result.current;
    expect(temp1).toEqual(temp2);
  });

  it("should passthrough arguments and this", () => {
    const mock1 = jest.fn(function (this: { c: number }, a: number, b: number) {
      return this.c + a + b;
    });
    const { result } = renderHook(() => usePersist(mock1));
    const sum = result.current.bind({ c: 3 })(1, 2);
    expect(sum).toEqual(6);
  });
});

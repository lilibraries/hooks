import { useMount } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

function testMountHook(name: string, useHook: typeof useMount) {
  describe(name, () => {
    it("should run effect after the component is mounted", () => {
      const mock = jest.fn();
      const { rerender, unmount } = renderHook(() => {
        useHook(mock);
        expect(mock).not.toBeCalled();
      });

      expect(mock).toBeCalledTimes(1);
      rerender();
      expect(mock).toBeCalledTimes(1);
      unmount();
      expect(mock).toBeCalledTimes(1);
    });
  });
}

export default testMountHook;

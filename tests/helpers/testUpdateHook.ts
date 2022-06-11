import { useUpdate } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

function testUpdateHook(name: string, useHook: typeof useUpdate) {
  describe(name, () => {
    it("should run effect after the component is updated without deps", () => {
      const destroy = jest.fn();
      const create = jest.fn().mockReturnValue(destroy);
      const { rerender, unmount } = renderHook(() => {
        useHook(create);
      });

      expect(create).not.toBeCalled();
      expect(destroy).not.toBeCalled();

      rerender();
      expect(create).toBeCalledTimes(1);
      expect(destroy).not.toBeCalled();

      rerender();
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(1);

      unmount();
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(2);
    });

    it("should run effect after the deps are changed", () => {
      const destroy = jest.fn();
      const create = jest.fn().mockReturnValue(destroy);
      const { rerender, unmount } = renderHook(
        (deps) => {
          useHook(create, deps);
        },
        { initialProps: [0] }
      );

      expect(create).not.toBeCalled();
      expect(destroy).not.toBeCalled();

      rerender([0]);
      expect(create).not.toBeCalled();
      expect(destroy).not.toBeCalled();

      rerender([1]);
      expect(create).toBeCalledTimes(1);
      expect(destroy).not.toBeCalled();

      rerender([2]);
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(1);

      rerender([2]);
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(1);

      unmount();
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(2);
    });

    it("should not run effect with an empty array deps", () => {
      const destroy = jest.fn();
      const create = jest.fn().mockReturnValue(destroy);
      const { rerender, unmount } = renderHook(() => {
        useHook(create, []);
      });

      expect(create).not.toBeCalled();
      expect(destroy).not.toBeCalled();

      rerender();
      expect(create).not.toBeCalled();
      expect(destroy).not.toBeCalled();

      rerender();
      expect(create).not.toBeCalled();
      expect(destroy).not.toBeCalled();

      unmount();
      expect(create).not.toBeCalled();
      expect(destroy).not.toBeCalled();
    });
  });
}

export default testUpdateHook;

import { useTargetEffect } from "@lilib/hooks";
import renderHook from "./renderHook";
import { EffectTarget } from "../../src/utils/types";

function testTargetEffectHook(name: string, useHook: typeof useTargetEffect) {
  describe(name, () => {
    it("should deal with `deps` correctly", () => {
      const destroy = jest.fn();
      const create = jest.fn().mockReturnValue(destroy);
      const { rerender, unmount } = renderHook(
        (deps) => {
          useHook(create, deps, []);
        },
        { initialProps: [0] }
      );

      expect(create).toBeCalledTimes(1);
      expect(destroy).not.toBeCalled();

      rerender([0]);
      expect(create).toBeCalledTimes(1);
      expect(destroy).not.toBeCalled();

      rerender([1]);
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(1);

      rerender([2]);
      expect(create).toBeCalledTimes(3);
      expect(destroy).toBeCalledTimes(2);

      rerender([2]);
      expect(create).toBeCalledTimes(3);
      expect(destroy).toBeCalledTimes(2);

      unmount();
      expect(create).toBeCalledTimes(3);
      expect(destroy).toBeCalledTimes(3);
    });

    it("should deal with `targets` correctly", () => {
      const destroy = jest.fn();
      const create = jest.fn().mockReturnValue(destroy);
      const { rerender, unmount } = renderHook<EffectTarget<any>[], void>(
        (targets) => {
          useHook(create, [], targets);
        },
        { initialProps: [null] }
      );

      expect(create).toBeCalledTimes(1);
      expect(destroy).not.toBeCalled();

      rerender([null]);
      expect(create).toBeCalledTimes(1);
      expect(destroy).not.toBeCalled();

      rerender([() => "dep"]);
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(1);

      rerender([() => "dep"]);
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(1);

      const ref = { current: "dep" };
      rerender([ref]);
      expect(create).toBeCalledTimes(2);
      expect(destroy).toBeCalledTimes(1);

      ref.current = "dep2";
      rerender([ref]);
      expect(create).toBeCalledTimes(3);
      expect(destroy).toBeCalledTimes(2);

      unmount();
      expect(create).toBeCalledTimes(3);
      expect(destroy).toBeCalledTimes(3);
    });
  });
}

export default testTargetEffectHook;

import { useLocalStorage } from "@lilib/hooks";
import { act } from "@testing-library/react";
import renderHook from "./renderHook";

function testStorgeHook(
  name: string,
  storage: Storage,
  useHook: typeof useLocalStorage
) {
  describe(name, () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
      storage.clear();
    });

    it("should return the same `set` function when the component is rerendered", () => {
      const { result, rerender } = renderHook(() => useHook("key"));
      const [, set1] = result.current;
      rerender();
      const [, set2] = result.current;

      expect(set1).toStrictEqual(set2);
    });

    it("should return default value correctly", () => {
      const { result, rerender } = renderHook<string | undefined, any>(
        (defaultValue) => useHook("key", { defaultValue }),
        { initialProps: undefined }
      );

      expect(result.current[0]).toBeUndefined();

      rerender("default");
      expect(result.current[0]).toBe("default");
    });

    it("should set and remove value correctly", () => {
      const { result } = renderHook(() =>
        useHook("key", { defaultValue: "default" })
      );

      expect(storage.getItem("key")).toStrictEqual(null);

      act(() => result.current[1]("value"));
      expect(result.current[0]).toBe("value");
      expect(storage.getItem("key")).toBe(JSON.stringify("value"));

      act(() => result.current[1]("new value"));
      expect(result.current[0]).toBe("new value");
      expect(storage.getItem("key")).toBe(JSON.stringify("new value"));

      act(() => result.current[1](undefined));
      expect(result.current[0]).toBe("default");
      expect(storage.getItem("key")).toStrictEqual(null);
    });

    it("should support custom serialization and deserialization function", () => {
      const { result } = renderHook(() =>
        useHook("key", {
          defaultValue: "default",
          serialize: (value) => value,
          deserialize: (raw) => raw,
        })
      );
      expect(storage.getItem("key")).toStrictEqual(null);

      act(() => result.current[1]("value"));
      expect(result.current[0]).toBe("value");
      expect(storage.getItem("key")).toBe("value");

      act(() => result.current[1]("new value"));
      expect(result.current[0]).toBe("new value");
      expect(storage.getItem("key")).toBe("new value");

      const { result: newResult } = renderHook(() =>
        useHook<string>("key", {
          defaultValue: undefined,
          serialize: (value) => value,
          deserialize: (raw) => raw,
        })
      );

      expect(newResult.current[0]).toBe("new value");
      expect(storage.getItem("key")).toBe("new value");

      act(() => newResult.current[1](undefined));
      expect(newResult.current[0]).toBeUndefined();
      expect(storage.getItem("key")).toStrictEqual(null);
    });

    it("should retrieve storage value when the key changes", () => {
      storage.setItem("key1", JSON.stringify("value1"));
      storage.setItem("key2", JSON.stringify("value2"));

      const { result, rerender } = renderHook((key) => useHook(key), {
        initialProps: "key1",
      });

      expect(result.current[0]).toBe("value1");

      rerender("key2");
      expect(result.current[0]).toBe("value2");
    });

    it("should retrieve default value when the key changes", () => {
      const { result, rerender } = renderHook(
        ({ key, defaultValue }) => useHook(key, { defaultValue }),
        { initialProps: { key: "key", defaultValue: "default" } }
      );

      expect(result.current[0]).toBe("default");
      expect(storage.getItem("key")).toStrictEqual(null);

      rerender({ key: "new key", defaultValue: "new default" });
      expect(result.current[0]).toBe("new default");
      expect(storage.getItem("new key")).toStrictEqual(null);
    });

    it("should auto update value when the `polling` options is `true`", () => {
      const { result, rerender, unmount } = renderHook<
        { polling?: boolean; pollingInterval?: number },
        ReturnType<typeof useLocalStorage>
      >((props) => useHook("key", props), {
        initialProps: {
          polling: undefined,
          pollingInterval: undefined,
        },
      });

      expect(result.current[0]).toBeUndefined();

      storage.setItem("key", JSON.stringify("value"));
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(result.current[0]).toBeUndefined();

      rerender({ polling: true });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current[0]).toBe("value");

      rerender({ polling: true, pollingInterval: 200 });
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current[0]).toBe("value");
      storage.setItem("key", JSON.stringify("new value"));
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current[0]).toBe("value");
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(result.current[0]).toBe("new value");

      storage.removeItem("key");
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(result.current[0]).toBeUndefined();

      rerender({ polling: false, pollingInterval: 200 });
      jest.runOnlyPendingTimers();
      storage.setItem("key", JSON.stringify("new value 2"));
      expect(result.current[0]).toBeUndefined();

      unmount();
    });

    it("supports `validate` option", () => {
      const returnTrue = () => true;
      const returnFalse = () => false;
      storage.setItem("key", JSON.stringify("value"));

      const { result, rerender, unmount } = renderHook(
        ({ validate }) =>
          useHook("key", {
            validate,
            defaultValue: "default",
            polling: true,
            pollingInterval: 10,
          }),
        { initialProps: { validate: returnTrue } }
      );
      expect(result.current[0]).toBe("value");

      storage.setItem("key", JSON.stringify("value1"));
      act(() => {
        jest.advanceTimersByTime(10);
      });
      expect(result.current[0]).toBe("value1");

      rerender({ validate: returnFalse });
      storage.setItem("key", JSON.stringify("value2"));
      act(() => {
        jest.advanceTimersByTime(10);
      });
      expect(result.current[0]).toBe("default");

      unmount();
    });

    it("supports `compare` option", () => {
      const value = { value: "value" };
      const value2 = { value: "value2" };
      const returnTrue = () => true;
      const returnFalse = () => false;
      storage.setItem("key", JSON.stringify(value));

      const { result, rerender, unmount } = renderHook(
        ({ compare }) =>
          useHook("key", {
            compare,
            polling: true,
            pollingInterval: 10,
          }),
        { initialProps: { compare: returnTrue } }
      );

      const firstValue = result.current[0];
      expect(firstValue).not.toBe(value);
      expect(firstValue).toEqual(value);

      storage.setItem("key", JSON.stringify(value2));
      act(() => {
        jest.advanceTimersByTime(10);
      });
      expect(result.current[0]).toBe(firstValue);

      rerender({ compare: returnFalse });
      act(() => {
        jest.advanceTimersByTime(10);
      });
      expect(result.current[0]).not.toBe(value2);
      expect(result.current[0]).toEqual(value2);
      storage.setItem("key", JSON.stringify(value));
      act(() => {
        jest.advanceTimersByTime(10);
      });
      expect(result.current[0]).not.toBe(value);
      expect(result.current[0]).not.toBe(firstValue);
      expect(result.current[0]).toEqual(value);

      unmount();
    });
  });
}

export default testStorgeHook;

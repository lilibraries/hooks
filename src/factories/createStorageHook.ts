import { useEffect } from "react";
import deepEqual from "fast-deep-equal";
import isFunction from "lodash/isFunction";
import useUpdate from "../useUpdate";
import usePersist from "../usePersist";
import useInterval from "../useInterval";
import useSafeState from "../useSafeState";
import useEventListener from "../useEventListener";

interface CommonOptions<T> {
  polling?: boolean;
  pollingInterval?: number;
  compare?: (x: any, y: any) => boolean;
  validate?: (value: T) => boolean;
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
}

function createStorageHook(storage: Storage | null) {
  function useStorage<T>(
    key: string,
    options: { defaultValue: T } & CommonOptions<T>
  ): readonly [
    T,
    (value: T | undefined | ((prevValue: T) => T | undefined)) => void
  ];

  function useStorage<T>(
    key: string,
    options?: { defaultValue?: T } & CommonOptions<T>
  ): readonly [
    T | undefined,
    (
      value: T | undefined | ((prevValue: T | undefined) => T | undefined)
    ) => void
  ];

  function useStorage<T>(
    key: string,
    options: { defaultValue?: T } & CommonOptions<T> = {}
  ) {
    const {
      defaultValue,
      polling = false,
      pollingInterval = 100,
      compare,
      validate,
      serialize,
      deserialize,
    } = options;

    function serializer(value: T): string {
      if (serialize) {
        return serialize(value);
      }
      return JSON.stringify(value);
    }

    function deserializer(value: string): T {
      if (deserialize) {
        return deserialize(value);
      }
      return JSON.parse(value);
    }

    function getStoredValue(): T | undefined {
      try {
        const raw = storage?.getItem(key);
        if (raw != null) {
          const value = deserializer(raw);
          if (validate) {
            return validate(value) ? value : defaultValue;
          } else {
            return value;
          }
        }
      } catch (error) {
        console.error(error);
      }
      return defaultValue;
    }

    const [value, setValue] = useSafeState<T | undefined>(getStoredValue);

    const setStorage = usePersist(
      (
        newValue: T | undefined | ((prevValue: T | undefined) => T | undefined)
      ) => {
        setValue((prevValue) => {
          newValue = isFunction(newValue) ? newValue(prevValue) : newValue;

          if (newValue === undefined) {
            storage?.removeItem(key);
            return defaultValue;
          }

          try {
            storage?.setItem(key, serializer(newValue));
          } catch (error) {
            console.error(error);
          }

          return newValue;
        });
      }
    );

    const handleChange = () => {
      const newValue = getStoredValue();
      if (!(compare || deepEqual)(newValue, value)) {
        setValue(newValue);
      }
    };

    const [startPolling, cancelPolling] = useInterval(
      handleChange,
      pollingInterval
    );

    useEffect(
      () => {
        cancelPolling();
        if (polling) {
          startPolling();
        }
      },
      [polling] // eslint-disable-line
    );

    useEventListener(() => window, "storage", handleChange);

    useUpdate(() => {
      cancelPolling();
      setValue(getStoredValue());
      if (polling) {
        startPolling();
      }
    }, [key]);

    useUpdate(() => {
      if (
        storage?.getItem(key) == null &&
        !(compare || deepEqual)(defaultValue, value)
      ) {
        setValue(defaultValue);
      }
    }, [defaultValue]);

    return [value, setStorage] as const;
  }

  return useStorage;
}

export default createStorageHook;

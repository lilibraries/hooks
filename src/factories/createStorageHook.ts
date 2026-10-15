import { useDebugValue, useEffect, useRef } from "react";

import isEqual from "lodash/isEqual";
import isFunction from "lodash/isFunction";

import useEventListener from "../useEventListener";
import useInterval from "../useInterval";
import useLatestRef from "../useLatestRef";
import useMemoizedValue from "../useMemoizedValue";
import usePersist from "../usePersist";
import useSafeState from "../useSafeState";
import useUpdate from "../useUpdate";
import inBrowser from "../utils/inBrowser";

export interface UseStorageOptions<T> {
  defaultValue?: T;
  polling?: boolean;
  pollingInterval?: number;
  compare?: (x: any, y: any) => boolean;
  validate?: (value: any) => boolean;
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
}

/**
 * Factory for creating storage hooks: takes a function that returns a `Storage`
 * object (e.g. `() => localStorage`) and returns a hook for reading, writing,
 * and removing values in that storage.
 * The storage object is accessed lazily through the function, so accessing the
 * storage property in private-browsing or restricted environments does not
 * throw at module load time.
 */
function createStorageHook(getStorage: () => Storage | null) {
  function useStorage<T>(
    key: string,
    options: UseStorageOptions<T> & { defaultValue: T },
  ): readonly [T, (value: T | undefined | ((prevValue: T) => T | undefined)) => void];

  function useStorage<T>(
    key: string,
    options?: UseStorageOptions<T>,
  ): readonly [T | undefined, (value: T | undefined | ((prevValue: T | undefined) => T | undefined)) => void];

  function useStorage<T>(key: string, options?: UseStorageOptions<T>) {
    const {
      defaultValue: defaultValueOption,
      polling = false,
      pollingInterval = 100,
      compare = isEqual,
      validate,
      serialize = JSON.stringify as (value: T) => string,
      deserialize = JSON.parse as (raw: string) => T,
    } = options || {};
    const storage = getStorage();
    const defaultValue = useMemoizedValue(defaultValueOption, compare);

    function getStoredValue(): T | undefined {
      try {
        const raw = storage?.getItem(key);
        if (raw != null) {
          const value = deserialize(raw);
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
    const valueRef = useLatestRef(value);

    const setStorage = usePersist((newValue: T | undefined | ((prevValue: T | undefined) => T | undefined)) => {
      const resolved = isFunction(newValue) ? newValue(valueRef.current) : newValue;

      if (resolved === undefined) {
        storage?.removeItem(key);
        valueRef.current = defaultValue;
        setValue(defaultValue);
      } else {
        try {
          storage?.setItem(key, serialize(resolved));
        } catch (error) {
          console.error(error);
        }
        valueRef.current = resolved;
        setValue(resolved);
      }
    });

    const handleChange = () => {
      const newValue = getStoredValue();
      if (!compare(newValue, value)) {
        setValue(newValue);
      }
    };

    const [startPolling, cancelPolling] = useInterval(handleChange, pollingInterval);

    // Restart or stop polling when the polling flag changes
    useEffect(
      () => {
        cancelPolling();
        if (polling) {
          startPolling();
        }
      },
      [polling], // eslint-disable-line
    );

    const windowRef = useRef<Window | null>(inBrowser ? window : null);

    useEventListener(windowRef, "storage", handleChange);

    // When the key changes: stop the previous polling, re-read the storage,
    // and restart polling if needed
    useUpdate(() => {
      cancelPolling();
      setValue(getStoredValue());
      if (polling) {
        startPolling();
      }
    }, [key]);

    // When the default value changes and the key is absent from storage,
    // sync the state to the new default value
    useUpdate(() => {
      if (storage?.getItem(key) == null && !compare(defaultValue, value)) {
        setValue(defaultValue);
      }
    }, [defaultValue]);

    useDebugValue(value);
    useDebugValue(key, () => {
      return "(raw) " + storage?.getItem(key);
    });

    return [value, setStorage] as const;
  }

  return useStorage;
}

export default createStorageHook;

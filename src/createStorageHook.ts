import { useEffect, useRef, useState } from "react";
import useUpdate from "./useUpdate";
import usePersist from "./usePersist";

function createStorageHook(storage: Storage | null) {
  if (!storage) {
    return useNoop as typeof useStorage;
  }

  function useStorage<T>(
    key: string,
    defaultValue?: T,
    options?: {
      serialize?: (value: T) => string;
      deserialize?: (raw: string) => T;
    }
  ) {
    const serialize =
      options && options.serialize
        ? options.serialize
        : (JSON.stringify as (value: T) => string);

    const deserialize =
      options && options.deserialize
        ? options.deserialize
        : (JSON.parse as (raw: string) => T);

    const getItem = usePersist(() => {
      try {
        const raw = (storage as Storage).getItem(key);
        return raw !== null ? deserialize(raw) : defaultValue;
      } catch (error) {
        return defaultValue;
      }
    });

    const setItem = usePersist((value: T) => {
      try {
        (storage as Storage).setItem(key, serialize(value));
      } catch (error) {}
    });

    const removeItem = usePersist(() => {
      (storage as Storage).removeItem(key);
    });

    const [value, setValue] = useState(getItem());

    const set = usePersist((newValue: T) => {
      setItem(newValue);
      setValue(newValue);
    });

    const remove = usePersist(() => {
      removeItem();
      setValue(getItem());
    });

    useUpdate(
      () => {
        setValue(getItem());
      },
      [key] // eslint-disable-line
    );

    useUpdate(
      () => {
        if ((storage as Storage).getItem(key) === null) {
          setValue(defaultValue);
        }
      },
      [defaultValue] // eslint-disable-line
    );

    useEffect(
      () => {
        function listener(event: StorageEvent) {
          if (event.storageArea === storage && event.key === key) {
            setValue(getItem());
          }
        }

        if (typeof window !== "undefined") {
          window.addEventListener("storage", listener);
          return () => window.removeEventListener("storage", listener);
        }
      },
      [key] // eslint-disable-line
    );

    return [value, { set, remove }] as const;
  }

  return useStorage;
}

function useNoop<T = any>(key: string, defaultValue?: T) {
  const storageRef = useRef<T>();
  const [value, setValue] = useState(defaultValue);

  const set = usePersist((newValue: T) => {
    storageRef.current = newValue;
    setValue(newValue);
  });

  const remove = usePersist(() => {
    setValue(defaultValue);
  });

  useUpdate(
    () => {
      storageRef.current = undefined;
      setValue(defaultValue);
    },
    [key] // eslint-disable-line
  );

  useUpdate(() => {
    if (storageRef.current === undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return [value, { set, remove }] as const;
}

export default createStorageHook;

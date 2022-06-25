import { useEffect } from "react";
import Cookies, { CookieAttributes } from "js-cookie";
import useUpdate from "./useUpdate";
import usePersist from "./usePersist";
import useInterval from "./useInterval";
import useSafeState from "./useSafeState";
import isFunction from "./utils/isFunction";

function useCookie(
  name: string,
  options: {
    defaultValue: string;
    polling?: boolean;
    pollingInterval?: number;
  }
): readonly [
  string,
  (
    newValue: string | undefined | ((prevValue: string) => string | undefined),
    attributes?: CookieAttributes
  ) => void
];

function useCookie(
  name: string,
  options?: {
    defaultValue?: string;
    polling?: boolean;
    pollingInterval?: number;
  }
): readonly [
  string | undefined,
  (
    newValue:
      | string
      | undefined
      | ((prevValue: string | undefined) => string | undefined),
    attributes?: CookieAttributes
  ) => void
];

function useCookie(
  name: string,
  options?: {
    defaultValue?: string;
    polling?: boolean;
    pollingInterval?: number;
  }
) {
  const {
    defaultValue,
    polling = false,
    pollingInterval = 100,
  } = options || {};

  function getCookie() {
    const cookie = Cookies.get(name);
    return cookie !== undefined ? cookie : defaultValue;
  }

  const [value, setValue] = useSafeState(getCookie);

  const setCookie = usePersist(
    (
      newValue:
        | string
        | undefined
        | ((prevValue: string | undefined) => string | undefined),
      attributes?: CookieAttributes
    ) => {
      setValue((prevValue) => {
        newValue = isFunction(newValue) ? newValue(prevValue) : newValue;
        if (newValue === undefined) {
          Cookies.remove(name, attributes);
          return defaultValue;
        } else {
          Cookies.set(name, newValue, attributes);
          return newValue;
        }
      });
    }
  );

  const [startPolling, cancelPolling] = useInterval(() => {
    const newValue = getCookie();
    if (newValue !== value) {
      setValue(newValue);
    }
  }, pollingInterval);

  useEffect(
    () => {
      cancelPolling();
      if (polling) {
        startPolling();
      }
    },
    [polling] // eslint-disable-line
  );

  useUpdate(() => {
    cancelPolling();
    setValue(getCookie());
    if (polling) {
      startPolling();
    }
  }, [name]);

  useUpdate(() => {
    if (Cookies.get(name) === undefined && defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return [value, setCookie] as const;
}

export default useCookie;

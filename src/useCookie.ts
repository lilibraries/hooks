import { useDebugValue, useEffect, useMemo } from "react";

import Cookies from "js-cookie";
import isFunction from "lodash/isFunction";

import useInterval from "./useInterval";
import useLayoutMount from "./useLayoutMount";
import useLatestRef from "./useLatestRef";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useUpdate from "./useUpdate";

type CookieAttributes = Cookies.CookieAttributes;

interface UseCookieOptions {
  defaultValue?: string;
  polling?: boolean;
  pollingInterval?: number;
  validate?: (value: string) => boolean;
}

/**
 * A hook built on js-cookie for reading, writing, and removing cookies.
 *
 * @param name The cookie name.
 * @param options The options object.
 * @param options.defaultValue The default value.
 * @param options.polling Whether to poll for cookie changes.
 * @param options.pollingInterval The polling interval (milliseconds).
 * @param options.validate A validation function.
 * @returns Returns a `[value, setCookie]` tuple: `value` is the cookie value and `setCookie` sets it, or removes the cookie when passed `undefined`.
 */
function useCookie(
  name: string,
  options: UseCookieOptions & { defaultValue: string },
): readonly [
  string,
  (newValue: string | undefined | ((prevValue: string) => string | undefined), attributes?: CookieAttributes) => void,
];

function useCookie(
  name: string,
  options?: UseCookieOptions,
): readonly [
  string | undefined,
  (
    newValue: string | undefined | ((prevValue: string | undefined) => string | undefined),
    attributes?: CookieAttributes,
  ) => void,
];

function useCookie(name: string, options?: UseCookieOptions) {
  const { defaultValue, polling = false, pollingInterval = 100, validate } = options || {};

  function getCookie() {
    const cookie = Cookies.get(name);
    if (cookie !== undefined) {
      if (validate) {
        return validate(cookie) ? cookie : defaultValue;
      } else {
        return cookie;
      }
    } else {
      return defaultValue;
    }
  }

  // The state starts with the default value so server-rendered and
  // client-hydrated output are consistent; the cookie is read in right after
  // mounting (before paint), avoiding hydration mismatches and flashes.
  const [value, setValue] = useSafeState(defaultValue);
  const valueRef = useLatestRef(value);

  useLayoutMount(() => {
    const newValue = getCookie();
    if (newValue !== valueRef.current) {
      setValue(newValue);
    }
  });

  const setCookie = usePersist(
    (
      newValue: string | undefined | ((prevValue: string | undefined) => string | undefined),
      attributes?: CookieAttributes,
    ) => {
      const resolved = isFunction(newValue) ? newValue(valueRef.current) : newValue;

      if (resolved === undefined) {
        Cookies.remove(name, attributes);
        valueRef.current = defaultValue;
        setValue(defaultValue);
      } else {
        Cookies.set(name, resolved, attributes);
        valueRef.current = resolved;
        setValue(resolved);
      }
    },
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
    [polling], // eslint-disable-line
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

  useDebugValue(value);
  // `value` appears in the deps only to trigger recomputation: the raw cookie is
  // re-read whenever name or value changes, for display in DevTools
  const rawValue = useMemo(() => Cookies.get(name), [name, value]); // eslint-disable-line react-hooks/exhaustive-deps
  useDebugValue(name, () => {
    return "(raw) " + rawValue;
  });

  return [value, setCookie] as const;
}

export default useCookie;

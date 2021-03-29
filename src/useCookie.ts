import { useState } from "react";
import Cookies, { CookieAttributes } from "js-cookie";
import useUpdate from "./useUpdate";
import usePersist from "./usePersist";

function useCookie(
  name: string,
  defaultValue?: string,
  options?: CookieAttributes
) {
  const getCookie = usePersist(() => {
    const value = Cookies.get(name);
    return value !== undefined ? value : defaultValue;
  });

  const [value, setValue] = useState(getCookie());

  const set = usePersist((newValue: string) => {
    Cookies.set(name, newValue, options);
    setValue(newValue);
  });

  const remove = usePersist(() => {
    Cookies.remove(name, options);
    setValue(getCookie());
  });

  useUpdate(
    () => {
      setValue(getCookie());
    },
    [name] // eslint-disable-line
  );

  useUpdate(
    () => {
      if (Cookies.get(name) === undefined) {
        setValue(defaultValue);
      }
    },
    [defaultValue] // eslint-disable-line
  );

  return [value, { set, remove }] as const;
}

export default useCookie;

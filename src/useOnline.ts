import { useState } from "react";
import useEventListener from "./useEventListener";

function useOnline() {
  const [online, setOnline] = useState(window.navigator.onLine);
  const listener = () => setOnline(window.navigator.onLine);

  useEventListener(window, "online", listener);
  useEventListener(window, "offline", listener);

  return online;
}

const env =
  typeof window !== "undefined" &&
  typeof window.navigator !== "undefined" &&
  typeof window.navigator.onLine !== "undefined";

export default env ? useOnline : () => true;

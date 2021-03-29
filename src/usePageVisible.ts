import { useState } from "react";
import useEventListener from "./useEventListener";

function usePageVisible() {
  const [visible, setVisible] = useState(!document.hidden);

  useEventListener(document, "visibilitychange", () => {
    setVisible(!document.hidden);
  });

  return visible;
}

export default typeof document !== "undefined" ? usePageVisible : () => true;

import { useCallback, useState } from "react";

/**
 * Return a function for re-rendering the component, usually to re-render mutable data.
 *
 * @returns Returns the re-render function.
 */
function useRerender() {
  const [, setSignal] = useState({});

  const rerender = useCallback(() => {
    setSignal({});
  }, []);

  return rerender;
}

export default useRerender;

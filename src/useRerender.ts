import { useCallback, useState } from "react";

function useRerender() {
  const [, setSignal] = useState({});

  const rerender = useCallback(() => {
    setSignal({});
  }, []);

  return rerender;
}

export default useRerender;

import { useEffect } from "react";

function useMount(effect: () => void) {
  useEffect(
    () => {
      effect();
    },
    [] // eslint-disable-line
  );
}

export default useMount;

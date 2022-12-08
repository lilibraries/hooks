import { Ref, RefCallback } from "react";
import usePersist from "./usePersist";
import composeRefs from "./utils/composeRefs";

function useComposedRef<T>(...refs: Ref<T>[]): RefCallback<T> {
  return usePersist(composeRefs(...refs));
}

export default useComposedRef;

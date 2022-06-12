import { Ref, RefCallback } from "react";
import usePersist from "./usePersist";
import mergeRefs from "./utils/mergeRefs";

function useMergedRef<T>(...refs: Ref<T>[]): RefCallback<T> {
  return usePersist(mergeRefs(...refs));
}

export default useMergedRef;

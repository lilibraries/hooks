import { Ref, RefCallback } from "react";
import { composeRefs } from "@lilib/utils";
import usePersist from "./usePersist";

function useComposedRef<T>(...refs: Ref<T>[]): RefCallback<T> {
  return usePersist(composeRefs(...refs));
}

export default useComposedRef;

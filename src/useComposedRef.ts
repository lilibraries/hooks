import { useCallback, type Ref, type RefCallback } from "react";

import composeRefs from "./utils/composeRefs";

/**
 * Combine multiple refs into a single ref, useful when building components.
 *
 * @param refs The list of refs to combine: callback refs, ref objects, null, or undefined.
 * @returns The combined callback ref.
 */
function useComposedRef<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  // Follows the Radix useComposedRefs pattern: the callback identity stays stable
  // while the refs are stable and changes with them, letting React automatically
  // detach the old refs with null and attach the new ones.
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
  return useCallback(composeRefs(...refs), refs);
}

export default useComposedRef;

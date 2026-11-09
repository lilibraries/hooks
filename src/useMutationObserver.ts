import type { RefObject } from "react";

import useLayoutRefEffect from "./useLayoutRefEffect";
import usePersist from "./usePersist";
import unref from "./utils/unref";

/**
 * Watch mutations of a DOM node, such as inserted or removed child nodes and
 * changed attributes.
 *
 * @param target The observed target node or its ref.
 * @param listener The listener invoked with the mutation records.
 * @param options The options object, see MutationObserver options. Defaults to
 *   `{ childList: true, attributes: true, characterData: true }` when omitted; when
 *   provided, it replaces the defaults instead of merging with them, so at least one
 *   of `childList`, `attributes` and `characterData` must end up enabled.
 */
function useMutationObserver(
  target: Node | RefObject<Node | null>,
  listener: (records: MutationRecord[]) => void,
  options?: MutationObserverInit,
) {
  const handler = usePersist(listener);
  const {
    childList,
    attributes,
    characterData,
    subtree,
    attributeOldValue,
    characterDataOldValue,
    attributeFilter,
  } = options || { childList: true, attributes: true, characterData: true };

  useLayoutRefEffect(() => {
    const targetNode = unref(target);

    if (!targetNode) {
      return;
    }

    const observer = new MutationObserver(handler);
    observer.observe(targetNode, {
      childList,
      attributes,
      characterData,
      subtree,
      attributeOldValue,
      characterDataOldValue,
      attributeFilter,
    });

    return () => {
      observer.disconnect();
    };
    // `attributeFilter` is a new array on every render, so it is serialized to keep
    // the dep stable (identical content avoids recreating the observer).
  }, [
    childList,
    attributes,
    characterData,
    subtree,
    attributeOldValue,
    characterDataOldValue,
    attributeFilter ? attributeFilter.join(",") : undefined,
    target,
  ]);
}

export default useMutationObserver;

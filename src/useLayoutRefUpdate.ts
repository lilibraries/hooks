import createUpdateHook from "./factories/createUpdateHook";
import useLayoutRefEffect from "./useLayoutRefEffect";

/**
 * Like `useLayoutUpdate`, but supports ReactRefs in the dependency array (each
 * dereferenced to `ref.current` before comparison) and runs synchronously before
 * the browser paints (layout phase).
 * Note: plain objects with a `current` property are treated as ReactRefs and
 * dereferenced, so they cannot be used as dep values directly.
 *
 * @param effect The effect to run after an update; may return a cleanup function.
 * @param deps The dependency array; elements may be plain values or ReactRefs.
 */
const useLayoutRefUpdate = createUpdateHook(useLayoutRefEffect);

export default useLayoutRefUpdate;

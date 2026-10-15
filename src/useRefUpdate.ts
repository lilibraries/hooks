import createUpdateHook from "./factories/createUpdateHook";
import useRefEffect from "./useRefEffect";

/**
 * Like `useUpdate`, but built on `useRefEffect` internally.
 * Note: plain objects with a `current` property are treated as ReactRefs and dereferenced, so they cannot be used as dep values directly.
 *
 * @param effect The effect to run after an update; may return a cleanup function.
 * @param deps The dependency array; elements may be plain values or ReactRefs.
 */
const useRefUpdate = createUpdateHook(useRefEffect);

export default useRefUpdate;

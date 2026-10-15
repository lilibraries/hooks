import createRefEffectHook from "./factories/createRefEffectHook";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

/**
 * Like `useRefEffect`, but runs synchronously before the browser paints (layout
 * phase), suitable for cases that need immediate DOM reads/writes.
 * Note: plain objects with a `current` property are treated as ReactRefs and
 * dereferenced, so they cannot be used as dep values directly.
 *
 * @param effect The effect function.
 * @param deps The dependency array; elements may be plain values or ReactRefs, omitted to re-run after every update.
 */
const useLayoutRefEffect = createRefEffectHook(useIsomorphicLayoutEffect);

export default useLayoutRefEffect;

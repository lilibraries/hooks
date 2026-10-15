import { useEffect } from "react";

import createRefEffectHook from "./factories/createRefEffectHook";

/**
 * Like `React.useEffect`, but ReactRefs in the dependency array are dereferenced to `ref.current` before comparison.
 * The effect re-runs when the DOM node (or other value) a ref points to changes. Useful when a DOM node itself is an effect dependency.
 * Note: plain objects with a `current` property are treated as ReactRefs and dereferenced, so they cannot be used as dep values directly.
 *
 * @param effect The effect function.
 * @param deps The dependency array; elements may be plain values or ReactRefs, omitted to re-run after every update.
 */
const useRefEffect = createRefEffectHook(useEffect);

export default useRefEffect;

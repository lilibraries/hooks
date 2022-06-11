import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import createTargetEffectHook from "./creators/createTargetEffectHook";

const useLayoutTargetEffect = createTargetEffectHook(useIsomorphicLayoutEffect);

export default useLayoutTargetEffect;

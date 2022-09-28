import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import createTargetEffectHook from "./factories/createTargetEffectHook";

const useLayoutTargetEffect = createTargetEffectHook(useIsomorphicLayoutEffect);

export default useLayoutTargetEffect;

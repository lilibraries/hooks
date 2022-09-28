import createMountHook from "./factories/createMountHook";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

const useLayoutMount = createMountHook(useIsomorphicLayoutEffect);

export default useLayoutMount;

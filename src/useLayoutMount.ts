import createMountHook from "./creators/createMountHook";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

const useLayoutMount = createMountHook(useIsomorphicLayoutEffect);

export default useLayoutMount;

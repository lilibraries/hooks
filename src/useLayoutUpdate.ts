import createUpdateHook from "./creators/createUpdateHook";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

const useLayoutUpdate = createUpdateHook(useIsomorphicLayoutEffect);

export default useLayoutUpdate;

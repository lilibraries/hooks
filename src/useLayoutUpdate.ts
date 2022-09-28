import createUpdateHook from "./factories/createUpdateHook";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

const useLayoutUpdate = createUpdateHook(useIsomorphicLayoutEffect);

export default useLayoutUpdate;

import createUpdateHook from "./factories/createUpdateHook";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

/**
 * Like `useUpdate`, but runs synchronously before the browser paints (layout
 * phase), suitable for cases that need immediate DOM reads/writes.
 *
 * @param effect The effect to run after an update.
 * @param deps The dependency array.
 */
const useLayoutUpdate = createUpdateHook(useIsomorphicLayoutEffect);

export default useLayoutUpdate;

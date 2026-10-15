import createMountHook from "./factories/createMountHook";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

/**
 * Like `useMount`, but runs synchronously before the browser paints (layout
 * phase), suitable for cases that need immediate DOM reads/writes.
 *
 * @param effect The effect to run after the component mounts; may return a cleanup function.
 */
const useLayoutMount = createMountHook(useIsomorphicLayoutEffect);

export default useLayoutMount;

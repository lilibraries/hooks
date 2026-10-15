import { useEffect } from "react";

import createMountHook from "./factories/createMountHook";

/**
 * Run an effect after the component mounts.
 *
 * @param effect The effect to run after the component mounts; may return a cleanup function.
 */
const useMount = createMountHook(useEffect);

export default useMount;

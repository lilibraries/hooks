import { useEffect } from "react";

import createUpdateHook from "./factories/createUpdateHook";

/**
 * Run an effect after the component updates or the dependencies change (the initial mount is skipped).
 * Runs after every render when `deps` is omitted, and never runs when an empty array is passed.
 *
 * @param effect The effect to run after an update.
 * @param deps The dependency array.
 */
const useUpdate = createUpdateHook(useEffect);

export default useUpdate;

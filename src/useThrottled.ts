import createDebouncedHook from "./createDebouncedHook";

const useThrottled = createDebouncedHook(true);

export default useThrottled;

import createDebounceHook from "./createDebounceHook";

const useThrottle = createDebounceHook(true);

export default useThrottle;

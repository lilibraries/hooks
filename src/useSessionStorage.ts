import isBrowser from "./utils/isBrowser";
import createStorageHook from "./creators/createStorageHook";

const useSessionStorage = createStorageHook(isBrowser ? sessionStorage : null);

export default useSessionStorage;

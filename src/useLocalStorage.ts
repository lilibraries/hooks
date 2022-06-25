import isBrowser from "./utils/isBrowser";
import createStorageHook from "./creators/createStorageHook";

const useLocalStorage = createStorageHook(isBrowser ? localStorage : null);

export default useLocalStorage;

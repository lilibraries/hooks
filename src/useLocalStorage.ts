import isBrowser from "./utils/isBrowser";
import createStorageHook from "./factories/createStorageHook";

const useLocalStorage = createStorageHook(isBrowser ? localStorage : null);

export default useLocalStorage;

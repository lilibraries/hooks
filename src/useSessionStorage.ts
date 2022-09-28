import isBrowser from "./utils/isBrowser";
import createStorageHook from "./factories/createStorageHook";

const useSessionStorage = createStorageHook(isBrowser ? sessionStorage : null);

export default useSessionStorage;

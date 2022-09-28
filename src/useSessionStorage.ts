import inBrowser from "./utils/inBrowser";
import createStorageHook from "./factories/createStorageHook";

const useSessionStorage = createStorageHook(inBrowser ? sessionStorage : null);

export default useSessionStorage;

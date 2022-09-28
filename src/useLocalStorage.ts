import inBrowser from "./utils/inBrowser";
import createStorageHook from "./factories/createStorageHook";

const useLocalStorage = createStorageHook(inBrowser ? localStorage : null);

export default useLocalStorage;

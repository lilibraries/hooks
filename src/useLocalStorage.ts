import { inBrowser } from "@lilib/utils";
import createStorageHook from "./factories/createStorageHook";

const useLocalStorage = createStorageHook(inBrowser ? localStorage : null);

export default useLocalStorage;

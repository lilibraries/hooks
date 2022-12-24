import { inBrowser } from "@lilib/utils";
import createStorageHook from "./factories/createStorageHook";

const useSessionStorage = createStorageHook(inBrowser ? sessionStorage : null);

export default useSessionStorage;

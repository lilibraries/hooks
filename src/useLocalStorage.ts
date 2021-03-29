import createStorageHook from "./createStorageHook";

const useLocalStorage = createStorageHook(
  typeof localStorage !== "undefined" ? localStorage : null
);

export default useLocalStorage;

import createStorageHook from "./createStorageHook";

const useSessionStorage = createStorageHook(
  typeof sessionStorage !== "undefined" ? sessionStorage : null
);

export default useSessionStorage;

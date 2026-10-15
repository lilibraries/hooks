import getLoadStore from "./utils/getLoadStore";
import usePersist from "./usePersist";

/**
 * Return a function for reloading requests. It shares the load store with `useLoad`,
 * and calling it reloads all `useLoad` instances that set the same `key` (each using its own most recent params or `defaultParams`).
 *
 * Typical use case: after an operation succeeds, data of the same origin in multiple components must be refreshed; set the same `key` in their `useLoad` calls and refresh them all through this hook.
 *
 * @param key The key set in `useLoad`, matching the instances to reload.
 * @returns Returns the reload function.
 */
function useReload(key: NonNullable<unknown>) {
  const store = getLoadStore();

  const reload = usePersist(() => {
    store.getReloaders(key).forEach((reload) => {
      reload();
    });
  });

  return reload;
}

export default useReload;

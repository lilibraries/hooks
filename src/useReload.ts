import getLoadStore from "./utils/getLoadStore";
import usePersist from "./usePersist";

interface UseReloadOptions {
  /** Whether to reload forcibly, bypassing the `staleTime` cache hit of the associated `useLoad` instances. */
  force?: boolean;
}

/**
 * Return a function for reloading requests. It shares the load store with `useLoad`,
 * and calling it reloads all `useLoad` instances that set the same `key` (each using its own most recent params or `defaultParams`).
 *
 * Typical use case: after an operation succeeds, data of the same origin in multiple components must be refreshed; set the same `key` in their `useLoad` calls and refresh them all through this hook.
 *
 * @param key The key set in `useLoad`, matching the instances to reload.
 * @param options The options object, see `UseReloadOptions`.
 * @returns Returns the reload function. It also accepts an options object; the `force` passed on call overrides the hook-level one.
 */
function useReload(key: NonNullable<unknown>, options?: UseReloadOptions) {
  const store = getLoadStore();

  const reload = usePersist((params?: UseReloadOptions) => {
    // The per-call `force` takes precedence over the hook-level one; `??` (instead of `||`) lets a call
    // explicitly downgrade to non-forced reloading even when the hook-level `force` is `true`.
    const force = params?.force ?? options?.force ?? false;

    store.getReloaders(key).forEach((reload) => {
      reload({ force });
    });
  });

  return reload;
}

export default useReload;

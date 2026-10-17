import { useCache, useMount, useSafeState } from "@lilib/hooks";

import IndexedDBCache from "./IndexedDBCache";

const cache = new IndexedDBCache();
const CACHE_KEY = "cache-key";

function CachedValue() {
  const [value, setCache] = useCache<string>(CACHE_KEY, {
    cache,
    cacheTime: cache.cacheTime,
    defaultValue: "default value",
  });

  return (
    <>
      <div>
        <button onClick={() => setCache(Math.random().toString())}>Set random value</button>{" "}
        <button onClick={() => setCache(undefined)}>Remove</button>
      </div>
      <div>The value is: {value}</div>
      <div>Reload the page — the value survives.</div>
    </>
  );
}

function Example() {
  const [hydrated, setHydrated] = useSafeState(false);

  useMount(() => {
    cache
      .hydrate()
      .catch((error) => {
        // IndexedDB may be unavailable (private browsing, etc.) — proceed
        // with an empty cache instead of blocking forever.
        console.error(error);
      })
      .then(() => setHydrated(true));
  });

  if (!hydrated) {
    return <div>Loading persisted data…</div>;
  }

  return <CachedValue />;
}

export default Example;

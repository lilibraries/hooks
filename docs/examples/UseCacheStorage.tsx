import { useCache } from "@lilib/hooks";

import StorageCache from "./StorageCache";

// Persist to localStorage by default, or pass another storage for a
// different scope: `new StorageCache({ storage: window.sessionStorage })`.
const cache = new StorageCache();
const CACHE_KEY = "cache-key";

function Example() {
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

export default Example;

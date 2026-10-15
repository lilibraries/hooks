import React from "react";
import { useCache } from "@lilib/hooks";
import { LRUCache } from "lru-cache";

// A cache instance shared across components.
const sharedCache = new LRUCache({ max: 100 });

function Example() {
  // The first hook only writes the cache. Its own value does not update unless
  // `cacheSync` is enabled, so it is ignored here. The second hook reads the
  // cache with sync enabled.
  const [, setCache] = useCache<string>("cache-key", { cache: sharedCache });
  const [readerValue] = useCache<string>("cache-key", {
    cache: sharedCache,
    cacheSync: true,
    defaultValue: "default value",
  });

  return (
    <>
      <div>
        <button onClick={() => setCache(Math.random().toString())}>Set random value</button>{" "}
        <button onClick={() => setCache(undefined)}>Remove</button>
      </div>
      <div>The synced reader value is: {readerValue}</div>
    </>
  );
}

export default Example;

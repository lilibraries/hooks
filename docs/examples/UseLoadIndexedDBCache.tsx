import { useLoad, useMount, useSafeState } from "@lilib/hooks";

import IndexedDBCache from "./IndexedDBCache";

const cache = new IndexedDBCache();
const CACHE_KEY = "load-cache-key";

let requestCount = 0;

const fetchNumber = () => {
  return new Promise<number>((resolve) => {
    requestCount += 1;
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Component() {
  // `staleTime` equals the cache time, so no request is sent while the
  // persisted entry is still fresh: reload the page and the number is
  // restored from IndexedDB instantly (watch the request counter stay at 0).
  const { data, loading } = useLoad(fetchNumber, [], {
    cache,
    cacheKey: CACHE_KEY,
    cacheTime: cache.cacheTime,
    staleTime: cache.cacheTime,
  });

  return (
    <div>
      <div>
        Number: {String(data ?? "—")} {loading ? "(Loading...)" : ""}
      </div>
      <div>Requests sent: {requestCount}</div>
    </div>
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

  return <Component />;
}

export default Example;

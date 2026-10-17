import { useLoad } from "@lilib/hooks";

import StorageCache from "./StorageCache";

const cache = new StorageCache();
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

function Example() {
  // `staleTime` equals the cache time, so no request is sent while the
  // persisted entry is still fresh: reload the page and the number is
  // restored from storage instantly (watch the request counter stay at 0).
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

export default Example;

# useLoad

Load async data, typically for network requests. The `callback` function must return a promise. Loads automatically after mount by default (and again when `deps` change); set the `imperative` option to `true` to trigger loading manually via `load` instead.

This hook covers the whole lifecycle of a request:

- **Loading** — automatically or manually, with params (`load(...params)`), or triggered by `deps` changes.
- **Sharing** — instances with the same `key` merge duplicate requests and share the result; [`useReload`](useReload.md) refreshes them all at once.
- **Caching** — `cacheKey` persists data across unmounts (shared with [`useCache`](useCache.md)); `staleTime` skips requests while the data is fresh.
- **Resilience** — automatic retries and an alternate data source via `fallback`.
- **Keeping fresh** — polling and auto-reload on page show, window focus or network reconnect.
- **Control** — `cancel` stops everything; `update` mutates `data` locally.

## How it works

### Loading states

| State          | Meaning                      | Typical use                              |
| -------------- | ---------------------------- | ---------------------------------------- |
| `loading`      | A request is in flight       | Disable buttons, show a spinner          |
| `initializing` | `loading` with no data yet   | First-load skeleton screens              |
| `reloading`    | `loading` with existing data | Keep showing stale data while refreshing |

`initializing` and `reloading` are derived from `loading` and `data` for convenience.

### Control functions

`useLoad` returns five control functions. `load`, `force` and `reload` trigger a load: before starting, each cancels this instance's pending work — the in-flight request, retries, polling and pending auto-reloads — so only one load per instance runs at a time. `update` and `cancel` never send a request.

- **`load(...params)`** — starts a load and passes `params` to `callback` as is. Returns a Promise that resolves with the data on success or rejects with the error on failure. Honors `staleTime`: a fresh cache hit resolves directly without sending a request.
- **`force(...params)`** — same as `load`, but bypasses `staleTime` and always sends the request. It does not interrupt an in-flight shared request: if another instance is already loading the same `key`, the request is still merged and waits for that result.
- **`reload({ force })`** — reloads with the most recent `load` params (or `defaultParams` if `load` was never called with params). Set `force: true` to bypass `staleTime`. Returns nothing.
- **`update(data)`** — updates `data` locally without sending a request. Accepts a new value or a function computed from the previous value. Returns nothing.
- **`cancel()`** — stops this instance's pending work: the in-flight request, retries, polling and pending auto-reloads. The Promise returned by the cancelled `load`/`force` stays pending forever — it neither resolves nor rejects.

| Function            | Sends a request | Cancels pending work | Bypasses `staleTime` |
| ------------------- | --------------- | -------------------- | -------------------- |
| `load(...params)`   | Yes             | Yes                  | No                   |
| `force(...params)`  | Yes             | Yes                  | Yes                  |
| `reload({ force })` | Yes             | Yes                  | With `force: true`   |
| `update(data)`      | No              | No                   | —                    |
| `cancel()`          | No              | Yes                  | —                    |

### Failure handling

When the `callback` fails, `useLoad` walks a fixed pipeline before surfacing `error`:

```
retry callback (≤ retryLimit) → fallback → retry fallback (≤ fallbackRetryLimit) → error
```

`retry`/`fallbackRetry` accept a boolean or a function receiving the error and returning whether to retry. Callback retries wait `retryInterval`, fallback retries wait `fallbackRetryInterval` — both exponential by default. Once the `fallback` is invoked, the primary callback is never retried again.

### Sharing requests

Instances with the same `key` (and `independent: false`) share one request: while one instance is loading, the others merge and wait instead of firing duplicates, and the outcome — success **or** failure — is broadcast to all of them. If the loading instance stops (because it reloads or unmounts), the waiting instances automatically reload with their own params.

A [`useReload`](useReload.md) call reloads all associated instances at once.

### Cache freshness

`staleTime` must be used with `cacheKey`. Within `staleTime` after a cache write, the data is considered fresh: `load`/`reload` and automatic reloads resolve the cached data directly without sending a request. Freshness is derived from the entry's remaining TTL, so all readers and writers of the same `cacheKey` should use a consistent `cacheTime`.

## API

```ts
type LoadCallback = (...args: any[]) => Promise<any>;

interface UseLoadOptions<Callback extends LoadCallback> {
  key?: NonNullable<unknown>;

  idle?: boolean | IdleRequestOptions;
  imperative?: boolean;
  independent?: boolean;

  fallback?: Callback;
  initialData?: Awaited<ReturnType<Callback>>;
  defaultParams?: Parameters<Callback>;

  cache?: LRUCache<any, any>;
  cacheKey?: NonNullable<unknown>;
  cacheTime?: number;
  staleTime?: number;
  cacheValidate?: (data: any) => boolean;

  retry?: boolean | ((error: any) => boolean);
  retryLimit?: number;
  retryInterval?: number | ((count: number) => number);
  fallbackRetry?: boolean | ((error: any) => boolean);
  fallbackRetryLimit?: number;
  fallbackRetryInterval?: number | ((count: number) => number);

  polling?: boolean;
  pollingInterval?: number;
  pollingInPageHidden?: boolean;
  pollingIntervalInPageHidden?: number;

  autoReloadWaitTime?: number;
  autoReloadOnPageShow?: boolean;
  autoReloadOnWindowFocus?: boolean;
  autoReloadOnNetworkReconnect?: boolean;

  onSuccess?: (data: Awaited<ReturnType<Callback>>) => void;
  onFailure?: (error: any) => void;
  onFinally?: () => void;
}

interface UseLoadResults<Callback extends LoadCallback> {
  data: Awaited<ReturnType<Callback>> | undefined;
  error: any;
  loading: boolean;
  reloading: boolean;
  initializing: boolean;

  load: (...params: Parameters<Callback>) => ReturnType<Callback>;
  force: (...params: Parameters<Callback>) => ReturnType<Callback>;
  reload: (options?: { force?: boolean }) => void;
  update: (
    newData:
      | Awaited<ReturnType<Callback>>
      | ((prevData?: Awaited<ReturnType<Callback>>) => Awaited<ReturnType<Callback>>),
  ) => void;
  cancel: () => void;
}

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps: React.DependencyList,
  options: UseLoadOptions<Callback> & { initialData: Awaited<ReturnType<Callback>> },
): Readonly<UseLoadResults<Callback> & { data: Awaited<ReturnType<Callback>> }>;

function useLoad<Callback extends LoadCallback>(
  callback: Callback,
  deps?: React.DependencyList,
  options?: UseLoadOptions<Callback>,
): Readonly<UseLoadResults<Callback>>;
```

Parameters:

- **`callback`:** A function that returns a promise. It is automatically called after the component is mounted by default.
- **`deps`:** The dependency array; any change triggers an automatic reload. Default is `[]` (load once after mount).
- **`options`:** Options object.
  - **Loading control:**
    - **`options.imperative`:** Run the callback manually by calling the `load` function, rather than automatically after the component is mounted.
    - **`options.defaultParams`:** Default params passed to `callback` and `fallback`. Used by the first load, or by `reload` when `load(...params)` has never been called.
  - **Request sharing:**
    - **`options.key`:** A shared key that can be any data type except `null` and `undefined`, and must be immutable. When multiple instances use the same key, only the first one sends the request, and the others wait for and reuse its result. Set the `independent` option to `true` to disable this behavior. Another use of the `key` option is reloading all associated requests together with the [`useReload`](useReload.md) hook.
    - **`options.independent`:** When `true`, duplicate requests are not merged even if `key` is set: each instance fires its own request, but `useReload(key)` can still reload it.
  - **Caching:**
    - **`options.cache`:** Cache instance. Create it with `new LRUCache({ max, ttl, ... })` from [`lru-cache`](https://github.com/isaacs/node-lru-cache). If not specified, a shared internal instance (the same one used by [`useCache`](useCache.md)) is used. Pass the same instance to `useCache` to let the two hooks share data.
    - **`options.cacheKey`:** Cache key to enable caching. It can be any type except `null` and `undefined`, and must be immutable. The resolved data is written to the cache, and the initial `data` is read back from it on mount.
    - **`options.cacheTime`:** Cache time, in milliseconds. Default is 5 minutes. Set `Infinity` for a permanent cache. A `NaN` value falls back to the default.
    - **`options.staleTime`:** Stale time, in milliseconds. Default is `0`. It must be used with `cacheKey`. Within the `staleTime` period after a cache write, the data is considered fresh: calling `load(...params)`, `reload()` or automatic reloads resolves the cached data directly without sending a request. You can bypass the `staleTime` option by calling `force(...params)` or `reload({ force: true })`. Note: the reader and the writer of the same `cacheKey` should use a consistent `cacheTime`, since freshness is derived from the entry's remaining TTL.
    - **`options.cacheValidate`:** Validate the cache value. If it returns falsy, the `initialData` will be used.
  - **Failure handling:**
    - **`options.fallback`:** When the `callback` function rejects an error and the count of retries has been exhausted, the `fallback` function will be called. Usually used for an alternate data source.
    - **`options.retry`:** Enable retrying the callback. Default is `false`. It can be a function that receives the error and returns whether to retry.
    - **`options.retryLimit`:** Callback retry limit. Default is `3`.
    - **`options.retryInterval`:** Callback retry interval, in milliseconds. Defaults to exponential growth: the `count`-th retry waits 2^(count-1) × 1000 ms. You can set a function that returns a number for this option, for example `(count) => Math.pow(2, count)`.
    - **`options.fallbackRetry`:** Enable retrying the fallback function after it fails too. Default is `false`. It can be a function that receives the error and returns whether to retry.
    - **`options.fallbackRetryLimit`:** Fallback retry limit. Default is `3`.
    - **`options.fallbackRetryInterval`:** Fallback retry interval, in milliseconds. Defaults to exponential growth like `retryInterval`. It can also be a function.
  - **Polling:**
    - **`options.polling`:** Enable polling when the page is visible: after each request settles, it reloads automatically after `pollingInterval`. Default is `false`.
    - **`options.pollingInterval`:** Polling interval when the page is visible, in milliseconds. Default is `30000`.
    - **`options.pollingInPageHidden`:** Enable polling when the page is hidden. Default is `false`. This option is independent of the `polling` option.
    - **`options.pollingIntervalInPageHidden`:** Polling interval when the page is hidden, in milliseconds. Default is `60000`.
  - **Auto reload:**
    - **`options.autoReloadWaitTime`:** Throttle wait time on auto reload, in milliseconds: among consecutive triggers only the first runs, later triggers within the window are ignored. Default is `10000`.
    - **`options.autoReloadOnPageShow`:** Enable auto reload on page show. Default is `false`.
    - **`options.autoReloadOnWindowFocus`:** Enable auto reload on window focus. Default is `false`.
    - **`options.autoReloadOnNetworkReconnect`:** Enable auto reload on network reconnect. Default is `false`.
  - **Scheduling:**
    - **`options.idle`:** Run the callback during the browser's idle periods. You can pass an `IdleRequestOptions` object to limit the max waiting time.
  - **Events:**
    - **`options.onSuccess`:** Called on success with the loaded data.
    - **`options.onFailure`:** Called on failure with the error object.
    - **`options.onFinally`:** Called when loading settles (success or failure).

Results:

- **State:**
  - **`data`:** Resolved data. Starts with `initialData` or the value restored from the cache via `cacheKey`; otherwise `undefined` until the first load succeeds.
  - **`error`:** The error of the most recent failure, `null` on success. Initial value is `null`.
  - **`loading`:** Loading state. Initial value is `true` by default, or `false` when `imperative: true`.
  - **`reloading`:** Equal to `loading && data !== undefined`. Provided for convenience.
  - **`initializing`:** Equal to `loading && data === undefined`. Provided for convenience.
- **Actions:**
  - **`load`:** Load function. Its params are passed to the `callback` as is. It returns a promise that resolves with the data on success, or rejects with the error on failure. Note: calling it before the component mounts returns a promise that never settles, so do not call it during `useLayoutEffect`.
  - **`force`:** Similar to the `load` function, but it bypasses the `staleTime` cache hit and always sends the request. Note that it does not interrupt in-flight shared requests: if another instance is already loading the same `key`, the request is still merged and waits for that result.
  - **`reload`:** Reload function. It cancels this instance's pending work (the in-flight request, retries, polling and pending auto-reloads) first, then reloads with the params from the most recent `load` call (or `defaultParams` if none were ever passed). When the `force` option is set to `true`, the `staleTime` option will be ignored.
  - **`update`:** Update the `data` locally without sending a request. It accepts a new value or a function computed from the old value.
  - **`cancel`:** Cancel this instance's pending work: the in-flight request, retries, polling and pending auto-reloads. The promise returned by the cancelled `load`/`force` stays pending forever.

## Examples

### Basics

#### Load async data

_The loader resolves after one second — the `error`, `loading` and `data` states each render in turn._

```tsx
import { useLoad } from "@lilib/hooks";

const fetchData = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("@lilib/hooks");
    }, 1000);
  });
};

function Example() {
  const { data, error, loading } = useLoad(fetchData);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Data: {data}</div>;
}

export default Example;
```

#### Refresh without hiding the data

_Click Reload — the old number stays visible while the new request is in flight._

```tsx
import { useLoad } from "@lilib/hooks";

const fetchNumber = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Example() {
  const { data, initializing, reloading, reload } = useLoad(fetchNumber);

  return (
    <div>
      {initializing ? "Loading..." : `Number: ${data}`}
      {reloading ? " (Reloading...)" : ""}
      <br />
      <button onClick={() => reload()}>Reload</button>
    </div>
  );
}

export default Example;
```

#### Reload when dependencies change

_Increase the counter — each change triggers a reload._

```tsx
import { useState } from "react";
import { useLoad } from "@lilib/hooks";

const fetchUser = (userId: number) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`User ${userId}`);
    }, 1000);
  });
};

function UserCard({ userId }: { userId: number }) {
  const { data, loading } = useLoad(() => fetchUser(userId), [userId]);

  return <div>User: {loading ? "Loading..." : data}</div>;
}

function Example() {
  const [userId, setUserId] = useState(1);

  return (
    <div>
      <button onClick={() => setUserId((userId) => (userId % 3) + 1)}>Switch user</button>
      <UserCard userId={userId} />
    </div>
  );
}

export default Example;
```

#### Trigger loading manually

_Nothing loads until you click the button._

```tsx
import { useLoad } from "@lilib/hooks";

const fetchNumber = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Example() {
  const { data, loading, load } = useLoad(fetchNumber, [], { imperative: true });

  return (
    <div>
      <button onClick={() => load()}>Load</button>
      Number: {loading ? "Loading..." : String(data)}
    </div>
  );
}

export default Example;
```

#### Pass params to the loader

_Pick a multiplier and click Load. `defaultParams` powers the first automatic load; `initialData` is shown before any data arrives._

```tsx
import { useState } from "react";
import { useLoad } from "@lilib/hooks";

const fetchCount = (multiplier: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10 * multiplier);
    }, 1000);
  });
};

function Example() {
  const [multiplier, setMultiplier] = useState(1);

  // `initialData` is shown before any data arrives; `defaultParams` are used by the first load.
  const { data, loading, load } = useLoad(fetchCount, [], {
    initialData: -1,
    defaultParams: [1],
  });

  return (
    <div>
      <select value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))}>
        <option value={1}>×1</option>
        <option value={2}>×2</option>
        <option value={3}>×3</option>
      </select>
      <button onClick={() => load(multiplier)}>Load</button>
      Count: {data} {loading ? "(Loading...)" : ""}
    </div>
  );
}

export default Example;
```

#### Update data locally

_Click +1 locally — no request is sent. Reload fetches a new number from the server. Watch the counter._

```tsx
import { useLoad } from "@lilib/hooks";

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
  const { data, loading, update, reload } = useLoad(fetchNumber);

  return (
    <div>
      Number: {String(data ?? "—")} {loading ? "(Loading...)" : ""}
      <br />
      <button onClick={() => update((prev) => (prev ?? 0) + 1)}>+1 locally</button>
      <button onClick={() => reload()}>Reload from server</button>
      Requests sent: {requestCount}
    </div>
  );
}

export default Example;
```

### Sharing requests

The `key` option merges duplicate requests and lets you refresh all associated instances together — pair it with [`useReload`](useReload.md).

#### Share a request across components

_Two components, one request — the counter stays at 1._

```tsx
import { useLoad, useReload } from "@lilib/hooks";

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
  const { data, loading } = useLoad(fetchNumber, [], { key: "load-key" });

  return <div>Number: {loading ? "Loading..." : data}</div>;
}

function Example() {
  const reload = useReload("load-key");

  return (
    <div>
      <Component />
      <Component />
      Requests sent: {requestCount}
      <button onClick={() => reload()}>Reload</button>
    </div>
  );
}

export default Example;
```

#### Keep instances independent

_Each component fires its own request — the counter goes to 2. The Reload button still refreshes both._

```tsx
import { useLoad, useReload } from "@lilib/hooks";

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
  const { data, loading } = useLoad(fetchNumber, [], {
    key: "load-independent",
    independent: true,
  });

  return <div>Number: {loading ? "Loading..." : data}</div>;
}

function Example() {
  const reload = useReload("load-independent");

  return (
    <div>
      <Component />
      <Component />
      Requests sent: {requestCount}
      <button onClick={() => reload()}>Reload</button>
    </div>
  );
}

export default Example;
```

### Caching

`cacheKey` persists the resolved data across unmounts, and `staleTime` skips requests while the data is still fresh.

#### Cache data across unmounts

_Hide and show the component — the cached number appears instantly._

```tsx
import { useLoad, useToggle } from "@lilib/hooks";

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
  const { data, loading } = useLoad(fetchNumber, [], {
    cacheKey: "load-cache-key",
  });

  return (
    <div>
      Number: {String(data ?? "—")} {loading ? "(Loading...)" : ""}
    </div>
  );
}

function Example() {
  const [visible, { toggle }] = useToggle(false);

  return (
    <div>
      <button onClick={() => toggle()}>{visible ? "Hide" : "Show"}</button>
      Requests sent: {requestCount}
      {visible && <Component />}
    </div>
  );
}

export default Example;
```

#### Skip requests within the stale time

`staleTime` must be used with `cacheKey`.

_Within 5 seconds, Load reuses the cached number without a new request; Force always fetches._

```tsx
import { useLoad } from "@lilib/hooks";

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
  const { data, loading, load, force } = useLoad(fetchNumber, [], {
    imperative: true,
    cacheKey: "load-stale-time",
    staleTime: 5000,
  });

  return (
    <div>
      <button onClick={() => load()}>Load</button>
      <button onClick={() => force()}>Force</button>
      Number: {loading ? "Loading..." : String(data)}
      <br />
      Requests sent: {requestCount}
    </div>
  );
}

export default Example;
```

#### Persist cached data to storage

`useLoad` reads the initial `data` from the cache and writes resolved data with `cache.set`, so a write-through cache subclass persists both automatically. This example uses the `StorageCache` implementation shown below; `staleTime` equals the cache time, so the cached number is restored without a new request.

_Reload the page — the number appears instantly and the request counter stays at 0._

```tsx
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
```

**The full `StorageCache` implementation**

**StorageCache.ts**

```tsx
import { LRUCache } from "lru-cache";

export interface StorageCacheOptions {
  /** Storage to persist to. Defaults to `window.localStorage`. Pass `window.sessionStorage` for a session-scoped cache. */
  storage?: Storage | null;
  /** Key prefix in the storage. Default is `"lilib:"`. Pass a distinct prefix when multiple cache instances share the same storage. */
  prefix?: string;
  /** Cache time in milliseconds, used to compute the persisted TTL. Default is 5 minutes. */
  cacheTime?: number;
  /** Maximum number of in-memory entries. Default is `100`. */
  max?: number;
}

interface PersistedEntry {
  value: any;
  // `JSON.stringify` turns `Infinity` into `null`, so `null` is read back as
  // `Infinity` (a permanent cache) instead of `NaN`.
  expiresAt: number | null;
}

// A write-through `LRUCache` that persists its entries to a `Storage`
// (`localStorage` by default, or `sessionStorage` via the `storage` option),
// so the cache survives page reloads. `set` writes the value to the storage,
// and `dispose` removes the persisted copy whenever an entry leaves the
// in-memory cache (delete, eviction, expiry purge or overwrite). Persisted
// entries are restored synchronously in the constructor. Share an instance
// between `useCache` and `useLoad` through their `cache` option.
export class StorageCache extends LRUCache<string, any> {
  /** The cache time used to compute the persisted TTL. Pass it to the `cacheTime` options of `useCache`/`useLoad`. */
  readonly cacheTime: number;

  private storage: Storage | null;
  private prefix: string;

  constructor(options: StorageCacheOptions = {}) {
    const { storage, prefix = "lilib:", cacheTime = 5 * 60 * 1000, max = 100 } = options;
    super({
      max,
      dispose: (_value, key) => this.removePersistedEntry(key),
    });
    this.storage = storage ?? StorageCache.getDefaultStorage();
    this.prefix = prefix;
    this.cacheTime = cacheTime;
    // Storage reads are synchronous, so persisted entries can be restored
    // right in the constructor — no loading state is needed.
    if (this.storage) {
      this.hydrate();
    }
  }

  // Accessing `window.localStorage` can throw (blocked storage, private
  // browsing) — fall back to a disabled cache instead of crashing.
  private static getDefaultStorage(): Storage | null {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  override set(key: string, value: any, options?: LRUCache.SetOptions<string, any, unknown>): this {
    const result = super.set(key, value, options);
    // `LRUCache` treats `set(key, undefined)` as `delete(key)` — nothing to persist.
    if (value !== undefined) {
      // Write through. Overwrites dispose the old entry first, so the old
      // persisted copy is removed before the new one is written.
      this.writePersistedEntry(
        key,
        value,
        StorageCache.toExpiresAt(options?.ttl ?? this.cacheTime),
      );
    }
    return result;
  }

  // `LRUCache` treats `ttl: 0` and `ttl: Infinity` as "never expires"
  // (`useLoad` maps an infinite `cacheTime` to `ttl: 0`), so both mean a
  // permanent entry.
  private static toExpiresAt(ttl: number) {
    return ttl > 0 && ttl < Infinity ? Date.now() + ttl : Infinity;
  }

  // Restore persisted entries, dropping expired ones. Iterate backwards:
  // removing an expired entry shifts the storage indices, and entries behind
  // the cursor have already been visited.
  private hydrate() {
    const storage = this.storage;
    if (!storage) {
      return;
    }
    // Storage access can throw (blocked storage, private browsing) — treat
    // it as an empty cache.
    try {
      for (let i = storage.length - 1; i >= 0; i -= 1) {
        const storageKey = storage.key(i);
        if (storageKey && storageKey.startsWith(this.prefix)) {
          const key = storageKey.slice(this.prefix.length);
          const entry = this.readPersistedEntry(key);
          const ttl = (entry?.expiresAt == null ? Infinity : entry.expiresAt) - Date.now();
          if (entry && ttl > 0) {
            // `super.set` restores the entry without persisting it again.
            super.set(key, entry.value, { ttl });
          } else {
            this.removePersistedEntry(key);
          }
        }
      }
    } catch {
      // The in-memory cache stays empty.
    }
  }

  private readPersistedEntry(key: string): PersistedEntry | undefined {
    try {
      const raw = this.storage?.getItem(this.prefix + key);
      if (raw == null) {
        return undefined;
      }
      return JSON.parse(raw) as PersistedEntry;
    } catch {
      return undefined;
    }
  }

  private writePersistedEntry(key: string, value: any, expiresAt: number) {
    // Persisting is best-effort: quota errors or non-serializable values
    // must not break the caller — the in-memory cache remains the source
    // of truth.
    try {
      this.storage?.setItem(this.prefix + key, JSON.stringify({ value, expiresAt }));
    } catch {
      // Ignore.
    }
  }

  private removePersistedEntry(key: string) {
    try {
      this.storage?.removeItem(this.prefix + key);
    } catch {
      // Ignore.
    }
  }
}

export default StorageCache;
```

#### Persist cached data to IndexedDB

The async `IndexedDBCache` (implementation shown below) needs hydration before the first render — the example gates the component until the cache is hydrated.

_Reload the page — the number is restored from IndexedDB instantly and the request counter stays at 0._

```tsx
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
```

**The full `IndexedDBCache` implementation**

**IndexedDBCache.ts**

```tsx
import { LRUCache } from "lru-cache";

export interface IndexedDBCacheOptions {
  /** Database name. Default is `"lilib"`. Pass a distinct name when multiple apps share the same origin. */
  databaseName?: string;
  /** Object store name. Default is `"hooks"`. */
  storeName?: string;
  /** Cache time in milliseconds, used to compute the persisted TTL. Default is 5 minutes. */
  cacheTime?: number;
  /** Maximum number of in-memory entries. Default is `100`. */
  max?: number;
}

interface PersistedEntry {
  value: any;
  expiresAt: number;
}

// A write-through `LRUCache` that persists its entries to IndexedDB, so the
// cache survives page reloads. Unlike `StorageCache`, IndexedDB is
// asynchronous, so the cache cannot be restored in the constructor: call
// `hydrate` before rendering any `useCache`/`useLoad` call that uses this
// instance. Share an instance between `useCache` and `useLoad` through their
// `cache` option.
export class IndexedDBCache extends LRUCache<string, any> {
  /** The cache time used to compute the persisted TTL. Pass it to the `cacheTime` options of `useCache`/`useLoad`. */
  readonly cacheTime: number;

  private databaseName: string;
  private storeName: string;
  private databasePromise: Promise<IDBDatabase> | undefined;

  constructor(options: IndexedDBCacheOptions = {}) {
    const {
      databaseName = "lilib",
      storeName = "hooks",
      cacheTime = 5 * 60 * 1000,
      max = 100,
    } = options;
    super({
      max,
      // Remove the persisted copy whenever an entry leaves the in-memory
      // cache (delete, eviction, expiry purge or overwrite). IndexedDB writes
      // are async, so the removals are fire-and-forget (failures are ignored)
      // — the in-memory cache remains the source of truth.
      dispose: (_value, key) => {
        void this.removeEntry(key).catch(() => {});
      },
    });
    this.databaseName = databaseName;
    this.storeName = storeName;
    this.cacheTime = cacheTime;
  }

  override set(key: string, value: any, options?: LRUCache.SetOptions<string, any, unknown>): this {
    const result = super.set(key, value, options);
    // `LRUCache` treats `set(key, undefined)` as `delete(key)` — nothing to persist.
    if (value !== undefined) {
      void this.writeEntry(key, {
        value,
        expiresAt: IndexedDBCache.toExpiresAt(options?.ttl ?? this.cacheTime),
      }).catch(() => {});
    }
    return result;
  }

  // `LRUCache` treats `ttl: 0` and `ttl: Infinity` as "never expires"
  // (`useLoad` maps an infinite `cacheTime` to `ttl: 0`), so both mean a
  // permanent entry.
  private static toExpiresAt(ttl: number) {
    return ttl > 0 && ttl < Infinity ? Date.now() + ttl : Infinity;
  }

  // Restore persisted entries into the cache, dropping expired ones. Skip
  // entries that a previous run (e.g. StrictMode's double invocation) has
  // already restored: overwriting them would dispose and delete the persisted
  // copy.
  async hydrate() {
    const entries = await this.readAllEntries();
    for (const [key, entry] of entries) {
      if (this.has(key)) {
        continue;
      }
      const ttl = entry.expiresAt - Date.now();
      if (ttl > 0) {
        // `super.set` restores the entry without persisting it again.
        super.set(key, entry.value, { ttl });
      } else {
        void this.removeEntry(key).catch(() => {});
      }
    }
  }

  // One lazy connection for all operations. IndexedDB serializes transactions
  // on a connection, so operations run in the order they are created.
  private getDatabase(): Promise<IDBDatabase> {
    if (!this.databasePromise) {
      this.databasePromise = this.openDatabase()
        .then((db) => {
          if (db.objectStoreNames.contains(this.storeName)) {
            return db;
          }
          // The database exists but the store is missing (e.g. it was created
          // by an older build with a different store name, so no upgrade ever
          // ran): close it and reopen with a bumped version so
          // `onupgradeneeded` fires and creates the store.
          const nextVersion = db.version + 1;
          db.close();
          return this.openDatabase(nextVersion);
        })
        .catch((error) => {
          // A transient failure (e.g. the version upgrade is blocked by an
          // open connection) must not disable persistence forever — allow
          // the next operation to retry.
          this.databasePromise = undefined;
          throw error;
        });
    }
    return this.databasePromise;
  }

  private openDatabase(version?: number): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.databaseName, version);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(this.storeName)) {
          request.result.createObjectStore(this.storeName);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => {
        reject(
          new Error(
            `Upgrading the "${this.databaseName}" database is blocked by another connection.`,
          ),
        );
      };
    });
  }

  private async readAllEntries(): Promise<Array<[string, PersistedEntry]>> {
    const db = await this.getDatabase();
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(this.storeName, "readonly")
        .objectStore(this.storeName)
        .openCursor();
      const entries: Array<[string, PersistedEntry]> = [];
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          entries.push([cursor.key as string, cursor.value as PersistedEntry]);
          cursor.continue();
        } else {
          resolve(entries);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  private async writeEntry(key: string, entry: PersistedEntry): Promise<void> {
    const db = await this.getDatabase();
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(this.storeName, "readwrite")
        .objectStore(this.storeName)
        .put(entry, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async removeEntry(key: string): Promise<void> {
    const db = await this.getDatabase();
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(this.storeName, "readwrite")
        .objectStore(this.storeName)
        .delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export default IndexedDBCache;
```

### Resilience

Retry automatically on failure and/or fall back to an alternate source. See [Failure handling](#failure-handling) for the exact order.

#### Handle errors and retry manually

_The first click always fails — click Retry to recover._

```tsx
import { useEffect } from "react";
import { useLoad } from "@lilib/hooks";

let shouldFail = true;

const fetchData = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        shouldFail = false;
        reject(new Error("network error"));
      } else {
        resolve("recovered data");
      }
    }, 1000);
  });
};

function Example() {
  useEffect(() => {
    shouldFail = true;
  }, []);

  const { data, error, loading, load } = useLoad(fetchData, [], { imperative: true });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        Error: {error.message}
        <button onClick={() => load()}>Retry</button>
      </div>
    );
  }
  return <div>Data: {data}</div>;
}

export default Example;
```

#### Retry on failure

_The first two attempts fail, the third succeeds._

```tsx
import { useEffect } from "react";
import { useLoad } from "@lilib/hooks";

let attempt = 0;

const fetchData = () => {
  attempt += 1;
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (attempt >= 3) {
        resolve("resolved");
      } else {
        reject(new Error(`attempt ${attempt} failed`));
      }
    }, 1000);
  });
};

function Example() {
  useEffect(() => {
    attempt = 0;
  }, []);

  const { data, error, loading, load } = useLoad(fetchData, [], {
    imperative: true,
    retry: true,
    retryInterval: 1000,
  });

  return (
    <div>
      <button
        onClick={() => {
          attempt = 0;
          load().catch(() => {});
        }}
      >
        Load
      </button>
      {attempt > 0 && <div>Attempt: {attempt}</div>}
      {loading ? "Loading..." : error ? `Error: ${error.message}` : data}
    </div>
  );
}

export default Example;
```

#### Fall back to an alternate source

_The primary source always fails — the data always comes from the fallback._

```tsx
import { useLoad } from "@lilib/hooks";

const fetchFromPrimary = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("primary source failed"));
    }, 1000);
  });
};

const fetchFromFallback = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("data from fallback");
    }, 1000);
  });
};

function Example() {
  // The primary source always fails, so the data always comes from the fallback.
  const { data, error, loading } = useLoad(fetchFromPrimary, [], {
    fallback: fetchFromFallback,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Data: {data}</div>;
}

export default Example;
```

### Polling and auto reload

Keep the data fresh with polling, or reload when the user returns to the page.

#### Poll for updates

_Click Start and watch the counter tick every 3 seconds; Cancel stops it._

```tsx
import { useLoad } from "@lilib/hooks";

let count = 0;
const fetchCount = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(++count);
    }, 1000);
  });
};

function Example() {
  const { data, loading, load, cancel } = useLoad(fetchCount, [], {
    imperative: true,
    polling: true,
    pollingInterval: 3000,
  });

  return (
    <div>
      <button onClick={() => load()}>Start</button>
      <button onClick={() => cancel()}>Cancel</button>
      Count: {data} {loading ? "(Loading...)" : ""}
    </div>
  );
}

export default Example;
```

#### Reload on page show, focus or reconnect

_Switch to another tab and come back — the request count increases._

```tsx
import { useLoad } from "@lilib/hooks";

let count = 0;
const fetchCount = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(++count);
    }, 1000);
  });
};

function Example() {
  const { data, loading } = useLoad(fetchCount, [], {
    autoReloadOnPageShow: true,
    autoReloadOnWindowFocus: true,
    autoReloadOnNetworkReconnect: true,
  });

  return (
    <div>
      Requests: {data} {loading ? "(Loading...)" : ""}
      <br />
      Switch to another tab and come back to see it reload.
    </div>
  );
}

export default Example;
```

### Advanced

#### Watch load events

_Each click prints the callback order on the page._

```tsx
import { useState } from "react";
import { useLoad } from "@lilib/hooks";

const fetchData = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        resolve("resolved");
      } else {
        reject(new Error("rejected"));
      }
    }, 1000);
  });
};

function Example() {
  const [logs, setLogs] = useState<string[]>([]);

  const { load } = useLoad(fetchData, [], {
    imperative: true,
    onSuccess: () => {
      setLogs((logs) => [...logs, "onSuccess"]);
    },
    onFailure: () => {
      setLogs((logs) => [...logs, "onFailure"]);
    },
    onFinally: () => {
      setLogs((logs) => [...logs, "onFinally"]);
    },
  });

  function handleClick() {
    setLogs([]);
    load()
      .then(() => {
        setLogs((logs) => [...logs, "then"]);
      })
      .catch(() => {
        setLogs((logs) => [...logs, "catch"]);
      });
  }

  return (
    <div>
      <button onClick={handleClick}>Load</button>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default Example;
```

#### Append results to a list

_Each load appends the next item to the list._

```tsx
import { useState } from "react";
import { useLoad } from "@lilib/hooks";

// Each load fetches the next page (in a real app, triggered by scrolling).
const fetchPage = (page: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(page);
    }, 1000);
  });
};

function Example() {
  const [list, setList] = useState<number[]>([]);
  const [page, setPage] = useState(0);

  const { loading, load } = useLoad(fetchPage, [], {
    imperative: true,
    onSuccess: (page) => {
      setList((list) => [...list, page]);
      setPage(page);
    },
  });

  return (
    <div>
      <button onClick={() => load(page + 1)}>Load page</button>
      <ul>
        {list.map((item) => (
          <li key={item}>Page {item}</li>
        ))}
        {loading && <li key="loading">Loading...</li>}
      </ul>
    </div>
  );
}

export default Example;
```

#### Search with automatic request cancellation

_Type quickly — earlier requests are cancelled, and only the latest result is shown._

```tsx
import { useState } from "react";
import { useLoad } from "@lilib/hooks";

let requestCount = 0;

const search = (keyword: string) => {
  return new Promise<string>((resolve) => {
    requestCount += 1;
    setTimeout(() => {
      resolve(`results for "${keyword}"`);
    }, 1000);
  });
};

function Example() {
  const [keyword, setKeyword] = useState("");

  const { data, loading, load } = useLoad(search, [], { imperative: true });

  return (
    <div>
      <input
        value={keyword}
        onChange={(event) => {
          const value = event.target.value;
          setKeyword(value);
          if (value) {
            load(value);
          }
        }}
        placeholder="Type to search..."
      />
      <div>Requests sent: {requestCount}</div>
      {keyword ? <div>{loading ? "Searching..." : data}</div> : <div>No keyword yet.</div>}
    </div>
  );
}

export default Example;
```

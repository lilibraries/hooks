# useCache

Cache data for a certain period of time, and synchronize data between components sharing the same [`LRUCache`](https://github.com/isaacs/node-lru-cache) instance. Pass a cache instance via `options.cache`, otherwise a shared internal instance is used.

## API

```ts
interface UseCacheOptions<T> {
  defaultValue?: T;
  cache?: LRUCache<any, any>;
  cacheTime?: number;
  cacheSync?: boolean | { set?: boolean; delete?: boolean };
  validate?: (value: any) => boolean;
  onSet?: (value: any) => void;
  onDelete?: (value: any) => void;
}

function useCache<T>(
  key: NonNullable<unknown>,
  options: UseCacheOptions<T> & { defaultValue: T },
): [value: T, setCache: (newValue: T | undefined) => void];

function useCache<T>(
  key: NonNullable<unknown>,
  options?: UseCacheOptions<T>,
): [value: T | undefined, setCache: (newValue: T | undefined) => void];
```

Parameters:

- **`key`:** Cache key. Any value except `null` and `undefined`.
- **`options`:** Options object.
  - **`options.defaultValue`:** Default value when the cache value does not exist. When set, the returned `value` type no longer includes `undefined`.
  - **`options.cache`:** Cache instance. Create it with `new LRUCache({ max, ttl, ... })` from [`lru-cache`](https://github.com/isaacs/node-lru-cache). If not specified, a shared internal instance is used.
  - **`options.cacheTime`:** Cache time, in milliseconds. Default is 5 minutes. The TTL is set per entry, so it works regardless of the `ttl` option of the cache instance. You can set a permanent cache by setting this option to `Infinity` (mapped to `ttl: 0`, so no expiry timer is registered). Non-positive values are normalized to 1 ms, so the entry expires on the next read. A `NaN` value falls back to the default.
  - **`options.cacheSync`:** Whether to synchronize data between components on set and/or delete events. Default is `false`. It can be an object to enable synchronization for each event separately.
    - **`options.cacheSync.set`:** Synchronize data on set cache.
    - **`options.cacheSync.delete`:** Synchronize data on delete cache or when cache time expires.
  - **`options.validate`:** Validate the cache value. If it returns falsy, the `defaultValue` will be used.
  - **`options.onSet`:** Data set event. The `value` param will not be validated by the `validate` function.
  - **`options.onDelete`:** Data delete event. The `value` param will not be validated by the `validate` function.

Results:

- **`value`:** Cache value or default value.
- **`setCache`:** The function to set cache. If the `newValue` param is `undefined`, the cache will be deleted.

## Notes

- **Important**: `key` must be an immutable value: changing it triggers a warning and may corrupt shared state.
- The default cache is a shared internal instance, so keys are global across the whole app. Pass your own `LRUCache` instance to isolate groups of components.
- `cacheSync` only synchronizes components that share the same cache instance.
- [`LRUCache`](https://github.com/isaacs/node-lru-cache) expires entries lazily: expired entries are only removed and notified when they are read, so an expired cache may still occupy memory until the next read. The shared internal cache enables `ttlAutopurge` to purge expired entries in the background; enable it on your own cache instance if needed.

## Examples

### Basic usage

The following example writes to a shared [`LRUCache`](https://github.com/isaacs/node-lru-cache) instance and reads it back with synchronization enabled.

```tsx
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
```

### Persist to storage

`useCache` stores data in memory only. To make the cache survive page reloads, extend [`LRUCache`](https://github.com/isaacs/node-lru-cache) with a write-through subclass: `set` writes the value back to the storage, and the `dispose` hook removes the persisted copy whenever an entry leaves the in-memory cache (delete, eviction, expiry purge or overwrite). The subclass restores persisted entries in its constructor and stores an `expiresAt` timestamp per entry, so expired data is dropped on restore.

`StorageCache` persists to `localStorage` by default; pass `sessionStorage` via the `storage` option for a session-scoped cache. Because the persistence lives inside the cache subclass, every write is persisted automatically, including writes made directly through `cache.set` — no per-hook `onSet`/`onDelete` options are needed. The same instance can be shared with [`useLoad`](useLoad.md#persist-cached-data-to-storage) through its `cache` option.

```tsx
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

### Persist to IndexedDB

IndexedDB is asynchronous, so `IndexedDBCache` cannot restore persisted entries in its constructor: call `hydrate` in an effect after mount, and render the `useCache` call only after hydration finishes. `useCache` reads the cache exactly once on its first render, so calling it before hydration would permanently miss the persisted value. The write-through layer is the same as in `StorageCache`, except that the IndexedDB operations are async and fire-and-forget. The same instance can be shared with [`useLoad`](useLoad.md#persist-cached-data-to-indexeddb) through its `cache` option.

```tsx
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

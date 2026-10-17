import { LRUCache } from "lru-cache";

export interface IndexedDBCacheOptions {
  /** Database name. Default is `"useCacheExample"`. */
  databaseName?: string;
  /** Object store name. Default is `"cache"`. */
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
    const { databaseName = "useCacheExample", storeName = "cache", cacheTime = 5 * 60 * 1000, max = 100 } = options;
    super({
      max,
      // Remove the persisted copy whenever an entry leaves the in-memory
      // cache (delete, eviction, expiry purge or overwrite). IndexedDB writes
      // are async, so the removals are fire-and-forget — the in-memory cache
      // remains the source of truth.
      dispose: (_value, key) => {
        void this.removeEntry(key);
      },
    });
    this.databaseName = databaseName;
    this.storeName = storeName;
    this.cacheTime = cacheTime;
  }

  override set(key: string, value: any, options?: LRUCache.SetOptions<string, any, unknown>): this {
    const result = super.set(key, value, options);
    void this.writeEntry(key, { value, expiresAt: IndexedDBCache.toExpiresAt(options?.ttl ?? this.cacheTime) });
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
        void this.removeEntry(key);
      }
    }
  }

  // One lazy connection for all operations. IndexedDB serializes transactions
  // on a connection, so operations run in the order they are created.
  private getDatabase(): Promise<IDBDatabase> {
    if (!this.databasePromise) {
      this.databasePromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(this.databaseName, 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains(this.storeName)) {
            request.result.createObjectStore(this.storeName);
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    return this.databasePromise;
  }

  private async readAllEntries(): Promise<Array<[string, PersistedEntry]>> {
    const db = await this.getDatabase();
    return new Promise((resolve, reject) => {
      const request = db.transaction(this.storeName, "readonly").objectStore(this.storeName).openCursor();
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
      const request = db.transaction(this.storeName, "readwrite").objectStore(this.storeName).put(entry, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async removeEntry(key: string): Promise<void> {
    const db = await this.getDatabase();
    return new Promise((resolve, reject) => {
      const request = db.transaction(this.storeName, "readwrite").objectStore(this.storeName).delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export default IndexedDBCache;

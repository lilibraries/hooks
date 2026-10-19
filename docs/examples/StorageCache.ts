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
      this.writePersistedEntry(key, value, StorageCache.toExpiresAt(options?.ttl ?? this.cacheTime));
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

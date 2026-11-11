import { LRUCache } from "lru-cache";

import KeyedEmitter from "./KeyedEmitter";

/**
 * The minimal structural shape of the cache instances accepted by `useCache`
 * and `useLoad`. An [`LRUCache`](https://github.com/isaacs/node-lru-cache)
 * instance satisfies it, and so does any object implementing these methods.
 */
export interface CacheLike<K = any, V = any> {
  /** Return the value of `key`, or `undefined` when the key does not exist. */
  get(key: K): V | undefined;
  /** Store `value` under `key`, replacing the existing entry. `options.ttl` is the time to live in milliseconds, where `0` means "never expires". */
  set(key: K, value: V, options?: { ttl?: number }): void;
  /** Whether `key` exists. Expired entries are reported as missing. */
  has(key: K): boolean;
  /** Remove `key` and its value from the cache. */
  delete(key: K): void;
  /** Return the value of `key` without updating its recency or lifetime; `options.allowStale` also returns expired values. */
  peek(key: K, options?: { allowStale?: boolean }): V | undefined;
  /** Return the remaining time to live of `key` in milliseconds: `0` when the key does not exist, `Infinity` when it never expires. */
  getRemainingTTL(key: K): number;
}

// Cache instances have no event system, so a module-level registry attaches a
// keyed emitter to each cache instance to support cross-component sync. The
// registry is a `WeakMap`, so emitters are garbage collected along with their
// cache instances.
const cacheEmitters = new WeakMap<CacheLike, KeyedEmitter>();

/**
 * Get the keyed emitter through which `useCache` hooks sharing the same cache
 * instance synchronize data. `for(key)` isolates listeners per cache key, and
 * emitters without remaining listeners are pruned automatically.
 */
export function getCacheEmitter(cache: CacheLike) {
  let emitter = cacheEmitters.get(cache);
  if (!emitter) {
    emitter = new KeyedEmitter();
    cacheEmitters.set(cache, emitter);
  }
  return emitter;
}

// A module-level default cache shared by every `useCache` call that does not
// specify `options.cache`.
let defaultCache: LRUCache<any, any> | undefined;

/**
 * Get the default cache instance shared by every `useCache` call that does
 * not specify `options.cache`.
 */
export function getDefaultCache() {
  if (!defaultCache) {
    defaultCache = new LRUCache<any, any>({
      // The shared cache may live for the whole app lifetime, and users
      // cannot configure it, so expired entries must not accumulate until
      // the next read: autopurge removes them in the background as soon as
      // their TTL elapses.
      ttlAutopurge: true,
      maxSize: Number.MAX_SAFE_INTEGER,
      sizeCalculation: () => 1,
    });
  }
  return defaultCache;
}

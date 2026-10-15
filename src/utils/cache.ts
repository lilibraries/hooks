import { LRUCache } from "lru-cache";

import KeyedEmitter from "./KeyedEmitter";

// `LRUCache` instances have no event system, so a module-level registry
// attaches a keyed emitter to each cache instance to support cross-component
// sync. The registry is a `WeakMap`, so emitters are garbage collected along
// with their cache instances.
const cacheEmitters = new WeakMap<LRUCache<any, any>, KeyedEmitter>();

/**
 * Get the keyed emitter through which `useCache` hooks sharing the same
 * `LRUCache` instance synchronize data. `for(key)` isolates listeners per
 * cache key, and emitters without remaining listeners are pruned automatically.
 */
export function getCacheEmitter(cache: LRUCache<any, any>) {
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

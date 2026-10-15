import { LRUCache } from "lru-cache";
import { getCacheEmitter, getDefaultCache } from "../../src/utils/cache";

describe("cache", () => {
  describe("getDefaultCache", () => {
    afterEach(() => {
      // The default cache is a module-level singleton; reset it between tests
      getDefaultCache().clear();
    });

    it("returns the same instance on every call", () => {
      expect(getDefaultCache()).toBe(getDefaultCache());
    });

    it("returns a working LRUCache instance", () => {
      const cache = getDefaultCache();
      cache.set("key", "value");

      expect(cache.get("key")).toBe("value");
      expect(cache.has("key")).toBe(true);
    });

    it("is shared by all callers", () => {
      getDefaultCache().set("key", "value");

      expect(getDefaultCache().get("key")).toBe("value");
    });

    it("supports deletion like a regular LRUCache", () => {
      const cache = getDefaultCache();
      cache.set("key", "value");

      cache.delete("key");

      expect(cache.has("key")).toBe(false);
      expect(cache.get("key")).toBe(undefined);
    });

    it("keeps an unlimited number of entries", () => {
      const cache = getDefaultCache();
      for (let i = 0; i < 100; i++) {
        cache.set(`key-${i}`, i);
      }

      expect(cache.size).toBe(100);
      expect(cache.get("key-99")).toBe(99);
    });

    it("purges expired entries automatically", () => {
      // The shared cache may live for the whole app lifetime, so expired
      // entries must not accumulate until the next read.
      expect(getDefaultCache().ttlAutopurge).toBe(true);
    });
  });

  describe("getCacheEmitter", () => {
    it("returns the same emitter for the same cache instance", () => {
      const cache = new LRUCache({ max: 10 });

      expect(getCacheEmitter(cache)).toBe(getCacheEmitter(cache));
    });

    it("returns different emitters for different cache instances", () => {
      const cacheA = new LRUCache({ max: 10 });
      const cacheB = new LRUCache({ max: 10 });

      expect(getCacheEmitter(cacheA)).not.toBe(getCacheEmitter(cacheB));
    });

    it("emits events to listeners registered on the same cache instance", () => {
      const cache = new LRUCache({ max: 10 });
      const listener = jest.fn();
      getCacheEmitter(cache).for("key").on("set", listener);

      getCacheEmitter(cache).for("key").emit("set", "value");

      expect(listener).toHaveBeenCalledWith("value");
    });

    it("does not emit events across different cache instances", () => {
      const cacheA = new LRUCache({ max: 10 });
      const cacheB = new LRUCache({ max: 10 });
      const listener = jest.fn();
      getCacheEmitter(cacheA).for("key").on("set", listener);

      getCacheEmitter(cacheB).for("key").emit("set", "value");

      expect(listener).not.toHaveBeenCalled();
    });

    it("isolates listeners per key", () => {
      const cache = new LRUCache({ max: 10 });
      const listenerA = jest.fn();
      const listenerB = jest.fn();
      getCacheEmitter(cache).for("a").on("set", listenerA);
      getCacheEmitter(cache).for("b").on("set", listenerB);

      getCacheEmitter(cache).for("a").emit("set", 1);

      expect(listenerA).toHaveBeenCalledWith(1);
      expect(listenerB).not.toHaveBeenCalled();
    });

    it("isolates listeners per event name", () => {
      const cache = new LRUCache({ max: 10 });
      const setListener = jest.fn();
      const deleteListener = jest.fn();
      getCacheEmitter(cache).for("key").on("set", setListener);
      getCacheEmitter(cache).for("key").on("delete", deleteListener);

      getCacheEmitter(cache).for("key").emit("set", "value");

      expect(setListener).toHaveBeenCalledWith("value");
      expect(deleteListener).not.toHaveBeenCalled();
    });

    it("prunes the emitter after the last listener is removed", () => {
      const cache = new LRUCache({ max: 10 });
      const child = getCacheEmitter(cache).for("key");
      const listener = () => {};
      child.on("set", listener);
      expect(getCacheEmitter(cache).for("key")).toBe(child);

      child.off("set", listener);

      expect(getCacheEmitter(cache).for("key")).not.toBe(child);
    });

    it("reuses the same emitter for the same key once it has a listener", () => {
      const cache = new LRUCache({ max: 10 });
      const child = getCacheEmitter(cache).for("key");
      child.on("set", () => {});

      expect(getCacheEmitter(cache).for("key")).toBe(child);
    });
  });
});

import getLoadStore from "../../src/utils/getLoadStore";

type LoadStore = ReturnType<typeof getLoadStore>;

describe("getLoadStore", () => {
  let store: LoadStore;

  beforeEach(() => {
    // The store is a module-level singleton; reset its internal state between tests
    store = getLoadStore();
    (store as any)._loadings.clear();
    (store as any)._reloaders.clear();
    (store as any)._emitters.clear();
    store.removeAllListeners();
  });

  describe("singleton", () => {
    it("returns the same instance on every call", () => {
      expect(getLoadStore()).toBe(store);
    });
  });

  describe("loading state", () => {
    it("isLoading reports whether a key is loading", () => {
      const loader = () => {};
      expect(store.isLoading("key")).toBe(false);

      store.setLoading("key", loader);

      expect(store.isLoading("key")).toBe(true);
    });

    it("isLoading with a loader matches by identity", () => {
      const loader = () => {};
      store.setLoading("key", loader);

      expect(store.isLoading("key", loader)).toBe(true);
      expect(store.isLoading("key", () => {})).toBe(false);
    });

    it("deleteLoading with a mismatching loader keeps the entry", () => {
      const loader = () => {};
      store.setLoading("key", loader);

      store.deleteLoading("key", () => {});

      expect(store.isLoading("key")).toBe(true);

      store.deleteLoading("key", loader);

      expect(store.isLoading("key")).toBe(false);
    });

    it("deleteLoading without a loader always removes the entry", () => {
      const loader = () => {};
      store.setLoading("key", loader);

      store.deleteLoading("key");

      expect(store.isLoading("key")).toBe(false);
    });
  });

  describe("reloaders", () => {
    it("addReloader registers a reloader", () => {
      const reloader = () => {};
      store.addReloader("key", reloader);

      expect(store.getReloaders("key")).toEqual([reloader]);
    });

    it("addReloader ignores duplicates of the same function", () => {
      const reloader = () => {};
      store.addReloader("key", reloader);
      store.addReloader("key", reloader);

      expect(store.getReloaders("key")).toEqual([reloader]);
    });

    it("getReloaders returns an empty array for unknown keys", () => {
      expect(store.getReloaders("key")).toEqual([]);
    });

    it("removeReloader removes a specific reloader", () => {
      const reloaderA = () => {};
      const reloaderB = () => {};
      store.addReloader("key", reloaderA);
      store.addReloader("key", reloaderB);

      store.removeReloader("key", reloaderA);

      expect(store.getReloaders("key")).toEqual([reloaderB]);
    });

    it("removeReloader deletes the key once no reloaders remain", () => {
      const reloader = () => {};
      store.addReloader("key", reloader);

      store.removeReloader("key", reloader);

      expect(store.getReloaders("key")).toEqual([]);
    });

    it("removeReloader ignores unknown keys and unregistered reloaders", () => {
      const reloader = () => {};
      expect(() => store.removeReloader("unknown", reloader)).not.toThrow();

      store.addReloader("key", reloader);
      store.removeReloader("key", () => {});

      expect(store.getReloaders("key")).toEqual([reloader]);
    });
  });

  describe("keyed emitters", () => {
    it("reuses the same child emitter once it has a listener", () => {
      const child = store.for("key");
      child.on("event", () => {});

      expect(store.for("key")).toBe(child);
    });

    it("does not cache child emitters without listeners", () => {
      const first = store.for("key");

      expect(store.for("key")).not.toBe(first);
    });

    it("emits events to listeners of the same key", () => {
      const listener = jest.fn();
      store.for("key").on("event", listener);

      store.for("key").emit("event", 1, 2);

      expect(listener).toHaveBeenCalledWith(1, 2);
    });

    it("isolates listeners of different keys from each other", () => {
      const listenerA = jest.fn();
      const listenerB = jest.fn();
      store.for("a").on("event", listenerA);
      store.for("b").on("event", listenerB);

      store.for("a").emit("event", 1);

      expect(listenerA).toHaveBeenCalledWith(1);
      expect(listenerB).not.toHaveBeenCalled();
    });

    it("does not bubble child events to the parent", () => {
      const listener = jest.fn();
      store.on("event", listener);

      store.for("key").emit("event");

      expect(listener).not.toHaveBeenCalled();
    });

    it("once listeners fire only once", () => {
      const listener = jest.fn();
      store.for("key").once("event", listener);

      store.for("key").emit("event", 1);
      store.for("key").emit("event", 2);

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenCalledWith(1);
    });

    it("addListener is an alias for on", () => {
      const listener = jest.fn();
      store.for("key").addListener("event", listener);

      store.for("key").emit("event");

      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("off without a listener removes every listener of the event", () => {
      const listenerA = jest.fn();
      const listenerB = jest.fn();
      const child = store.for("key");
      child.on("event", listenerA);
      child.on("event", listenerB);

      child.off("event");
      child.emit("event");

      expect(listenerA).not.toHaveBeenCalled();
      expect(listenerB).not.toHaveBeenCalled();
    });

    it("supports symbol keys and symbol event names", () => {
      const key = Symbol("key");
      const event = Symbol("event");
      const listener = jest.fn();
      const child = store.for(key);
      child.on(event, listener);

      child.emit(event, 1);

      expect(listener).toHaveBeenCalledWith(1);
      expect(store.for(key)).toBe(child);
    });

    describe("automatic pruning", () => {
      it("prunes a child emitter after its last listener is removed", () => {
        const child = store.for("key");
        const listener = () => {};
        child.on("event", listener);
        expect(store.for("key")).toBe(child);

        child.off("event", listener);

        expect(store.for("key")).not.toBe(child);
      });

      it("prunes a child emitter after a once listener fires", () => {
        const child = store.for("key");
        child.once("event", () => {});
        expect(store.for("key")).toBe(child);

        child.emit("event");

        expect(store.for("key")).not.toBe(child);
      });

      it("prunes a child emitter when removeAllListeners is called", () => {
        const child = store.for("key");
        child.on("event", () => {});
        expect(store.for("key")).toBe(child);

        child.removeAllListeners();

        expect(store.for("key")).not.toBe(child);
      });

      it("prunes empty child emitters up the hierarchy", () => {
        const outer = store.for("outer");
        const inner = outer.for("inner");
        inner.on("event", () => {});

        inner.removeAllListeners();

        expect(store.for("outer")).not.toBe(outer);
      });

      it("keeps a child emitter while it still has grandchild emitters", () => {
        const outer = store.for("outer");
        outer.for("inner").on("event", () => {});

        outer.removeAllListeners();

        expect(store.for("outer")).toBe(outer);
      });
    });
  });
});

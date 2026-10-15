import getLoadStore from "../../src/utils/getLoadStore";

type LoadStore = ReturnType<typeof getLoadStore>;

describe("getLoadStore", () => {
  let store: LoadStore;

  beforeEach(() => {
    // The store is a module-level singleton; reset its internal state between tests
    store = getLoadStore();
    (store as any)._loadings.clear();
    (store as any)._reloaders.clear();
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
});

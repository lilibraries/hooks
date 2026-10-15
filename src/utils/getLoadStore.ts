import KeyedEmitter from "./KeyedEmitter";

import type { AnyFunction } from "./types";

class LoadStore extends KeyedEmitter {
  _loadings = new Map<NonNullable<unknown>, AnyFunction>();
  _reloaders = new Map<NonNullable<unknown>, AnyFunction[]>();

  isLoading(key: NonNullable<unknown>, loader?: AnyFunction) {
    if (loader) {
      return this._loadings.get(key) === loader;
    } else {
      return this._loadings.has(key);
    }
  }

  setLoading(key: NonNullable<unknown>, loader: AnyFunction) {
    this._loadings.set(key, loader);
  }

  deleteLoading(key: NonNullable<unknown>, loader?: AnyFunction) {
    if (loader) {
      if (this._loadings.get(key) === loader) {
        this._loadings.delete(key);
      }
    } else {
      this._loadings.delete(key);
    }
  }

  getReloaders(key: NonNullable<unknown>) {
    return this._reloaders.get(key) || [];
  }

  addReloader(key: NonNullable<unknown>, reloader: AnyFunction) {
    const reloaders = this._reloaders.get(key);
    if (reloaders) {
      if (!reloaders.includes(reloader)) {
        reloaders.push(reloader);
      }
    } else {
      this._reloaders.set(key, [reloader]);
    }
  }

  removeReloader(key: NonNullable<unknown>, reloader: AnyFunction) {
    const reloaders = this._reloaders.get(key);
    if (reloaders) {
      const lastIndex = reloaders.lastIndexOf(reloader);
      if (lastIndex >= 0) {
        reloaders.splice(lastIndex, 1);
      }
      if (!reloaders.length) {
        this._reloaders.delete(key);
      }
    }
  }
}

let store: LoadStore | undefined;

/**
 * Get the module-level shared load store singleton through which `useLoad` and
 * `useReload` share loading state.
 */
function getLoadStore() {
  if (!store) {
    store = new LoadStore();
  }
  return store;
}

export default getLoadStore;

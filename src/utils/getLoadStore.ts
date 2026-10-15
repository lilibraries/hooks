import { EventEmitter } from "eventemitter3";

import type { AnyFunction } from "./types";

type Name = string | symbol;
type Listener = (...args: any[]) => void;

/**
 * A hierarchical event emitter built on eventemitter3. `for(key)` isolates
 * listeners per key, and child emitters with no remaining listeners are
 * automatically pruned to avoid memory leaks.
 */
class KeyedEmitter extends EventEmitter {
  _emitters = new Map<NonNullable<unknown>, KeyedEmitter>();
  _parent: KeyedEmitter | null = null;
  _forKey!: NonNullable<unknown>;

  for(key: NonNullable<unknown>) {
    let emitter = this._emitters.get(key);
    if (!emitter) {
      emitter = new KeyedEmitter();
      emitter._parent = this;
      emitter._forKey = key;
    }
    return emitter;
  }

  on(name: Name, listener: Listener): this {
    super.on(name, listener);
    this._attach();
    return this;
  }

  addListener(name: Name, listener: Listener): this {
    return this.on(name, listener);
  }

  once(name: Name, listener: Listener): this {
    super.once(name, listener);
    this._attach();
    return this;
  }

  off(name: Name, listener?: Listener): this {
    return this.removeListener(name, listener);
  }

  // `removeListener` must be overridden (not just `off`): eventemitter3 internally
  // cleans up fired `once` listeners during `emit` via `removeListener`. Without
  // this override, emptied emitters would never be pruned, breaking the automatic
  // cleanup promised by the doc comment above.
  removeListener(name: Name, listener?: Listener): this {
    super.removeListener(name, listener);
    this._prune();
    return this;
  }

  removeAllListeners(name?: Name): this {
    super.removeAllListeners(name);
    this._prune();
    return this;
  }

  _attach() {
    if (this._parent) {
      if (!this._parent._emitters.has(this._forKey)) {
        this._parent._emitters.set(this._forKey, this);
      }
      this._parent._attach();
    }
  }

  _prune() {
    if (this._parent && !this._emitters.size && !this.eventNames().length) {
      this._parent._emitters.delete(this._forKey);
      this._parent._prune();
    }
  }
}

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

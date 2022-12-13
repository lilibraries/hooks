import EventEmitter from "./EventEmitter";

class LoadStore extends EventEmitter {
  _loadings = new Map<any, Function>();
  _reloaders = new Map<any, Function[]>();
  _timestamps = new Map<Function, number>();

  isLoading(key: any, loader?: Function) {
    if (loader) {
      return this._loadings.get(key) === loader;
    } else {
      return this._loadings.has(key);
    }
  }

  addLoading(key: any, loader: Function) {
    this._loadings.set(key, loader);
  }

  removeLoading(key: any, loader?: Function) {
    if (loader) {
      if (this._loadings.get(key) === loader) {
        this._loadings.delete(key);
      }
    } else {
      this._loadings.delete(key);
    }
  }

  getReloaders(key: any) {
    return this._reloaders.get(key) || [];
  }

  addReloader(key: any, reloader: Function) {
    const reloaders = this._reloaders.get(key);
    if (reloaders) {
      if (!reloaders.includes(reloader)) {
        reloaders.push(reloader);
      }
    } else {
      this._reloaders.set(key, [reloader]);
    }
  }

  removeReloader(key: any, reloader: Function) {
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

  getTimestamp(loader: Function) {
    return this._timestamps.get(loader);
  }

  recordTimestamp(loader: Function) {
    this._timestamps.set(loader, Date.now());
  }
}

export default LoadStore;

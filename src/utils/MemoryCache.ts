import EventEmitter from "./EventEmitter";

interface Record<D = any> {
  data: D;
  cacheTime: number;
  deleteTimer: number;
  cacheTimestamp: number;
}

class MemoryCache<Key = {}, Data = any> extends EventEmitter {
  static DEFAULT_CACHE_TIME = 5 * 60 * 1000;
  static DEFAULT_MAX_CACHE_TIME = Number.MAX_SAFE_INTEGER;

  _ready = true;
  _records = new Map<Key, Record<Data>>();
  _maxCacheTime = MemoryCache.DEFAULT_MAX_CACHE_TIME;
  _defaultCacheTime = MemoryCache.DEFAULT_CACHE_TIME;

  _checkCacheKey(key: unknown) {
    if (key == null) {
      throw new TypeError(
        `Cache key can't be null or undefined. Received: ${String(key)}.`
      );
    }
  }

  _checkCacheData(data: unknown) {
    if (data === undefined) {
      throw new TypeError("Cache data can't be undefined.");
    }
  }

  _setDeleteRecordTimer(key: Key, cacheTime: number) {
    let timer = 0;
    if (
      cacheTime > 0 &&
      cacheTime <= this._maxCacheTime &&
      cacheTime < Number.MAX_SAFE_INTEGER
    ) {
      timer = +setTimeout(() => {
        this.delete(key);
      }, cacheTime);
    }
    return timer;
  }

  _clearDeleteRecordTimer(key: Key) {
    const record = this._records.get(key);
    if (record && record.deleteTimer) {
      clearTimeout(record.deleteTimer);
    }
  }

  isReady() {
    return this._ready;
  }

  asReady() {
    if (!this._ready) {
      this._ready = true;
      this.emit("ready");
    }
    return this;
  }

  getMaxCacheTime() {
    return this._maxCacheTime;
  }

  setMaxCacheTime(maxCacheTime: number) {
    this._maxCacheTime = maxCacheTime;
    return this;
  }

  getDefaultCacheTime() {
    return this._defaultCacheTime;
  }

  setDefaultCacheTime(defaultCacheTime: number) {
    this._defaultCacheTime = defaultCacheTime;
    return this;
  }

  memorize(
    key: Key,
    data: Data,
    options: { cacheTime?: number; cacheTimestamp?: number } = {}
  ) {
    this._checkCacheKey(key);
    this._checkCacheData(data);
    this._clearDeleteRecordTimer(key);

    const now = Date.now();
    const { cacheTimestamp = now } = options;
    const { cacheTime = this._defaultCacheTime } = options;
    const remainingTime = cacheTimestamp - now + cacheTime;

    if (remainingTime > 0) {
      const deleteTimer = this._setDeleteRecordTimer(key, remainingTime);
      this._records.set(key, { data, cacheTime, deleteTimer, cacheTimestamp });
    } else {
      this._records.delete(key);
    }

    return this;
  }

  set(key: Key, data: Data, options: { cacheTime?: number } = {}) {
    this._checkCacheKey(key);
    this._checkCacheData(data);
    this._clearDeleteRecordTimer(key);

    const { cacheTime = this._defaultCacheTime } = options;
    if (cacheTime > 0) {
      this._records.set(key, {
        data,
        cacheTime,
        deleteTimer: this._setDeleteRecordTimer(key, cacheTime),
        cacheTimestamp: Date.now(),
      });
      this.for(key).emit("set", data);
      this.emit("set", key, data);
    } else {
      this.delete(key);
    }

    return this;
  }

  has(key: Key) {
    return this._records.has(key);
  }

  get(key: Key) {
    return this._records.get(key)?.data;
  }

  getCacheTime(key: Key) {
    return this._records.get(key)?.cacheTime;
  }

  getCacheTimestamp(key: Key) {
    return this._records.get(key)?.cacheTimestamp;
  }

  delete(key: Key) {
    const record = this._records.get(key);
    if (record) {
      this._clearDeleteRecordTimer(key);
      this._records.delete(key);
      this.for(key).emit("delete", record.data);
      this.emit("delete", key, record.data);
    }
    return this;
  }

  clear() {
    const records = new Map(this._records);
    this._records.clear();
    for (const [key, record] of records) {
      if (record.deleteTimer) {
        clearTimeout(record.deleteTimer);
      }
      this.for(key).emit("delete", record.data);
      this.emit("delete", key, record.data);
    }
    this.emit("clear");
    return this;
  }
}

export default MemoryCache;

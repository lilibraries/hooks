import EventEmitter from "./EventEmitter";

interface Record<D = any> {
  data: D;
  cacheTime: number;
  deleteTimer: number;
  cacheTimestamp: number;
}

class MemoryCache<Key = {}, Data = any> extends EventEmitter {
  static EVENT_NAMES = ["ready", "set", "delete", "clear"] as const;
  static DEFAULT_CACHE_TIME = 5 * 60 * 1000;
  static DEFAULT_MAX_CACHE_TIME = Number.MAX_SAFE_INTEGER;

  private readonly records = new Map<Key, Record<Data>>();
  private maxCacheTime = MemoryCache.DEFAULT_MAX_CACHE_TIME;
  private defaultCacheTime = MemoryCache.DEFAULT_CACHE_TIME;

  protected ready = true;

  protected checkEventName(name: any): void {
    if (!MemoryCache.EVENT_NAMES.includes(name)) {
      throw new TypeError(
        `Cache event name must be one of ${MemoryCache.EVENT_NAMES}.` +
          ` Received: ${String(name)}.`
      );
    }
  }

  protected checkCacheKey(key: unknown) {
    if (key == null) {
      throw new TypeError(
        `Cache key can't be null or undefined. Received: ${String(key)}.`
      );
    }
  }

  protected checkCacheData(data: unknown) {
    if (data === undefined) {
      throw new TypeError("Cache data can't be undefined.");
    }
  }

  private setDeleteRecordTimer(key: Key, cacheTime: number) {
    let timer = 0;
    if (
      cacheTime > 0 &&
      cacheTime <= this.maxCacheTime &&
      cacheTime < Number.MAX_SAFE_INTEGER
    ) {
      timer = +setTimeout(() => {
        this.delete(key);
      }, cacheTime);
    }
    return timer;
  }

  private clearDeleteRecordTimer(key: Key) {
    const record = this.records.get(key);
    if (record && record.deleteTimer) {
      clearTimeout(record.deleteTimer);
    }
  }

  isReady() {
    return this.ready;
  }

  asReady() {
    this.ready = true;
    this.emit("ready");
    return this;
  }

  getMaxCacheTime() {
    return this.maxCacheTime;
  }

  setMaxCacheTime(maxCacheTime: number) {
    this.maxCacheTime = maxCacheTime;
    return this;
  }

  getDefaultCacheTime() {
    return this.defaultCacheTime;
  }

  setDefaultCacheTime(defaultCacheTime: number) {
    this.defaultCacheTime = defaultCacheTime;
    return this;
  }

  memorize(
    key: Key,
    data: Data,
    options: { cacheTime?: number; cacheTimestamp?: number } = {}
  ) {
    this.checkCacheKey(key);
    this.checkCacheData(data);
    this.clearDeleteRecordTimer(key);

    const now = Date.now();
    const { cacheTime = this.defaultCacheTime, cacheTimestamp = now } = options;
    const remainingTime = cacheTimestamp - now + cacheTime;

    if (remainingTime > 0) {
      const deleteTimer = this.setDeleteRecordTimer(key, remainingTime);
      this.records.set(key, { data, cacheTime, deleteTimer, cacheTimestamp });
    } else {
      this.records.delete(key);
    }

    return this;
  }

  set(key: Key, data: Data, options: { cacheTime?: number } = {}) {
    this.checkCacheKey(key);
    this.checkCacheData(data);
    this.clearDeleteRecordTimer(key);

    const { cacheTime = this.defaultCacheTime } = options;
    if (cacheTime > 0) {
      this.records.set(key, {
        data,
        cacheTime,
        deleteTimer: this.setDeleteRecordTimer(key, cacheTime),
        cacheTimestamp: Date.now(),
      });
      this.emit("set", key, data);
    } else {
      this.delete(key);
    }

    return this;
  }

  has(key: Key) {
    return this.records.has(key);
  }

  get(key: Key) {
    return this.records.get(key)?.data;
  }

  getCacheTime(key: Key) {
    return this.records.get(key)?.cacheTime;
  }

  getCacheTimestamp(key: Key) {
    return this.records.get(key)?.cacheTimestamp;
  }

  delete(key: Key) {
    const record = this.records.get(key);
    if (record) {
      this.clearDeleteRecordTimer(key);
      this.records.delete(key);
      this.emit("delete", key, record.data);
    }
    return this;
  }

  clear() {
    const entries = this.records.entries();
    this.records.clear();
    for (const [key, record] of entries) {
      if (record.deleteTimer) {
        clearTimeout(record.deleteTimer);
      }
      this.emit("delete", key, record.data);
    }
    this.emit("clear");
    return this;
  }
}

export default MemoryCache;

import EventEmitter from "./EventEmitter";

interface Record<D = any> {
  data: D;
  cacheTime: number;
  deleteTimer: number;
  cacheTimestamp: number;
}

type EventName = "set" | "delete";
type EventListener<K, D> = (key: K, data: D) => void;

class MemoryCache<Key = {}, Data = any> extends EventEmitter<
  EventName,
  EventListener<Key, Data>
> {
  static DEFAULT_CACHE_TIME = 5 * 60 * 1000;
  static DEFAULT_MAX_CACHE_TIME = Number.MAX_SAFE_INTEGER;

  protected readonly records = new Map<Key, Record<Data>>();
  protected maxCacheTime = MemoryCache.DEFAULT_MAX_CACHE_TIME;
  protected defaultCacheTime = MemoryCache.DEFAULT_CACHE_TIME;

  protected setDeleteRecordTimer(key: Key, cacheTime: number) {
    let timer = 0;
    if (cacheTime > 0 && cacheTime <= this.maxCacheTime) {
      timer = +setTimeout(() => {
        this.delete(key);
      }, cacheTime);
    }
    return timer;
  }

  protected clearDeleteRecordTimer(key: Key) {
    const record = this.records.get(key);
    if (record && record.deleteTimer) {
      clearTimeout(record.deleteTimer);
    }
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

  checkEventName(name: unknown): void {
    if (name !== "set" && name !== "delete") {
      throw new TypeError(
        `Cache event name must be "set" or "delete". Received: ${String(name)}.`
      );
    }
  }

  checkCacheKey(key: unknown) {
    if (key == null) {
      throw new TypeError(
        `Cache key can't be null or undefined. Received: ${String(key)}.`
      );
    }
  }
  checkCacheData(data: unknown) {
    if (data === undefined) {
      throw new TypeError("Cache data can't be undefined.");
    }
  }

  getRecord(key: Key) {
    this.checkCacheKey(key);
    return this.records.get(key);
  }

  setRecord(
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

  get(key: Key) {
    this.checkCacheKey(key);
    return this.records.get(key)?.data;
  }

  has(key: Key) {
    this.checkCacheKey(key);
    return this.records.has(key);
  }

  delete(key: Key) {
    this.checkCacheKey(key);
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
    return this;
  }
}

export default MemoryCache;

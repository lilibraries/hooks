import EventEmitter from "./EventEmitter";

interface Record<D = any> {
  data: D;
  time: number;
  timer: number;
  timestamp: number;
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

  protected setRecordTimer(key: Key, time: number) {
    let timer = 0;
    if (time > 0 && time <= this.maxCacheTime) {
      timer = +setTimeout(() => {
        this.delete(key);
      }, time);
    }
    return timer;
  }

  protected clearRecordTimer(key: Key) {
    const record = this.records.get(key);
    if (record && record.timer) {
      clearTimeout(record.timer);
    }
  }

  getMaxCacheTime() {
    return this.maxCacheTime;
  }

  setMaxCacheTime(time: number) {
    this.maxCacheTime = time;
    return this;
  }

  getDefaultCacheTime() {
    return this.defaultCacheTime;
  }

  setDefaultCacheTime(time: number) {
    this.defaultCacheTime = time;
    return this;
  }

  checkEventName(name: unknown): void {
    if (name !== "set" && name !== "delete") {
      throw new TypeError(
        `Cache event name must be "set" or "delete". Received: ${String(name)}`
      );
    }
  }

  checkCacheKey(key: unknown) {
    if (key == null) {
      throw new TypeError(
        `Cache key can't be null or undefined. Received: ${key}`
      );
    }
  }
  checkCacheData(data: unknown) {}

  getRecord(key: Key) {
    this.checkCacheKey(key);
    return this.records.get(key);
  }

  setRecord(
    key: Key,
    data: Data,
    options: { time?: number; timestamp?: number } = {}
  ) {
    this.checkCacheKey(key);
    this.checkCacheData(data);
    this.clearRecordTimer(key);

    const now = Date.now();
    const { time = this.defaultCacheTime, timestamp = now } = options;
    const remaining = timestamp - now + time;

    if (remaining > 0) {
      const timer = this.setRecordTimer(key, remaining);
      this.records.set(key, { data, time, timer, timestamp });
    } else {
      this.records.delete(key);
    }

    return this;
  }

  set(key: Key, data: Data, options: { time?: number } = {}) {
    this.checkCacheKey(key);
    this.checkCacheData(data);
    this.clearRecordTimer(key);

    const { time = this.defaultCacheTime } = options;

    if (time > 0) {
      this.records.set(key, {
        data,
        time,
        timer: this.setRecordTimer(key, time),
        timestamp: Date.now(),
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
    if (this.records.has(key)) {
      const data = this.records.get(key)?.data;
      this.clearRecordTimer(key);
      this.records.delete(key);
      this.emit("delete", key, data as Data);
    }
    return this;
  }

  clear() {
    const entries = this.records.entries();
    this.records.clear();
    for (const [key, record] of entries) {
      if (record.timer) {
        clearTimeout(record.timer);
      }
      this.emit("delete", key, record.data);
    }
    return this;
  }
}

export default MemoryCache;

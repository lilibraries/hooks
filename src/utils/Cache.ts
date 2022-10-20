const DEFAULT_CACHE_TIME = 5 * 60 * 1000;

class Cache {
  map = new Map<
    {},
    {
      data: any;
      timer: number;
      cacheTimestamp: number;
      staleTimestamp?: number;
    }
  >();

  has(key: {}) {
    return this.map.has(key);
  }

  get(key: {}) {
    return this.map.get(key)?.data;
  }

  set(
    key: {},
    data: any,
    options: { cacheTime?: number; staleTime?: number } = {}
  ) {
    const { cacheTime = DEFAULT_CACHE_TIME, staleTime } = options;
    const current = this.map.get(key);

    if (current?.timer) {
      clearTimeout(current.timer);
    }

    let timer = 0;
    let cacheTimestamp = Date.now();
    let staleTimestamp: number | undefined;

    if (cacheTime < Infinity) {
      timer = +setTimeout(() => {
        this.map.delete(key);
      }, cacheTime);
    }

    if (staleTime !== undefined) {
      staleTimestamp = cacheTimestamp + staleTime;
    }

    this.map.set(key, { data, timer, cacheTimestamp, staleTimestamp });
  }

  remove(key: {}) {
    const current = this.map.get(key);

    if (current?.timer) {
      clearTimeout(current.timer);
    }

    return this.map.delete(key);
  }

  clear() {
    this.map.forEach((current) => {
      if (current.timer) {
        clearTimeout(current.timer);
      }
    });

    this.map.clear();
  }

  isStale(key: {}, staleTime?: number) {
    const current = this.map.get(key);

    if (!current) {
      return true;
    } else {
      const now = Date.now();
      const { cacheTimestamp, staleTimestamp } = current;

      if (staleTime !== undefined) {
        return cacheTimestamp + staleTime < now;
      } else if (staleTimestamp !== undefined) {
        return staleTimestamp < now;
      } else {
        return false;
      }
    }
  }
}

export default Cache;

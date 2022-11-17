export declare function useCache<T>(
  key: {},
  options?: {
    cacheTime?: number;
    cacheSync?: boolean;
    defaultValue?: T;
    onSet?: (value: T) => void;
    onRemove?: (value: T) => void;
  }
): [
  value: T | undefined,
  setCache: (
    newValue: T | undefined | ((prevValue: T | undefined) => T | undefined)
  ) => void
];

export declare function useCache<T>(
  key: {},
  options?: {
    defaultValue?: T;
    cacheTime?: number;
    cacheSync?: boolean;
    compare: (x: any, y: any) => boolean;
    validate: (value: T) => boolean;
    onSet?: (value: T) => void;
    onDelete?: (value: T) => void;
  }
): [
  value: T | undefined,
  setCache: (
    newValue: T | undefined | ((prevValue: T | undefined) => T | undefined)
  ) => void
];

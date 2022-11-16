export declare function useCache<D>(
  key: any,
  options?: {
    onSet?: (data: D) => void;
    onStale?: (data: D) => void;
    onRemove?: (data: D) => void;
  }
): [
  data: D | undefined,
  actions: {
    set: (
      key: any,
      data: D,
      options?: { cacheTime?: number; staleTime?: number }
    ) => void;
    stale: () => void;
    remove: () => void;
    isStale: () => boolean;
  }
];

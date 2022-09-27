module.exports = {
  docs: [
    "GettingStarted",
    {
      type: "category",
      label: "Effects",
      items: [
        "useOnce",
        "useMount",
        "useUpdate",
        "useUnmount",
        "useTargetEffect",
        "useLayoutMount",
        "useLayoutUpdate",
        "useLayoutTargetEffect",
        "useIsomorphicLayoutEffect",
      ],
    },
    {
      type: "category",
      label: "States",
      items: [
        "useToggle",
        "useSetState",
        "useSafeState",
        "useControllableState",
        "useThrottledValue",
        "useDebouncedValue",
        "useMemoizedValue",
      ],
    },
    {
      type: "category",
      label: "Callbacks",
      items: [
        "usePersist",
        "useRerender",
        "useThrottle",
        "useDebounce",
        "useRaf",
        "useIdle",
        "useTimeout",
        "useInterval",
        "useAnimation",
      ],
    },
    {
      type: "category",
      label: "Refs",
      items: [
        "useLatestRef",
        "usePreviousRef",
        "useMergedRef",
        "useMountedRef",
        "useUnmountedRef",
      ],
    },
    {
      type: "category",
      label: "Browser",
      items: [
        "useTitle",
        "useFavicon",
        "useOnline",
        "useDarkMode",
        "usePageVisible",
        "useMatchMedia",
        "useSize",
        "useWindowSize",
        "useClickAway",
        "useEventListener",
        "useCookie",
        "useLocalStorage",
        "useSessionStorage",
      ],
    },
    "CHANGELOG",
  ],
};

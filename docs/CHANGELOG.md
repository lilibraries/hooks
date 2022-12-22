# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.3.0](https://github.com/lilibraries/hooks/compare/v0.2.1...v0.3.0) (2022-12-22)


### ⚠ BREAKING CHANGES

* use lodash instead of type check utils, and don't export all of utils
* rename useClickAway to useClickOutside
* **useWindowSize,useElementSize:** do not set default size
* rename utils/extname to utils/getExtname
* rename useSize to useElementSize
* delete useControllableState
* rename util isBrowser to inBrowser
* delete hasOwn util
* rename depsEqual to areDepsEqual

### Features

* add `LoadConfig` ([f9bfaf7](https://github.com/lilibraries/hooks/commit/f9bfaf7c1d2a96cc91c75b1c5b4b3797c7b189c9))
* add `useLoad` ([cdf88a3](https://github.com/lilibraries/hooks/commit/cdf88a3c3722d30ac526d0740cc39dda194d4cf6))
* add `useReload` ([95e4066](https://github.com/lilibraries/hooks/commit/95e406674bbdab0f2a43bc664095513994df4799))
* add `useSubmit` ([e07d484](https://github.com/lilibraries/hooks/commit/e07d484053cacec0593e86da0133be02fd16e405))
* add CacheConfig ([e225f14](https://github.com/lilibraries/hooks/commit/e225f14ccf7db8df4777a10198577d66f4d648e3))
* add useCache ([7842938](https://github.com/lilibraries/hooks/commit/7842938f4d6e6e8110933ad228555a20c94b303b))
* **useCookie:** add `validate` option ([9b4e7f2](https://github.com/lilibraries/hooks/commit/9b4e7f2bba04cdd6c92dca6eb60d8760824c5a9d))
* **useIdle:** support `timeout` option ([336e684](https://github.com/lilibraries/hooks/commit/336e68464a61e45be077db610696ee7b5d825400))
* **useLocalStorage,useSessionStorage:** add `compare` and `validate` options ([d9ca582](https://github.com/lilibraries/hooks/commit/d9ca582d3bafaa39b39c6d20d42cdf693d56d526))
* **useMemoizedValue:** add `compare` param ([0b7a0b8](https://github.com/lilibraries/hooks/commit/0b7a0b87a31326fb5ecaf522391accbc05c240b1))


### Bug Fixes

* **useFavicon:** add `null` type for the `href` parameter ([6d0c28f](https://github.com/lilibraries/hooks/commit/6d0c28f75b18f193ba964ba51503b3e8224b3ce9))
* **useMemoizedValue:** chagne deep comparison algorithm ([4b92b74](https://github.com/lilibraries/hooks/commit/4b92b744d919b21778f41d0d9030e1e809d1010b))
* **usePageVisible:** use document.visibilityState instead of document.hidden ([0fd5605](https://github.com/lilibraries/hooks/commit/0fd5605b521fd6459022f6bb832899a4e9e8d206))
* **usePersist:** fix TS returnd type ([ea3d882](https://github.com/lilibraries/hooks/commit/ea3d8824b102f520de8c3c667c3196addda83eea))
* **useTitle:** add `null` type for the `title` parameter ([30cea47](https://github.com/lilibraries/hooks/commit/30cea4727b3d5c37a142f2065c4c067bf422b317))
* **useToggle:** use useSafeState instead of useState ([f75f88e](https://github.com/lilibraries/hooks/commit/f75f88edcfdc0f0a8c9e06961053807850803c11))


* delete hasOwn util ([8d48de3](https://github.com/lilibraries/hooks/commit/8d48de3bc523feacf51dc416fe9b28254b7c73da))
* delete useControllableState ([d40ae4a](https://github.com/lilibraries/hooks/commit/d40ae4abae94942332029442e947ac5631d27ef2))
* rename depsEqual to areDepsEqual ([94a25f5](https://github.com/lilibraries/hooks/commit/94a25f5c5eb29d3f0a4eaf57cd58f0271008a267))
* rename useClickAway to useClickOutside ([0b7dad7](https://github.com/lilibraries/hooks/commit/0b7dad7bab7402e2bf2b8c6c6ea912a651852a4d))
* rename useSize to useElementSize ([3fd7364](https://github.com/lilibraries/hooks/commit/3fd7364d616dccafbb56ee8c4ccb0c375e0d61b4))
* rename util isBrowser to inBrowser ([234f9b0](https://github.com/lilibraries/hooks/commit/234f9b0f31affd8040cab53ef75ddf4700fa7d03))
* rename utils/extname to utils/getExtname ([308b997](https://github.com/lilibraries/hooks/commit/308b9974b64b0b6e8f246f354af2cbc58237f2cb))
* use lodash instead of type check utils, and don't export all of utils ([75fd13c](https://github.com/lilibraries/hooks/commit/75fd13c49c1f9275b3e739aef47241a7a9067661))
* **useWindowSize,useElementSize:** do not set default size ([1617fa7](https://github.com/lilibraries/hooks/commit/1617fa79aa0231463417fd8eed8506d586447f6d))

### [0.2.1](https://github.com/lilibraries/hooks/compare/v0.2.0...v0.2.1) (2022-06-28)

### Bug Fixes

- support React 18 StrictMode ([262aed1](https://github.com/lilibraries/hooks/commit/262aed1dc031877b6c3d34212b37b3d1163ed5e7))

## [0.2.0](https://github.com/lilibraries/hooks/compare/v0.1.1...v0.2.0) (2022-06-27)

### ⚠ BREAKING CHANGES

- delete useNextFrame ([e4638dd](https://github.com/lilibraries/hooks/commit/e4638dd9555d048449159bc4cfe48e70e0ad0aef))
- delete useCreate ([a12b8a8](https://github.com/lilibraries/hooks/commit/a12b8a8f79a81b36520dabde5e26bf545611a674))
- rename useLastest to useLatestRef ([fd6f4ba](https://github.com/lilibraries/hooks/commit/fd6f4ba1d9c96afacdece88e4821dd059558c535))
- rename useMounted to useMountedRef ([34bf6b4](https://github.com/lilibraries/hooks/commit/34bf6b45a4ecb292761f0f4d4d5c69b2a81a477a))
- rename usePrevious to usePreviousRef ([641dba9](https://github.com/lilibraries/hooks/commit/641dba9d8845dbbf2dae63e578a1b05f055df7b4))
- rename useUpdateLayoutEffect to useLayoutUpdate ([3ae0f1f](https://github.com/lilibraries/hooks/commit/3ae0f1fa0b53a362d762e003c943e0acc82dafbf))
- rename useDebounced to useDebouncedValue ([99157fd](https://github.com/lilibraries/hooks/commit/99157fd0b7749711352fcc845a1fbe8b8919b9eb))
- rename useThrottled to useThrottledValue ([7e3bd0b](https://github.com/lilibraries/hooks/commit/7e3bd0ba5becb601e7d938c7862b0443e4a7bd4c))
- **useCookie:** change params and results ([a494fd8](https://github.com/lilibraries/hooks/commit/a494fd86a14c4d276d6782a604c3879289b0de72))
- **useLocalStorage, useSessionStorage:** change params and results ([e3b247a](https://github.com/lilibraries/hooks/commit/e3b247a66b4eab7168a5485cdc5d99c7da4f689b))

### Features

- add useClickAway ([264bcaf](https://github.com/lilibraries/hooks/commit/264bcaf6432fa78ddbe62e34a250d5f04c94478e))
- add useControllableState ([01cce08](https://github.com/lilibraries/hooks/commit/01cce081e222c3c3bf14a7b47f6891cc1ea54427))
- add useLayoutMount ([b5c3665](https://github.com/lilibraries/hooks/commit/b5c3665726ff2ac85ed52b66b9a68fe5486a37d2))
- add useMatchMedia ([454dc2e](https://github.com/lilibraries/hooks/commit/454dc2ed287a9e7926c1437d9e4f675070719b09))
- add useMemoizedValue ([0b2655a](https://github.com/lilibraries/hooks/commit/0b2655a9911149d7a0bd079ede63a5a223c5dcde))
- add useMergedRef ([cc9a71d](https://github.com/lilibraries/hooks/commit/cc9a71dd0c20289ebf3442c9565615c751a30050))
- add useOnce ([ad1430c](https://github.com/lilibraries/hooks/commit/ad1430c79cdf479fd3a7c6b151e018819d20ac34))
- add useSafeState ([9ba45dc](https://github.com/lilibraries/hooks/commit/9ba45dc04949155e330412197a4d78c7f00f9513))
- add useSetState ([7d3777d](https://github.com/lilibraries/hooks/commit/7d3777d17128873da4b64acd38f2824d6ea482e4))
- add useSize ([0df9e38](https://github.com/lilibraries/hooks/commit/0df9e389349d4ba47565de6410be3cacfb163dc0))
- add useTargetEffect and useLayoutTargetEffect ([1993e24](https://github.com/lilibraries/hooks/commit/1993e24459707591a5f0b299d3fd3ab154e07bb5))
- add useUnmountedRef ([5e1cae8](https://github.com/lilibraries/hooks/commit/5e1cae8aeb6ec3c83d95c190cdf027d293997be7))

### Bug Fixes

- **useTimeout:** should not automatically set timer when the `delay` param is updated ([86c98d0](https://github.com/lilibraries/hooks/commit/86c98d06a8a4a0b834149c820bae4e3d7c10e489))

### [0.1.1](https://github.com/lilibraries/hooks/compare/v0.1.0...v0.1.1) (2021-03-30)

### Bug Fixes

- **useIdle:** fix SSR issue ([b877eea](https://github.com/lilibraries/hooks/commit/b877eeae71a970d340dd0840e614463a47ee98b4))

## [0.1.0](https://github.com/lilibraries/hooks/compare/2df17e87a4640318274ca3f4fc8b7f5fa9b031e9...v0.1.0) (2021-03-29)

### Features

- initial commit ([2df17e8](https://github.com/lilibraries/hooks/commit/2df17e87a4640318274ca3f4fc8b7f5fa9b031e9))

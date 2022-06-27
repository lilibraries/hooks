# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0](https://github.com/lilibraries/hooks/compare/v0.1.1...v0.2.0) (2022-06-27)


### ⚠ BREAKING CHANGES

* delete useNextFrame
* rename useMemoized to useMemoizedValue
* rename useDebounced to useDebouncedValue
* rename useThrottled to useThrottledValue
* remove useCreate
* **useLocalStorage, useSessionStorage:** change params and results
* **useCookie:** change params and results
* do not set value at the first render
* rename `useMounted` to `useMountedRef`
* rename `useLastest` to `useLatestRef`
* rename `useUpdateLayoutEffect` to `useLayoutUpdate`

### Features

* add useClickAway ([264bcaf](https://github.com/lilibraries/hooks/commit/264bcaf6432fa78ddbe62e34a250d5f04c94478e))
* add useControllableState ([01cce08](https://github.com/lilibraries/hooks/commit/01cce081e222c3c3bf14a7b47f6891cc1ea54427))
* add useLayoutMount ([b5c3665](https://github.com/lilibraries/hooks/commit/b5c3665726ff2ac85ed52b66b9a68fe5486a37d2))
* add useMatchMedia ([454dc2e](https://github.com/lilibraries/hooks/commit/454dc2ed287a9e7926c1437d9e4f675070719b09))
* add useMemoized ([0b2655a](https://github.com/lilibraries/hooks/commit/0b2655a9911149d7a0bd079ede63a5a223c5dcde))
* add useMergedRef ([cc9a71d](https://github.com/lilibraries/hooks/commit/cc9a71dd0c20289ebf3442c9565615c751a30050))
* add useOnce ([ad1430c](https://github.com/lilibraries/hooks/commit/ad1430c79cdf479fd3a7c6b151e018819d20ac34))
* add useSafeState ([9ba45dc](https://github.com/lilibraries/hooks/commit/9ba45dc04949155e330412197a4d78c7f00f9513))
* add useSetState ([7d3777d](https://github.com/lilibraries/hooks/commit/7d3777d17128873da4b64acd38f2824d6ea482e4))
* add useSize ([0df9e38](https://github.com/lilibraries/hooks/commit/0df9e389349d4ba47565de6410be3cacfb163dc0))
* add useTargetEffect and useLayoutTargetEffect ([1993e24](https://github.com/lilibraries/hooks/commit/1993e24459707591a5f0b299d3fd3ab154e07bb5))
* add useUnmountedRef ([5e1cae8](https://github.com/lilibraries/hooks/commit/5e1cae8aeb6ec3c83d95c190cdf027d293997be7))


### Bug Fixes

* correct the comparison value of `typeof` ([cec35a4](https://github.com/lilibraries/hooks/commit/cec35a484eb7334fc00ee25d4b569019a53994a0))
* **useFavicon:** make the `href` param optional ([4c6a040](https://github.com/lilibraries/hooks/commit/4c6a040b2bdfed2dbc4469b12b2c1d2bdd933e91))
* **useFavicon:** make the `href` param required ([50f0a8c](https://github.com/lilibraries/hooks/commit/50f0a8c6f36113c1fe10482990ce4449eaff5e2b))
* **useInterval:** make `interval` param optional ([b8f30ae](https://github.com/lilibraries/hooks/commit/b8f30aeabf88f4832de07186c2c8d5c8cab3ae10))
* **useTimeout:** should not automatically set timer when `delay` is updated ([86c98d0](https://github.com/lilibraries/hooks/commit/86c98d06a8a4a0b834149c820bae4e3d7c10e489))
* **useTitle:** fix SSR issue ([c21b615](https://github.com/lilibraries/hooks/commit/c21b6150391652d5ccec4b79bcdba4ee287c6032))
* **useTitle:** make `title` param optional ([5f34364](https://github.com/lilibraries/hooks/commit/5f34364a332db4f164286fbc47e6b851ff44d043))
* **useTitle:** make the `title` param required ([26d4689](https://github.com/lilibraries/hooks/commit/26d4689061a82ffb309900f1c368a0da97883315))


* delete useNextFrame ([e4638dd](https://github.com/lilibraries/hooks/commit/e4638dd9555d048449159bc4cfe48e70e0ad0aef))
* remove useCreate ([a12b8a8](https://github.com/lilibraries/hooks/commit/a12b8a8f79a81b36520dabde5e26bf545611a674))
* rename `useLastest` to `useLatestRef` ([fd6f4ba](https://github.com/lilibraries/hooks/commit/fd6f4ba1d9c96afacdece88e4821dd059558c535))
* rename `useMounted` to `useMountedRef` ([34bf6b4](https://github.com/lilibraries/hooks/commit/34bf6b45a4ecb292761f0f4d4d5c69b2a81a477a))
* rename `usePrevious` to `usePreviousRef` ([641dba9](https://github.com/lilibraries/hooks/commit/641dba9d8845dbbf2dae63e578a1b05f055df7b4))
* rename `useUpdateLayoutEffect` to `useLayoutUpdate` ([3ae0f1f](https://github.com/lilibraries/hooks/commit/3ae0f1fa0b53a362d762e003c943e0acc82dafbf))
* rename useDebounced to useDebouncedValue ([99157fd](https://github.com/lilibraries/hooks/commit/99157fd0b7749711352fcc845a1fbe8b8919b9eb))
* rename useMemoized to useMemoizedValue ([9993770](https://github.com/lilibraries/hooks/commit/99937707e8668cc68c330601e278bb7ff283f6ff))
* rename useThrottled to useThrottledValue ([7e3bd0b](https://github.com/lilibraries/hooks/commit/7e3bd0ba5becb601e7d938c7862b0443e4a7bd4c))
* **useCookie:** change params and results ([a494fd8](https://github.com/lilibraries/hooks/commit/a494fd86a14c4d276d6782a604c3879289b0de72))
* **useLocalStorage, useSessionStorage:** change params and results ([e3b247a](https://github.com/lilibraries/hooks/commit/e3b247a66b4eab7168a5485cdc5d99c7da4f689b))

### [0.1.1](https://github.com/lilibraries/hooks/compare/v0.1.0...v0.1.1) (2021-03-30)

### Bug Fixes

- fix useIdle SSR issue ([b877eea](https://github.com/lilibraries/hooks/commit/b877eeae71a970d340dd0840e614463a47ee98b4))

## [0.1.0](https://github.com/lilibraries/hooks/compare/2df17e87a4640318274ca3f4fc8b7f5fa9b031e9...v0.1.0) (2021-03-29)

### Features

- initial commit ([2df17e8](https://github.com/lilibraries/hooks/commit/2df17e87a4640318274ca3f4fc8b7f5fa9b031e9))
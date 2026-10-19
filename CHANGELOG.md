# Changelog

## [2.0.0](https://github.com/lilibraries/hooks/compare/v1.1.0...v2.0.0) (2026-10-19)

### ⚠ BREAKING CHANGES

* add `useAnimate` hook
* add `useLayoutRefEffect` hook
* add `useLayoutRefUpdate` hook
* add `useRefEffect` hook
* add `useRefUpdate` hook
* drop `force` option from `useReload`
* lazy-access storage with error handling in `useLocalStorage`
* lazy-access storage with error handling in `useSessionStorage`
* move `useFavicon` side effects into `useEffect`
* remove `createTargetEffectHook` factory
* remove `useAnimation` hook
* remove `useCache` hook
* remove `useLayoutTargetEffect` hook
* remove `useOnce` hook
* remove `useTargetEffect` hook
* remove LoadConfig and rework `useLoad`
* rename `include` to `shouldDelay` in `useDelayedValue`
* rework `useClickOutside` with ref-based targets
* rework `useComposedRef` with stable callback identity
* rework `useCookie` with fresh-value updates
* rework `useDebounce` with on-demand rebuild
* rework `useElementSize` with ref-based targets
* rework `useEventListener` with ref-based targets
* rework `useIntersecting` with ref-based targets
* rework `useIntersectionObserver` with ref-based targets
* rework `useResizeObserver` with ref-based targets
* rework `useSubmit` retry and idle options
* rework `useThrottle` with on-demand rebuild
* set title via `useEffect` in `useTitle`

### Features

* add `useAnimate` hook ([e79794a](https://github.com/lilibraries/hooks/commit/e79794a7bd45cae5ea57b48620c0122c7dd95781))
* add `useLayoutRefEffect` hook ([59636a2](https://github.com/lilibraries/hooks/commit/59636a2ce32c34783ec6b68bf822287a391c2637))
* add `useLayoutRefUpdate` hook ([40a979a](https://github.com/lilibraries/hooks/commit/40a979a5c2ffa4d5df3d8354faefd702ca3d6ff8))
* add `useRefEffect` hook ([330f8b7](https://github.com/lilibraries/hooks/commit/330f8b77ca5b0e37ca4ceff6ec22ea5ed3f94ba7))
* add `useRefUpdate` hook ([8c51c27](https://github.com/lilibraries/hooks/commit/8c51c271ebd8c2fa4a31204a55e4e2b01d68a482))
* add caching and force loading to `useLoad` ([5222c07](https://github.com/lilibraries/hooks/commit/5222c07eb998947d03206b6ac9f2bb5f047f1b2e))
* detect bfcache restores in `usePageVisible` ([65680e8](https://github.com/lilibraries/hooks/commit/65680e81f1b8ca0aba3f73fd3aba2e41eb26eb96))
* expose `error` and force each request in `useSubmit` ([996816b](https://github.com/lilibraries/hooks/commit/996816bf644e4242d6cabdaa7d54994b635a40d1))
* rework `useCache` around `lru-cache` ([1a163ec](https://github.com/lilibraries/hooks/commit/1a163ec9477a495ac12e116fe9666029aa303ee0))
* support forced reload in `useReload` ([ba81ee8](https://github.com/lilibraries/hooks/commit/ba81ee85f01aea56b676f9e5114e70869915d01d))
* track visualViewport resizes in `useWindowSize` ([b7da7bd](https://github.com/lilibraries/hooks/commit/b7da7bdbb5578832ecabf7be490ed38cfd08dbe6))

### Bug Fixes

* **`useCache`:** map `cacheTime: Infinity` to `ttl: 0` and emit via `peek` ([6c20431](https://github.com/lilibraries/hooks/commit/6c20431c4bb7e8980cd5a0c7fef8d72bab73152e))
* **`useCookie`, `useLocalStorage`, `useSessionStorage`:** hydrate stored value after mount ([c5b6477](https://github.com/lilibraries/hooks/commit/c5b64777f6ec11cf620a25f7eb9665f6d7267c21))
* **`useLoad`:** settle correctly under StrictMode and never set state on unmount ([e496695](https://github.com/lilibraries/hooks/commit/e4966955646dba109d354fbe2a8242b5e1745046))
* **`usePreviousRef`:** compare values with `Object.is` so `NaN` equals `NaN` ([e487cac](https://github.com/lilibraries/hooks/commit/e487cac01490ff882d43c7c4c334c777fbd234ed))
* **`useWindowSize`:** skip state update when the size is unchanged ([4473872](https://github.com/lilibraries/hooks/commit/4473872eb241e9f390e50789e311228cdd58ed4b))
* **deps:** upgrade `@release-it/conventional-changelog` to v12 ([d854348](https://github.com/lilibraries/hooks/commit/d854348225619e7dc75e5d8244d39953aa7d1c0f))
* **scripts:** run `release-it` dry-run in CI mode ([de1ecfc](https://github.com/lilibraries/hooks/commit/de1ecfce6252c5d9970bd6e896e78ccf0759117a))

### Code Refactoring

* drop `force` option from `useReload` ([c339b2a](https://github.com/lilibraries/hooks/commit/c339b2a1d258f0522a138d61cabbce544dede469))
* lazy-access storage with error handling in `useLocalStorage` ([88a4ae9](https://github.com/lilibraries/hooks/commit/88a4ae90cea80ee9e760a29357159c7e7e25b7b4))
* lazy-access storage with error handling in `useSessionStorage` ([238287a](https://github.com/lilibraries/hooks/commit/238287ac2077896e94c7589705bf44503b6cf75f))
* move `useFavicon` side effects into `useEffect` ([2713a45](https://github.com/lilibraries/hooks/commit/2713a4583c5444d5d99d0b36eb54c8c6bdd71761))
* remove `createTargetEffectHook` factory ([5c5662e](https://github.com/lilibraries/hooks/commit/5c5662e5e499252c402520f0cb5795478b4a1196))
* remove `useAnimation` hook ([af83d86](https://github.com/lilibraries/hooks/commit/af83d867a60f34cf80036c41d753ccbb652ed9da))
* remove `useCache` hook ([98cdafa](https://github.com/lilibraries/hooks/commit/98cdafaa8772a4ca9096c101180f994b2151f0eb))
* remove `useLayoutTargetEffect` hook ([f2b4b8f](https://github.com/lilibraries/hooks/commit/f2b4b8f53f8338ff3738e77413617da7b552dbec))
* remove `useOnce` hook ([35ad420](https://github.com/lilibraries/hooks/commit/35ad4202186a8fa48b0f7ad4ee78f3531db2391f))
* remove `useTargetEffect` hook ([7ddd4cf](https://github.com/lilibraries/hooks/commit/7ddd4cf114bd3cf1ae1d87bb52e4dbaaed636046))
* remove LoadConfig and rework `useLoad` ([7b07f0e](https://github.com/lilibraries/hooks/commit/7b07f0e64cfa13ad80995390936bc7c729a978ec))
* rename `include` to `shouldDelay` in `useDelayedValue` ([0bc138f](https://github.com/lilibraries/hooks/commit/0bc138fd54611b9593be7f6f384725883377b102))
* rework `useClickOutside` with ref-based targets ([02b7e0c](https://github.com/lilibraries/hooks/commit/02b7e0c050ad02b20481741382386ca7b75d5be8))
* rework `useComposedRef` with stable callback identity ([5bdfa55](https://github.com/lilibraries/hooks/commit/5bdfa55f9b96a99e570f0800e268a6ff04118c7b))
* rework `useCookie` with fresh-value updates ([a99f9cf](https://github.com/lilibraries/hooks/commit/a99f9cf19f6eab8e787c2619d8e1d78dae783fbb))
* rework `useDebounce` with on-demand rebuild ([1f06064](https://github.com/lilibraries/hooks/commit/1f06064922a6187c2fbe4fecdd48660176a07ec1))
* rework `useElementSize` with ref-based targets ([75229a8](https://github.com/lilibraries/hooks/commit/75229a83aff872c5a7628e210b5c184e08edaf67))
* rework `useEventListener` with ref-based targets ([58f02db](https://github.com/lilibraries/hooks/commit/58f02db7891d371a936729eb52f10032b016258b))
* rework `useIntersecting` with ref-based targets ([b13ca3d](https://github.com/lilibraries/hooks/commit/b13ca3d642bda29ff1e83d3ef45a773d2b108e5d))
* rework `useIntersectionObserver` with ref-based targets ([28c8246](https://github.com/lilibraries/hooks/commit/28c82466138970d77799f2f127c6343011450c74))
* rework `useResizeObserver` with ref-based targets ([2e6e1dc](https://github.com/lilibraries/hooks/commit/2e6e1dc364f33bc34d09ab97f30a82e419bf32e9))
* rework `useSubmit` retry and idle options ([f496d82](https://github.com/lilibraries/hooks/commit/f496d82234245d7cc62852538d5c85249f87bb32))
* rework `useThrottle` with on-demand rebuild ([bc45a9a](https://github.com/lilibraries/hooks/commit/bc45a9a8b467fd7ff1543616259bad3056313f2d))
* set title via `useEffect` in `useTitle` ([7845fb7](https://github.com/lilibraries/hooks/commit/7845fb719f26a1e4c8276417840ecca3cca3d5d8))

## [1.1.0](https://github.com/lilibraries/hooks/compare/v1.0.3...v1.1.0) (2025-04-07)


### Features

* support React 19 ([1fa893f](https://github.com/lilibraries/hooks/commit/1fa893f208e7786f4ef6d46a2eae8ba889a22798))

## [1.0.3](https://github.com/lilibraries/hooks/compare/v1.0.2...v1.0.3) (2023-10-17)

Bump version.

## [1.0.2](https://github.com/lilibraries/hooks/compare/v1.0.1...v1.0.2) (2023-10-17)

Bump version.

**Note:** This version was accidentally unpublished, please use ^1.0.3 instead.

## [1.0.1](https://github.com/lilibraries/hooks/compare/v1.0.0...v1.0.1) (2023-01-15)

**Note:** This version was accidentally unpublished, please use ^1.0.3 instead.

### Bug Fixes

- **LoadConfig,CacheConfig:** do not set global variables in SSR ([3719786](https://github.com/lilibraries/hooks/commit/3719786dd919ab20daa4e83c14e040f223a02fe2))
- **useClickOutside:** do not listen to events when no target specified ([4ac2c3f](https://github.com/lilibraries/hooks/commit/4ac2c3f7c4001c728332ed8732eeb520ddaf6165))

## [1.0.0](https://github.com/lilibraries/hooks/compare/v0.3.1...v1.0.0) (2022-12-25)

### Features

- add `useDelayedValue` ([ca99f25](https://github.com/lilibraries/hooks/commit/ca99f2538e56a3eaf59f05401f4a2ceb8ca85670))
- add `useIntersecting` ([5e97891](https://github.com/lilibraries/hooks/commit/5e978917ae7560bf9c5ccd9def200b666fb4c6b9))
- add `useIntersectionObserver` ([18a430a](https://github.com/lilibraries/hooks/commit/18a430a795edfc4858cf7d2a760508722d4b7c8d))
- add `useResizeObserver` ([2019610](https://github.com/lilibraries/hooks/commit/201961043bda7fe8d0bb85c64d463f6e5c890712))
- add `useWindowFocus` ([2e3f28f](https://github.com/lilibraries/hooks/commit/2e3f28fe6ccd5356cdba81a68070f7344f95d77e))

## [0.3.1](https://github.com/lilibraries/hooks/compare/v0.3.0...v0.3.1) (2022-12-24)

### Bug Fixes

- **useLoad**: `staleTime` option must be used together with `cacheKey` option ([27ff50c](https://github.com/lilibraries/hooks/commit/27ff50c90d8204a33a916e705862b3c554ca76ff))

## [0.3.0](https://github.com/lilibraries/hooks/compare/v0.2.1...v0.3.0) (2022-12-22)

### BREAKING CHANGES

- rename `useClickAway` to `useClickOutside`
- `useWindowSize` and `useElementSize` remove default size
- rename `useSize` to `useElementSize`
- delete `useControllableState`
- don't export utils

### Features

- add `useSubmit` ([e07d484](https://github.com/lilibraries/hooks/commit/e07d484053cacec0593e86da0133be02fd16e405))
- add `useReload` ([95e4066](https://github.com/lilibraries/hooks/commit/95e406674bbdab0f2a43bc664095513994df4799))
- add `useLoad` ([cdf88a3](https://github.com/lilibraries/hooks/commit/cdf88a3c3722d30ac526d0740cc39dda194d4cf6))
- add `LoadConfig` ([f9bfaf7](https://github.com/lilibraries/hooks/commit/f9bfaf7c1d2a96cc91c75b1c5b4b3797c7b189c9))
- add `useCache` ([7842938](https://github.com/lilibraries/hooks/commit/7842938f4d6e6e8110933ad228555a20c94b303b))
- add `CacheConfig` ([e225f14](https://github.com/lilibraries/hooks/commit/e225f14ccf7db8df4777a10198577d66f4d648e3))
- **useCookie**: add `validate` option ([9b4e7f2](https://github.com/lilibraries/hooks/commit/9b4e7f2bba04cdd6c92dca6eb60d8760824c5a9d))
- **useIdle**: support `timeout` option ([336e684](https://github.com/lilibraries/hooks/commit/336e68464a61e45be077db610696ee7b5d825400))
- **useLocalStorage,useSessionStorage**: add `compare` and `validate` options ([d9ca582](https://github.com/lilibraries/hooks/commit/d9ca582d3bafaa39b39c6d20d42cdf693d56d526))
- **useMemoizedValue**: add `compare` param ([0b7a0b8](https://github.com/lilibraries/hooks/commit/0b7a0b87a31326fb5ecaf522391accbc05c240b1))

### Bug Fixes

- **useFavicon**: add `null` type for the `href` parameter ([6d0c28f](https://github.com/lilibraries/hooks/commit/6d0c28f75b18f193ba964ba51503b3e8224b3ce9))
- **usePersist**: fix return type ([ea3d882](https://github.com/lilibraries/hooks/commit/ea3d8824b102f520de8c3c667c3196addda83eea))
- **useTitle**: add `null` type for the `title` parameter ([30cea47](https://github.com/lilibraries/hooks/commit/30cea4727b3d5c37a142f2065c4c067bf422b317))

## [0.2.1](https://github.com/lilibraries/hooks/compare/v0.2.0...v0.2.1) (2022-06-28)

### Bug Fixes

- support React 18 StrictMode ([262aed1](https://github.com/lilibraries/hooks/commit/262aed1dc031877b6c3d34212b37b3d1163ed5e7))

## [0.2.0](https://github.com/lilibraries/hooks/compare/v0.1.1...v0.2.0) (2022-06-27)

### BREAKING CHANGES

- delete `useNextFrame` ([e4638dd](https://github.com/lilibraries/hooks/commit/e4638dd9555d048449159bc4cfe48e70e0ad0aef))
- delete `useCreate` ([a12b8a8](https://github.com/lilibraries/hooks/commit/a12b8a8f79a81b36520dabde5e26bf545611a674))
- rename `useLastest` to `useLatestRef` ([fd6f4ba](https://github.com/lilibraries/hooks/commit/fd6f4ba1d9c96afacdece88e4821dd059558c535))
- rename `useMounted` to `useMountedRef` ([34bf6b4](https://github.com/lilibraries/hooks/commit/34bf6b45a4ecb292761f0f4d4d5c69b2a81a477a))
- rename `usePrevious` to `usePreviousRef` ([641dba9](https://github.com/lilibraries/hooks/commit/641dba9d8845dbbf2dae63e578a1b05f055df7b4))
- rename `useUpdateLayoutEffect` to `useLayoutUpdate` ([3ae0f1f](https://github.com/lilibraries/hooks/commit/3ae0f1fa0b53a362d762e003c943e0acc82dafbf))
- rename `useDebounced` to `useDebouncedValue` ([99157fd](https://github.com/lilibraries/hooks/commit/99157fd0b7749711352fcc845a1fbe8b8919b9eb))
- rename `useThrottled` to `useThrottledValue` ([7e3bd0b](https://github.com/lilibraries/hooks/commit/7e3bd0ba5becb601e7d938c7862b0443e4a7bd4c))
- **useCookie**: change params and results ([a494fd8](https://github.com/lilibraries/hooks/commit/a494fd86a14c4d276d6782a604c3879289b0de72))
- **useLocalStorage,useSessionStorage**: change params and results ([e3b247a](https://github.com/lilibraries/hooks/commit/e3b247a66b4eab7168a5485cdc5d99c7da4f689b))

### Features

- add `useClickAway` ([264bcaf](https://github.com/lilibraries/hooks/commit/264bcaf6432fa78ddbe62e34a250d5f04c94478e))
- add `useControllableState` ([01cce08](https://github.com/lilibraries/hooks/commit/01cce081e222c3c3bf14a7b47f6891cc1ea54427))
- add `useLayoutMount` ([b5c3665](https://github.com/lilibraries/hooks/commit/b5c3665726ff2ac85ed52b66b9a68fe5486a37d2))
- add `useMatchMedia` ([454dc2e](https://github.com/lilibraries/hooks/commit/454dc2ed287a9e7926c1437d9e4f675070719b09))
- add `useMemoizedValue` ([0b2655a](https://github.com/lilibraries/hooks/commit/0b2655a9911149d7a0bd079ede63a5a223c5dcde))
- add `useMergedRef` ([cc9a71d](https://github.com/lilibraries/hooks/commit/cc9a71dd0c20289ebf3442c9565615c751a30050))
- add `useOnce` ([ad1430c](https://github.com/lilibraries/hooks/commit/ad1430c79cdf479fd3a7c6b151e018819d20ac34))
- add `useSafeState` ([9ba45dc](https://github.com/lilibraries/hooks/commit/9ba45dc04949155e330412197a4d78c7f00f9513))
- add `useSetState` ([7d3777d](https://github.com/lilibraries/hooks/commit/7d3777d17128873da4b64acd38f2824d6ea482e4))
- add `useSize` ([0df9e38](https://github.com/lilibraries/hooks/commit/0df9e389349d4ba47565de6410be3cacfb163dc0))
- add `useTargetEffect` and `useLayoutTargetEffect` ([1993e24](https://github.com/lilibraries/hooks/commit/1993e24459707591a5f0b299d3fd3ab154e07bb5))
- add `useUnmountedRef` ([5e1cae8](https://github.com/lilibraries/hooks/commit/5e1cae8aeb6ec3c83d95c190cdf027d293997be7))

### Bug Fixes

- **useTimeout**: should not automatically set timer when the `delay` param is updated ([86c98d0](https://github.com/lilibraries/hooks/commit/86c98d06a8a4a0b834149c820bae4e3d7c10e489))

## [0.1.1](https://github.com/lilibraries/hooks/compare/v0.1.0...v0.1.1) (2021-03-30)

### Bug Fixes

- **useIdle**: fix SSR issue ([b877eea](https://github.com/lilibraries/hooks/commit/b877eeae71a970d340dd0840e614463a47ee98b4))

export type Nullable<T> = T | undefined | null;

export type PromiseResolve<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never;

export type EffectTarget<T> =
  | Nullable<T>
  | (() => Nullable<T>)
  | { current: Nullable<T> };

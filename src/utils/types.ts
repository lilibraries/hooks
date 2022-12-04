export type Nullable<T> = T | undefined | null;

export type Target<T> =
  | Nullable<T>
  | (() => Nullable<T>)
  | { current: Nullable<T> };

export type PromiseResolve<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never;

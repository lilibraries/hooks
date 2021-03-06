import { MutableRefObject, RefObject } from "react";

export type Target<T> = T | undefined | null;
export type TargetCreator<T> =
  | Target<T>
  | (() => Target<T>)
  | RefObject<Target<T>>
  | MutableRefObject<Target<T>>;

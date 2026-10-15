import type { DependencyList, EffectCallback } from "react";

export type EffectHook = (effect: EffectCallback, deps?: DependencyList) => void;

export type AnyFunction = (...args: any[]) => any;

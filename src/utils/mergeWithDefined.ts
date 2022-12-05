import assignWith from "lodash/assignWith";

function mergeWithDefined<A extends object>(a: A): A;
function mergeWithDefined<A extends object, B extends object>(
  a: A,
  b: B
): A & B;
function mergeWithDefined<A extends object, B extends object, C extends object>(
  a: A,
  b: B,
  c: C
): A & B & C;
function mergeWithDefined<
  A extends object,
  B extends object,
  C extends object,
  D extends object
>(a: A, b: B, c: C, d: D): A & B & C & D;
function mergeWithDefined<
  A extends object,
  B extends object,
  C extends object,
  D extends object,
  E extends object
>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
function mergeWithDefined<T extends object>(...args: Partial<T>[]): T;
function mergeWithDefined(...args: any[]) {
  return assignWith({}, ...args, (prev: any, next: any) => {
    return next === undefined ? prev : next;
  });
}

export default mergeWithDefined;

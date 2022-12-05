import assignWith from "lodash/assignWith";

function assignWithDefined<A extends object>(a: A): A;
function assignWithDefined<A extends object, B extends object>(
  a: A,
  b: B
): A & B;
function assignWithDefined<
  A extends object,
  B extends object,
  C extends object
>(a: A, b: B, c: C): A & B & C;
function assignWithDefined<
  A extends object,
  B extends object,
  C extends object,
  D extends object
>(a: A, b: B, c: C, d: D): A & B & C & D;
function assignWithDefined<
  A extends object,
  B extends object,
  C extends object,
  D extends object,
  E extends object
>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
function assignWithDefined<T extends object>(
  base: Partial<T>,
  ...args: Partial<T>[]
): T;
function assignWithDefined(base: any, ...args: any[]) {
  return assignWith(base, ...args, (prev: any, next: any) => {
    return next === undefined ? prev : next;
  });
}

export default assignWithDefined;

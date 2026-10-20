/**
 * Shallowly merge multiple objects, skipping keys whose value is `undefined`
 * (`null` values still override). Intended for merging default options with
 * user-provided options.
 */
function mergeDefined<A extends object>(a: A): A;
function mergeDefined<A extends object, B extends object>(a: A, b: B): A & B;
function mergeDefined<A extends object, B extends object, C extends object>(
  a: A,
  b: B,
  c: C,
): A & B & C;
function mergeDefined<A extends object, B extends object, C extends object, D extends object>(
  a: A,
  b: B,
  c: C,
  d: D,
): A & B & C & D;
function mergeDefined<
  A extends object,
  B extends object,
  C extends object,
  D extends object,
  E extends object,
>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
function mergeDefined<T extends object>(...args: Partial<T>[]): T;
function mergeDefined(...args: any[]) {
  const to: any = {};

  for (let i = 0; i < args.length; i++) {
    const from = args[i];

    if (from != null) {
      for (const key in from) {
        if (Object.prototype.hasOwnProperty.call(from, key)) {
          if (from[key] !== undefined || !Object.prototype.hasOwnProperty.call(to, key)) {
            to[key] = from[key];
          }
        }
      }
    }
  }

  return to;
}

export default mergeDefined;

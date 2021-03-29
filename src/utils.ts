import { DependencyList } from "react";

export const is =
  Object.is ||
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
  function (x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y; // eslint-disable-line
    }
  };

export function areDepsEqual(
  prevDeps: any[] | DependencyList,
  nextDeps: any[] | DependencyList
) {
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}

export function extname(url: string): string {
  if (typeof url === "string" && url !== "") {
    const blocks = url.split(/[#?]/);

    if (blocks.length) {
      const pathname = blocks[0];
      const chunks = pathname.split(".");

      if (chunks.length > 1) {
        return (chunks.pop() as string).trim().toLowerCase();
      }
    }
  }

  return "";
}

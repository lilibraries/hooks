import { useEffect, useLayoutEffect } from "react";

import inBrowser from "./utils/inBrowser";

/**
 * Like `React.useLayoutEffect`, but falls back to `React.useEffect` outside the
 * browser so server-side rendering never warns or misbehaves.
 *
 * @param effect The effect to run; may return a cleanup function.
 * @param deps The dependency array.
 */
const useIsomorphicLayoutEffect = inBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;

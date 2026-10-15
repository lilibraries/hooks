import { useEffect, useLayoutEffect } from "react";

import inBrowser from "./utils/inBrowser";

/**
 * Like `React.useLayoutEffect`, but falls back to `React.useEffect` outside the
 * browser so server-side rendering never warns or misbehaves.
 */
const useIsomorphicLayoutEffect = inBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;

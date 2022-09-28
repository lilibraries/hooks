import { useEffect, useLayoutEffect } from "react";
import inBrowser from "./utils/inBrowser";

const useIsomorphicLayoutEffect = inBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;

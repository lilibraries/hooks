import { useEffect, useLayoutEffect } from "react";
import { inBrowser } from "@lilib/utils";

const useIsomorphicLayoutEffect = inBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;

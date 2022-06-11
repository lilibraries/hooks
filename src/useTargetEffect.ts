import { useEffect } from "react";
import createTargetEffectHook from "./creators/createTargetEffectHook";

const useTargetEffect = createTargetEffectHook(useEffect);

export default useTargetEffect;

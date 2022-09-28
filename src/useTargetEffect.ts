import { useEffect } from "react";
import createTargetEffectHook from "./factories/createTargetEffectHook";

const useTargetEffect = createTargetEffectHook(useEffect);

export default useTargetEffect;

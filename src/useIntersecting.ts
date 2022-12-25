import { EffectTarget } from "@lilib/utils";
import useSafeState from "./useSafeState";
import useIntersectionObserver, {
  IntersectionObserverHookOptions,
} from "./useIntersectionObserver";
import { useDebugValue } from "react";

function useIntersecting(
  target: EffectTarget<Element>,
  optoins?: IntersectionObserverHookOptions
) {
  const [intersecting, setIntersecting] = useSafeState(false);

  useIntersectionObserver(
    target,
    (entries) => {
      if (entries && entries[0] && entries[0].isIntersecting) {
        setIntersecting(true);
      } else {
        setIntersecting(false);
      }
    },
    optoins
  );

  useDebugValue(intersecting);

  return intersecting;
}

export default useIntersecting;

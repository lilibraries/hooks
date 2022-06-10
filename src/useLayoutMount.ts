import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

function useLayoutMount(effect: () => void) {
  useIsomorphicLayoutEffect(() => {
    effect();
  }, []);
}

export default useLayoutMount;

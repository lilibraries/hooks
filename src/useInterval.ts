import useTimeout from "./useTimeout";

function useInterval(callback: () => void, ms: number) {
  const [start, cancel] = useTimeout(() => {
    callback();
    start();
  }, ms);

  return [start, cancel] as const;
}

export default useInterval;

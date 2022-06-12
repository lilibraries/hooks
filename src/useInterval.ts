import useTimeout from "./useTimeout";

function useInterval(callback: () => void, interval: number) {
  const [start, cancel] = useTimeout(() => {
    callback();
    start();
  }, interval);

  return [start, cancel] as const;
}

export default useInterval;

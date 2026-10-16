import { useLoad } from "@lilib/hooks";

let requestCount = 0;

const fetchNumber = () => {
  return new Promise<number>((resolve) => {
    requestCount += 1;
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Example() {
  const { data, loading, load, force } = useLoad(fetchNumber, [], {
    imperative: true,
    cacheKey: "load-stale-time",
    staleTime: 5000,
  });

  return (
    <div>
      <button onClick={() => load()}>Load</button>
      <button onClick={() => force()}>Force</button>
      Number: {loading ? "Loading..." : String(data)}
      <br />
      Requests sent: {requestCount}
    </div>
  );
}

export default Example;

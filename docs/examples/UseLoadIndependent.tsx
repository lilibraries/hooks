import { useLoad, useReload } from "@lilib/hooks";

let requestCount = 0;

const fetchNumber = () => {
  return new Promise<number>((resolve) => {
    requestCount += 1;
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Component() {
  const { data, loading } = useLoad(fetchNumber, [], {
    key: "load-independent",
    independent: true,
  });

  return <div>Number: {loading ? "Loading..." : data}</div>;
}

function Example() {
  const reload = useReload("load-independent");

  return (
    <div>
      <Component />
      <Component />
      Requests sent: {requestCount}
      <button onClick={() => reload()}>Reload</button>
    </div>
  );
}

export default Example;

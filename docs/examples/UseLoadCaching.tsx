import { useLoad, useToggle } from "@lilib/hooks";

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
    cacheKey: "load-cache-key",
  });

  return (
    <div>
      Number: {String(data ?? "—")} {loading ? "(Loading...)" : ""}
    </div>
  );
}

function Example() {
  const [visible, { toggle }] = useToggle(false);

  return (
    <div>
      <button onClick={() => toggle()}>{visible ? "Hide" : "Show"}</button>
      Requests sent: {requestCount}
      {visible && <Component />}
    </div>
  );
}

export default Example;

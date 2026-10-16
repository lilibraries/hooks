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
  const { data, loading, update, reload } = useLoad(fetchNumber);

  return (
    <div>
      Number: {String(data ?? "—")} {loading ? "(Loading...)" : ""}
      <br />
      <button onClick={() => update((prev) => (prev ?? 0) + 1)}>+1 locally</button>
      <button onClick={() => reload()}>Reload from server</button>
      Requests sent: {requestCount}
    </div>
  );
}

export default Example;

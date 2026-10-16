import { useLoad } from "@lilib/hooks";

let count = 0;
const fetchCount = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(++count);
    }, 1000);
  });
};

function Example() {
  const { data, loading } = useLoad(fetchCount, [], {
    autoReloadOnPageShow: true,
    autoReloadOnWindowFocus: true,
    autoReloadOnNetworkReconnect: true,
  });

  return (
    <div>
      Requests: {data} {loading ? "(Loading...)" : ""}
      <br />
      Switch to another tab and come back to see it reload.
    </div>
  );
}

export default Example;

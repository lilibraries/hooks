import { useEffect } from "react";
import { useLoad } from "@lilib/hooks";

let shouldFail = true;

const fetchData = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        shouldFail = false;
        reject(new Error("network error"));
      } else {
        resolve("recovered data");
      }
    }, 1000);
  });
};

function Example() {
  useEffect(() => {
    shouldFail = true;
  }, []);

  const { data, error, loading, load } = useLoad(fetchData, [], { imperative: true });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        Error: {error.message}
        <button onClick={() => load()}>Retry</button>
      </div>
    );
  }
  return <div>Data: {data}</div>;
}

export default Example;

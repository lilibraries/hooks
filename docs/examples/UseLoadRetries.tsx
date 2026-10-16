import { useEffect } from "react";
import { useLoad } from "@lilib/hooks";

let attempt = 0;

const fetchData = () => {
  attempt += 1;
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (attempt >= 3) {
        resolve("resolved");
      } else {
        reject(new Error(`attempt ${attempt} failed`));
      }
    }, 1000);
  });
};

function Example() {
  useEffect(() => {
    attempt = 0;
  }, []);

  const { data, error, loading, load } = useLoad(fetchData, [], {
    imperative: true,
    retry: true,
    retryInterval: 1000,
  });

  return (
    <div>
      <button
        onClick={() => {
          attempt = 0;
          load().catch(() => {});
        }}
      >
        Load
      </button>
      {attempt > 0 && <div>Attempt: {attempt}</div>}
      {loading ? "Loading..." : error ? `Error: ${error.message}` : data}
    </div>
  );
}

export default Example;

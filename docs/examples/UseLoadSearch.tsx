import { useState } from "react";
import { useLoad } from "@lilib/hooks";

let requestCount = 0;

const search = (keyword: string) => {
  return new Promise<string>((resolve) => {
    requestCount += 1;
    setTimeout(() => {
      resolve(`results for "${keyword}"`);
    }, 1000);
  });
};

function Example() {
  const [keyword, setKeyword] = useState("");

  const { data, loading, load } = useLoad(search, [], { imperative: true });

  return (
    <div>
      <input
        value={keyword}
        onChange={(event) => {
          const value = event.target.value;
          setKeyword(value);
          if (value) {
            load(value);
          }
        }}
        placeholder="Type to search..."
      />
      <div>Requests sent: {requestCount}</div>
      {keyword ? <div>{loading ? "Searching..." : data}</div> : <div>No keyword yet.</div>}
    </div>
  );
}

export default Example;

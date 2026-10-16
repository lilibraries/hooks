import { useState } from "react";
import { useLoad } from "@lilib/hooks";

// Each load fetches the next page (in a real app, triggered by scrolling).
const fetchPage = (page: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(page);
    }, 1000);
  });
};

function Example() {
  const [list, setList] = useState<number[]>([]);
  const [page, setPage] = useState(0);

  const { loading, load } = useLoad(fetchPage, [], {
    imperative: true,
    onSuccess: (page) => {
      setList((list) => [...list, page]);
      setPage(page);
    },
  });

  return (
    <div>
      <button onClick={() => load(page + 1)}>Load page</button>
      <ul>
        {list.map((item) => (
          <li key={item}>Page {item}</li>
        ))}
        {loading && <li key="loading">Loading...</li>}
      </ul>
    </div>
  );
}

export default Example;

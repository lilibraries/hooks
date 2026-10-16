import { useLoad } from "@lilib/hooks";

const fetchFromPrimary = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("primary source failed"));
    }, 1000);
  });
};

const fetchFromFallback = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("data from fallback");
    }, 1000);
  });
};

function Example() {
  // The primary source always fails, so the data always comes from the fallback.
  const { data, error, loading } = useLoad(fetchFromPrimary, [], {
    fallback: fetchFromFallback,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Data: {data}</div>;
}

export default Example;

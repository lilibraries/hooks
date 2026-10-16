import { useLoad } from "@lilib/hooks";

const fetchData = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("@lilib/hooks");
    }, 1000);
  });
};

function Example() {
  const { data, error, loading } = useLoad(fetchData);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Data: {data}</div>;
}

export default Example;

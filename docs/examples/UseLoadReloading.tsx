import { useLoad } from "@lilib/hooks";

const fetchNumber = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Example() {
  const { data, initializing, reloading, reload } = useLoad(fetchNumber);

  return (
    <div>
      {initializing ? "Loading..." : `Number: ${data}`}
      {reloading ? " (Reloading...)" : ""}
      <br />
      <button onClick={() => reload()}>Reload</button>
    </div>
  );
}

export default Example;

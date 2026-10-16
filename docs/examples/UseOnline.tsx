import { useOnline } from "@lilib/hooks";

function Example() {
  const online = useOnline();

  return (
    <div style={{ padding: 8, backgroundColor: online ? "#d4edda" : "#f8d7da" }}>
      {online ? "The network is online" : "You are offline"}
    </div>
  );
}

export default Example;

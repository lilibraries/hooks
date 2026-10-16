import { useSetState } from "@lilib/hooks";

function Example() {
  const [state, setState] = useSetState({ firstName: "", lastName: "" });

  return (
    <>
      <p>
        First name:{" "}
        <input
          value={state.firstName}
          onChange={(event) => {
            setState({ firstName: event.target.value });
          }}
        />
      </p>
      <p>
        Last name:{" "}
        <input
          value={state.lastName}
          onChange={(event) => {
            setState({ lastName: event.target.value });
          }}
        />
      </p>
      <div>
        Full name: {state.firstName} {state.lastName}
      </div>
    </>
  );
}

export default Example;

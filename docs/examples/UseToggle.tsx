import { useToggle } from "@lilib/hooks";

function Example() {
  const [on, { toggle, toggleOn, toggleOff }] = useToggle(true);

  return (
    <>
      <div>
        <button onClick={() => toggle()}>Toggle</button> <button onClick={toggleOn}>Turn on</button>{" "}
        <button onClick={toggleOff}>Turn off</button>
      </div>
      <div>The switch is {on ? "on" : "off"}</div>
      {on && <div style={{ padding: 8, marginTop: 8, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>Details panel</div>}
    </>
  );
}

export default Example;

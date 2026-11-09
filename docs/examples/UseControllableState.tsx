import { useState } from "react";

import { useControllableState } from "@lilib/hooks";

function Field({
  value,
  defaultValue = "",
  onChange,
}: {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  const [text, setText] = useControllableState({ value, defaultValue, onChange });

  return <input value={text} onChange={(event) => setText(event.target.value)} />;
}

function Example() {
  const [value, setValue] = useState("Controlled value");

  return (
    <>
      <div>
        Controlled: <Field value={value} onChange={setValue} />{" "}
        <button onClick={() => setValue("Reset from outside")}>Reset</button>
      </div>
      <div style={{ marginTop: 8 }}>
        Uncontrolled: <Field defaultValue="Initial value" />
      </div>
      <div style={{ marginTop: 8 }}>Controlled value: {value}</div>
    </>
  );
}

export default Example;

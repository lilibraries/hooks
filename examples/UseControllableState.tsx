import React, {
  useState,
  forwardRef,
  HTMLAttributes,
  ChangeEventHandler,
} from "react";
import { useControllableState } from "@lilib/hooks";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value: valueProp, defaultValue, onChange, ...rest } = props;
  const [value, setValue] = useControllableState(defaultValue, valueProp);

  return (
    <input
      {...rest}
      ref={ref}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        if (onChange) {
          onChange(event);
        }
      }}
    />
  );
});

function Example() {
  const [value, setValue] = useState("");

  return (
    <>
      <div>
        Uncontrolled input:{" "}
        <Input
          defaultValue={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </div>
      <div>
        Controlled by the input above: <Input value={value} />
      </div>
    </>
  );
}

export default Example;

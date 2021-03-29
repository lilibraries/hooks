# @lilib/hooks

React hooks library.

## Install

```shell
npm install --save @lilib/hooks
# Or
yarn add @lilib/hooks
```

## Example

```tsx
import React from "react";
import { useMount } from "@lilib/hooks";

function Example() {
  useMount(() => {
    console.log("Component is mounted");
  });
  ...
}
```

## Document

https://lilibraries.github.io/hooks/

## License

Code licensed MIT, docs CC BY 3.0.

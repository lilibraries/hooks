import { useEffect } from "react";
import createMountHook from "./factories/createMountHook";

const useMount = createMountHook(useEffect);

export default useMount;

import { useEffect } from "react";
import createMountHook from "./creators/createMountHook";

const useMount = createMountHook(useEffect);

export default useMount;

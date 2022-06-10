import { useEffect } from "react";
import createUpdateHook from "./creators/createUpdateHook";

const useUpdate = createUpdateHook(useEffect);

export default useUpdate;

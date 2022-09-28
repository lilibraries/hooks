import { useEffect } from "react";
import createUpdateHook from "./factories/createUpdateHook";

const useUpdate = createUpdateHook(useEffect);

export default useUpdate;

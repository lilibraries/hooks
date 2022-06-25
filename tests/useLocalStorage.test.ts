import { useLocalStorage } from "@lilib/hooks";
import testStorgeHook from "./helpers/testStorageHook";

testStorgeHook("useLocalStorage", localStorage, useLocalStorage);

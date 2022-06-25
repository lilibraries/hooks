import { useSessionStorage } from "@lilib/hooks";
import testStorgeHook from "./helpers/testStorageHook";

testStorgeHook("useSessionStorage", sessionStorage, useSessionStorage);

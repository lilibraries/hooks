import usePersist from "./usePersist";
import { useLoadConfig } from "./configs/LoadConfig";

function useReload(key: {}) {
  const { store } = useLoadConfig();

  return usePersist(() => {
    store.getReloaders(key).forEach((reload) => {
      reload();
    });
  });
}

export default useReload;

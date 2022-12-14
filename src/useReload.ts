import usePersist from "./usePersist";
import { useLoadConfig } from "./configs/LoadConfig";

export interface ReloadHookOptions {
  force?: boolean;
}

function useReload(key: {}, options?: ReloadHookOptions) {
  const { store } = useLoadConfig();

  const reload = usePersist((params?: ReloadHookOptions) => {
    const force =
      (!!params && !!params.force) || (!!options && !!options.force);

    store.getReloaders(key).forEach((reload) => {
      reload({ force });
    });
  });

  return reload;
}

export default useReload;

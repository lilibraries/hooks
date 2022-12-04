import React, {
  FC,
  ReactNode,
  useContext,
  createContext,
  useDebugValue,
} from "react";
import omit from "lodash/omit";
import assignWithDefined from "./utils/assignWithDefined";

export interface SharedOptions {
  retry?: boolean;
  retryLimit?: number;
  retryInterval?: number | ((count: number) => number);
  fallbackRetry?: boolean;
  fallbackRetryLimit?: number;
  fallbackRetryInterval?: number | ((count: number) => number);
  polling?: boolean;
  pollingInterval?: number;
  pollingInPageHiding?: boolean;
  pollingIntervalInPageHiding?: number;
  autoReloadWaitTime?: number;
  autoReloadOnPageShow?: boolean;
  autoReloadOnWindowFocus?: boolean;
  autoReloadOnNetworkReconnect?: boolean;
}

export interface LoadConfigValue extends Required<SharedOptions> {
  global: boolean;
  onSuccess?: (data: any, key?: {}) => void;
  onFailure?: (error: any, key?: {}) => void;
  onFinally?: (key?: {}) => void;
  handleSuccess?: (data: any, key?: {}) => void;
  handleFailure?: (error: any, key?: {}) => void;
  handleFinally?: (key?: {}) => void;
}

interface LoadConfigProps extends Partial<LoadConfigValue> {
  inherit?: boolean;
  children?: ReactNode;
}

const defaultValue: LoadConfigValue = {
  global: false,
  retry: false,
  retryLimit: 3,
  retryInterval: 0,
  fallbackRetry: false,
  fallbackRetryLimit: 3,
  fallbackRetryInterval: 0,
  polling: false,
  pollingInterval: 30 * 1000,
  pollingInPageHiding: false,
  pollingIntervalInPageHiding: 60 * 1000,
  autoReloadWaitTime: 5 * 1000,
  autoReloadOnPageShow: false,
  autoReloadOnWindowFocus: false,
  autoReloadOnNetworkReconnect: false,
};

const LoadContext = createContext<LoadConfigValue>(defaultValue);
export const useLoadConfig = () => useContext(LoadContext);

const LoadConfig: FC<LoadConfigProps> & {
  Context: typeof LoadContext;
  useConfig: typeof useLoadConfig;
} = (props) => {
  const config = useLoadConfig();
  let value = omit(props, "inherit", "children") as LoadConfigValue;

  if (props.inherit) {
    value = assignWithDefined({}, config, value);
  } else {
    value = assignWithDefined({}, defaultValue, value);
  }

  useDebugValue(value);

  return (
    <LoadContext.Provider value={value}>{props.children}</LoadContext.Provider>
  );
};

LoadConfig.Context = LoadContext;
LoadConfig.useConfig = useLoadConfig;

export default LoadConfig;

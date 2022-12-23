import React from "react";
import { LoadConfig } from "@lilib/hooks";
import { render } from "@testing-library/react";
import renderHook from "../helpers/renderHook";

describe("LoadConfig", () => {
  it("has context object", () => {
    expect(LoadConfig.Context).toBeDefined();
  });

  it("has correct default value", () => {
    const { result } = renderHook(() => LoadConfig.useConfig());
    expect(result.current.store).toBeDefined();
    expect(result.current.global).toBe(false);
    expect(result.current.cacheTime).toBe(300000);
    expect(result.current.staleTime).toBe(0);
    expect(result.current.retry).toBe(false);
    expect(result.current.retryLimit).toBe(3);
    expect(result.current.retryInterval).toBe(0);
    expect(result.current.fallbackRetry).toBe(false);
    expect(result.current.fallbackRetryLimit).toBe(3);
    expect(result.current.fallbackRetryInterval).toBe(0);
    expect(result.current.polling).toBe(false);
    expect(result.current.pollingInterval).toBe(30000);
    expect(result.current.pollingInPageHiding).toBe(false);
    expect(result.current.pollingIntervalInPageHiding).toBe(60000);
    expect(result.current.autoReloadWaitTime).toBe(10000);
    expect(result.current.autoReloadOnPageShow).toBe(false);
    expect(result.current.autoReloadOnWindowFocus).toBe(false);
    expect(result.current.autoReloadOnNetworkReconnect).toBe(false);
  });

  it("can set global store", () => {
    const globalVar: any = globalThis;
    expect(globalVar["__LILIB_HOOKS_GLOBAL_LOAD_STORE__"]).not.toBeDefined();
    render(<LoadConfig global></LoadConfig>);
    expect(globalVar["__LILIB_HOOKS_GLOBAL_LOAD_STORE__"]).toBeDefined();
  });

  it("inherits config correctly", () => {
    let config: any;

    function Example() {
      config = LoadConfig.useConfig();
      return null;
    }

    render(
      <LoadConfig cacheTime={100} staleTime={100}>
        <LoadConfig cacheTime={200} staleTime={undefined}>
          <Example />
        </LoadConfig>
      </LoadConfig>
    );

    expect(config.cacheTime).toBe(200);
    expect(config.staleTime).toBe(0);

    render(
      <LoadConfig cacheTime={100} staleTime={100}>
        <LoadConfig cacheTime={200} staleTime={undefined} inherit>
          <Example />
        </LoadConfig>
      </LoadConfig>
    );

    expect(config.cacheTime).toBe(200);
    expect(config.staleTime).toBe(100);
  });
});

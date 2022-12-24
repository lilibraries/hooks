import React from "react";
import { CacheConfig } from "@lilib/hooks";
import { render, screen } from "@testing-library/react";
import renderHook from "../helpers/renderHook";

describe("CacheConfig", () => {
  it("has context object", () => {
    expect(CacheConfig.Context).toBeDefined();
  });

  it("has correct default value", () => {
    const { result } = renderHook(() => CacheConfig.useConfig());
    expect(result.current.global).toBe(false);
    expect(result.current.cache).toBeDefined();
    expect(result.current.cacheSync).toBe(false);
    expect(result.current.cacheTime).toBe(300000);
    expect(result.current.fallback).not.toBeDefined();
  });

  it("can set global cache", () => {
    const globalVar: any = globalThis;
    expect(globalVar["__LILIB_HOOKS_GLOBAL_CACHE__"]).not.toBeDefined();
    render(<CacheConfig global></CacheConfig>);
    expect(globalVar["__LILIB_HOOKS_GLOBAL_CACHE__"]).toBeDefined();
  });

  it("inherits config correctly", () => {
    let config: any;

    function Example() {
      config = CacheConfig.useConfig();
      return null;
    }

    render(
      <CacheConfig cacheTime={100} cacheSync={true}>
        <CacheConfig cacheTime={200} cacheSync={undefined}>
          <Example />
        </CacheConfig>
      </CacheConfig>
    );

    expect(config.cacheTime).toBe(200);
    expect(config.cacheSync).toBe(false);

    render(
      <CacheConfig cacheTime={100} cacheSync={true}>
        <CacheConfig cacheTime={200} cacheSync={undefined} inherit>
          <Example />
        </CacheConfig>
      </CacheConfig>
    );

    expect(config.cacheTime).toBe(200);
    expect(config.cacheSync).toBe(true);
  });

  it("display fallback ui correctly", () => {
    const fakeCache = {
      has() {
        return true;
      },
      get() {},
      getCacheTimestamp() {
        return Date.now();
      },
      set() {},
      delete() {},
      isReady() {
        return false;
      },
      once() {},
      off() {},
      for() {
        return {
          on() {},
          off() {},
        };
      },
    };
    function FakeFallback() {
      return <div>Fallback UI</div>;
    }

    expect(() => {
      screen.getByText("Fallback UI");
    }).toThrowError();

    render(
      <CacheConfig cache={fakeCache} fallback={<FakeFallback />}></CacheConfig>
    );
    expect(screen.getByText("Fallback UI").tagName.toLowerCase()).toBe("div");
  });
});

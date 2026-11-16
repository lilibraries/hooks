import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useCopyToClipboard from "../src/useCopyToClipboard";

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

let writeText: jest.Mock;

function installClipboard() {
  writeText = jest.fn().mockResolvedValue(undefined);

  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

function removeClipboard() {
  Reflect.deleteProperty(navigator, "clipboard");
}

function installExecCommand(implementation: () => boolean) {
  Object.defineProperty(document, "execCommand", {
    configurable: true,
    value: jest.fn(implementation),
  });
}

type CopyResult = readonly [copied: boolean, copy: (text: string) => Promise<boolean>];

async function runCopy(result: { current: CopyResult }, text: string) {
  let succeeded: boolean | undefined;

  await act(async () => {
    succeeded = await result.current[1](text);
  });

  return succeeded;
}

function advance(milliseconds: number) {
  act(() => {
    jest.advanceTimersByTime(milliseconds);
  });
}

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    installClipboard();
  });

  afterEach(() => {
    jest.useRealTimers();
    removeClipboard();
    Reflect.deleteProperty(document, "execCommand");
  });

  it("copies text and resets `copied` after the reset timeout", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current[0]).toBe(false);

    const succeeded = await runCopy(result, "hello");
    expect(succeeded).toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello");
    expect(result.current[0]).toBe(true);

    advance(999);
    expect(result.current[0]).toBe(true);

    advance(1);
    expect(result.current[0]).toBe(false);
  });

  it("copies an empty string", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    const succeeded = await runCopy(result, "");
    expect(succeeded).toBe(true);
    expect(writeText).toHaveBeenCalledWith("");
    expect(result.current[0]).toBe(true);
  });

  it("resolves false and keeps `copied` false when writing fails", async () => {
    writeText.mockRejectedValue(new Error("denied"));
    const { result } = renderHook(() => useCopyToClipboard());

    const before = jest.getTimerCount();

    const succeeded = await runCopy(result, "hello");
    expect(succeeded).toBe(false);
    expect(result.current[0]).toBe(false);
    expect(jest.getTimerCount()).toBe(before);
  });

  it("restarts the reset timer on consecutive successful copies", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await runCopy(result, "first");
    advance(600);
    await runCopy(result, "second");
    expect(result.current[0]).toBe(true);

    advance(600);
    expect(result.current[0]).toBe(true);

    advance(400);
    expect(result.current[0]).toBe(false);
  });

  it("keeps the reset timer of a previous success when a copy fails", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await runCopy(result, "first");
    writeText.mockRejectedValue(new Error("denied"));
    await runCopy(result, "second");

    expect(result.current[0]).toBe(true);

    advance(1000);
    expect(result.current[0]).toBe(false);
  });

  it("supports a custom reset timeout", async () => {
    const { result } = renderHook(() => useCopyToClipboard(2000));

    await runCopy(result, "hello");
    expect(result.current[0]).toBe(true);

    advance(1000);
    expect(result.current[0]).toBe(true);

    advance(1000);
    expect(result.current[0]).toBe(false);
  });

  it("falls back to document.execCommand when the Clipboard API is unavailable", async () => {
    removeClipboard();

    let textareaValue: string | undefined;
    installExecCommand(() => {
      textareaValue = document.querySelector("textarea")?.value;
      return true;
    });

    const { result } = renderHook(() => useCopyToClipboard());

    const succeeded = await runCopy(result, "hello");
    expect(succeeded).toBe(true);
    expect(result.current[0]).toBe(true);
    expect(textareaValue).toBe("hello");
    expect(document.querySelector("textarea")).toBeNull();

    advance(1000);
    expect(result.current[0]).toBe(false);
  });

  it("resolves false when neither clipboard API is available", async () => {
    removeClipboard();
    installExecCommand(() => false);

    const { result } = renderHook(() => useCopyToClipboard());

    const succeeded = await runCopy(result, "hello");
    expect(succeeded).toBe(false);
    expect(result.current[0]).toBe(false);
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("resolves false when the legacy path throws", async () => {
    removeClipboard();
    const { result } = renderHook(() => useCopyToClipboard());

    const appendSpy = jest.spyOn(document.body, "appendChild").mockImplementation(() => {
      throw new Error("boom");
    });

    try {
      const succeeded = await runCopy(result, "hello");
      expect(succeeded).toBe(false);
      expect(result.current[0]).toBe(false);
      expect(document.querySelector("textarea")).toBeNull();
    } finally {
      appendSpy.mockRestore();
    }
  });

  it("clears the reset timer on unmount", async () => {
    const { result, unmount } = renderHook(() => useCopyToClipboard());

    const before = jest.getTimerCount();

    await runCopy(result, "hello");
    expect(jest.getTimerCount()).toBe(before + 1);

    unmount();
    expect(jest.getTimerCount()).toBe(before);
  });

  it("does not schedule the reset timer when copy succeeds after unmount", async () => {
    const { result, unmount } = renderHook(() => useCopyToClipboard());
    const copyFn = result.current[1];
    const before = jest.getTimerCount();

    unmount();

    const succeeded = await runCopy({ current: [false, copyFn] }, "hello");
    expect(succeeded).toBe(true);
    expect(jest.getTimerCount()).toBe(before);
  });

  it("works under StrictMode without leaking timers", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      const { result, unmount } = renderHook(() => useCopyToClipboard(), strictOptions);
      const before = jest.getTimerCount();

      await runCopy(result, "hello");
      expect(result.current[0]).toBe(true);
      expect(jest.getTimerCount()).toBe(before + 1);

      advance(1000);
      expect(result.current[0]).toBe(false);

      unmount();
      expect(jest.getTimerCount()).toBe(before);
    } finally {
      errorSpy.mockRestore();
    }

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("falls back to the default timeout for an invalid reset timeout", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      const { result } = renderHook(() => useCopyToClipboard(0));

      await runCopy(result, "hello");
      expect(result.current[0]).toBe(true);

      advance(999);
      expect(result.current[0]).toBe(true);

      advance(1);
      expect(result.current[0]).toBe(false);
    } finally {
      errorSpy.mockRestore();
    }
  });
});

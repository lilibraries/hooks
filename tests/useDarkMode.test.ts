import { useDarkMode } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useDarkMode", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it("should return a boolean value", () => {
    const { result } = renderHook(() => useDarkMode());
    expect(typeof result.current).toBe("boolean");
  });
});

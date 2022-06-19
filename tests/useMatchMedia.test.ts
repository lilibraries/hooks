import { useMatchMedia } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useMatchMedia", () => {
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
    const { result } = renderHook(() => useMatchMedia("(max-width: 1000px)"));
    expect(typeof result.current).toBe("boolean");
  });
});

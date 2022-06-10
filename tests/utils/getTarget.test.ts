import { getTarget, isBrowser } from "@lilib/hooks";

describe("utils/getTarget", () => {
  it("should get target correctly", () => {
    const target = "target";
    const creator1 = () => target;
    const creator2 = { current: target };

    expect(getTarget(target)).toBe(isBrowser ? target : null);
    expect(getTarget(creator1)).toBe(isBrowser ? target : null);
    expect(getTarget(creator2)).toBe(isBrowser ? target : null);
  });
});

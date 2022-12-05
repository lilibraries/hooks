import inBrowser from "../../src/utils/inBrowser";
import getEffectTarget from "../../src/utils/getEffectTarget";

describe("utils/getEffectTarget", () => {
  it("should get target correctly", () => {
    const target = "target";
    const creator1 = () => target;
    const creator2 = { current: target };

    expect(getEffectTarget(target)).toBe(inBrowser ? target : null);
    expect(getEffectTarget(creator1)).toBe(inBrowser ? target : null);
    expect(getEffectTarget(creator2)).toBe(inBrowser ? target : null);
  });
});

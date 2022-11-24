import inBrowser from "../../src/utils/inBrowser";
import getTarget from "../../src/utils/getTarget";

describe("utils/getTarget", () => {
  it("should get target correctly", () => {
    const target = "target";
    const creator1 = () => target;
    const creator2 = { current: target };

    expect(getTarget(target)).toBe(inBrowser ? target : null);
    expect(getTarget(creator1)).toBe(inBrowser ? target : null);
    expect(getTarget(creator2)).toBe(inBrowser ? target : null);
  });
});

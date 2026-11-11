import parseKeystroke from "../../src/utils/parseKeystroke";

describe("parseKeystroke", () => {
  it("lowercases the token", () => {
    expect(parseKeystroke("A")).toEqual({ key: "a", code: "keya" });
    expect(parseKeystroke("ArrowUp")).toEqual({ key: "arrowup", code: "arrowup" });
  });

  it("supports token aliases", () => {
    expect(parseKeystroke("esc")).toEqual({ key: "escape", code: "escape" });
    expect(parseKeystroke("space")).toEqual({ key: " ", code: "space" });
    expect(parseKeystroke("plus")).toEqual({ key: "+", code: "+" });
    expect(parseKeystroke("up")).toEqual({ key: "arrowup", code: "arrowup" });
    expect(parseKeystroke("down")).toEqual({ key: "arrowdown", code: "arrowdown" });
    expect(parseKeystroke("left")).toEqual({ key: "arrowleft", code: "arrowleft" });
    expect(parseKeystroke("right")).toEqual({ key: "arrowright", code: "arrowright" });
  });

  it("keeps named keys as their code", () => {
    expect(parseKeystroke("escape")).toEqual({ key: "escape", code: "escape" });
    expect(parseKeystroke("control")).toEqual({ key: "control", code: "control" });
    expect(parseKeystroke("enter")).toEqual({ key: "enter", code: "enter" });
  });

  it("converts digits to code names", () => {
    expect(parseKeystroke("1")).toEqual({ key: "1", code: "digit1" });
  });

  it("passes physical names through", () => {
    expect(parseKeystroke("keya")).toEqual({ key: "keya", code: "keya" });
    expect(parseKeystroke("digit1")).toEqual({ key: "digit1", code: "digit1" });
    expect(parseKeystroke("equal")).toEqual({ key: "equal", code: "equal" });
  });

  it("does not treat inherited object properties as aliases", () => {
    expect(parseKeystroke("constructor")).toEqual({ key: "constructor", code: "constructor" });
    expect(parseKeystroke("toString")).toEqual({ key: "tostring", code: "tostring" });
  });
});

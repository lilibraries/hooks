import matchesKeystroke from "../../src/utils/matchesKeystroke";
import parseKeystroke from "../../src/utils/parseKeystroke";

function createEvent(init: KeyboardEventInit = {}) {
  return new KeyboardEvent("keydown", { key: "a", ...init });
}

describe("matchesKeystroke", () => {
  it("matches the logical key regardless of case", () => {
    expect(matchesKeystroke(createEvent({ key: "A" }), parseKeystroke("a"))).toBe(true);
  });

  it("ignores modifiers", () => {
    const event = createEvent({ key: "A", shiftKey: true, ctrlKey: true, metaKey: true });

    expect(matchesKeystroke(event, parseKeystroke("a"))).toBe(true);
  });

  it("does not match other keys", () => {
    expect(matchesKeystroke(createEvent({ key: "b" }), parseKeystroke("a"))).toBe(false);
  });

  it("matches the physical key position with eventField code", () => {
    // Option+C on macOS produces "ç" while the physical key stays the same
    const event = createEvent({ key: "ç", code: "KeyC" });
    const keystroke = parseKeystroke("c");

    expect(matchesKeystroke(event, keystroke)).toBe(false);
    expect(matchesKeystroke(event, keystroke, "code")).toBe(true);
  });

  it("matches token aliases", () => {
    expect(matchesKeystroke(createEvent({ key: " " }), parseKeystroke("space"))).toBe(true);
    expect(matchesKeystroke(createEvent({ key: "Escape" }), parseKeystroke("esc"))).toBe(true);
    expect(
      matchesKeystroke(
        createEvent({ key: "Escape", code: "Escape" }),
        parseKeystroke("esc"),
        "code",
      ),
    ).toBe(true);
  });

  it("ignores keystrokes during an IME composition", () => {
    expect(
      matchesKeystroke(createEvent({ key: "a", isComposing: true }), parseKeystroke("a")),
    ).toBe(false);
  });

  it("ignores keystrokes flagged by the legacy IME key code", () => {
    const event = createEvent({ key: "a" });
    Object.defineProperty(event, "keyCode", { value: 229 });

    expect(matchesKeystroke(event, parseKeystroke("a"))).toBe(false);
  });
});

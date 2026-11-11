import matchesHotkey from "../../src/utils/matchesHotkey";

function createEvent(init: KeyboardEventInit = {}) {
  return new KeyboardEvent("keydown", { key: "k", ...init });
}

describe("matchesHotkey", () => {
  it("matches a modifier combination", () => {
    expect(matchesHotkey(createEvent({ key: "k", ctrlKey: true }), "ctrl+k")).toBe(true);
  });

  it("requires exactly the same modifiers", () => {
    const event = createEvent({ key: "k", ctrlKey: true, metaKey: true });

    expect(matchesHotkey(event, "ctrl+k")).toBe(false);
    expect(matchesHotkey(event, "ctrl+meta+k")).toBe(true);
  });

  it("requires the same key", () => {
    expect(matchesHotkey(createEvent({ key: "j" }), "ctrl+k")).toBe(false);
  });

  it("matches shifted letters regardless of case", () => {
    expect(matchesHotkey(createEvent({ key: "A", shiftKey: true }), "shift+a")).toBe(true);
    expect(matchesHotkey(createEvent({ key: "A", shiftKey: true }), "A")).toBe(false);
  });

  it("maps mod to Control off Apple platforms", () => {
    expect(matchesHotkey(createEvent({ key: "k", ctrlKey: true }), "mod+k")).toBe(true);
    expect(matchesHotkey(createEvent({ key: "k", metaKey: true }), "mod+k")).toBe(false);
  });

  it("maps mod to Meta on Apple platforms", () => {
    const originalUserAgent = navigator.userAgent;
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    });

    try {
      expect(matchesHotkey(createEvent({ key: "k", metaKey: true }), "mod+k")).toBe(true);
      expect(matchesHotkey(createEvent({ key: "k", ctrlKey: true }), "mod+k")).toBe(false);
    } finally {
      Object.defineProperty(navigator, "userAgent", {
        configurable: true,
        value: originalUserAgent,
      });
    }
  });

  it("supports key aliases", () => {
    expect(matchesHotkey(createEvent({ key: "Escape" }), "esc")).toBe(true);
    expect(matchesHotkey(createEvent({ key: " " }), "space")).toBe(true);
    expect(matchesHotkey(createEvent({ key: "ArrowUp" }), "up")).toBe(true);
    expect(matchesHotkey(createEvent({ key: "+", shiftKey: true }), "shift+plus")).toBe(true);
  });

  it("matches the physical key position with eventField code", () => {
    // Option+C on macOS produces "ç" while the physical key stays the same
    const event = createEvent({ key: "ç", code: "KeyC", altKey: true });

    expect(matchesHotkey(event, "alt+c")).toBe(false);
    expect(matchesHotkey(event, "alt+c", "code")).toBe(true);
  });

  it("matches named physical keys with eventField code", () => {
    const event = createEvent({ key: "Escape", code: "Escape" });
    expect(matchesHotkey(event, "esc", "code")).toBe(true);

    const digit = createEvent({ key: "1", code: "Digit1" });
    expect(matchesHotkey(digit, "1", "code")).toBe(true);
  });

  it("ignores keystrokes during an IME composition", () => {
    expect(
      matchesHotkey(createEvent({ key: "k", ctrlKey: true, isComposing: true }), "ctrl+k"),
    ).toBe(false);
  });

  it("ignores keystrokes flagged by the legacy IME key code", () => {
    const event = createEvent({ key: "k", ctrlKey: true });
    Object.defineProperty(event, "keyCode", { value: 229 });

    expect(matchesHotkey(event, "ctrl+k")).toBe(false);
  });

  it("does not treat inherited object properties as modifiers or keys", () => {
    // The prototype members must not be picked up as modifiers, which would
    // silently turn these hotkeys into bare "k" and match every press.
    expect(matchesHotkey(createEvent({ key: "k" }), "constructor+k")).toBe(false);
    expect(matchesHotkey(createEvent({ key: "k" }), "toString+k")).toBe(false);
  });

  it("returns false for invalid hotkeys", () => {
    expect(matchesHotkey(createEvent(), "")).toBe(false);
    expect(matchesHotkey(createEvent(), "ctrl+shift")).toBe(false);
    expect(matchesHotkey(createEvent(), "a+b")).toBe(false);
  });
});

import { useClickOutside } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useClickOutside", () => {
  let button: HTMLButtonElement;
  let container: HTMLDivElement;

  beforeEach(() => {
    button = document.createElement("button");
    container = document.createElement("div");

    container.appendChild(button);
    document.body.appendChild(container);
  });

  it("should trigger events correctly", () => {
    const mock = jest.fn();
    const { unmount } = renderHook(() => {
      useClickOutside(() => button, mock);
    });

    const mouseDownEvent = document.createEvent("MouseEvents");
    mouseDownEvent.initEvent("mousedown", true, true);

    expect(mock).not.toBeCalled();

    button.dispatchEvent(mouseDownEvent);
    expect(mock).not.toBeCalled();

    container.dispatchEvent(mouseDownEvent);
    expect(mock).toBeCalledTimes(1);

    document.body.dispatchEvent(mouseDownEvent);
    expect(mock).toBeCalledTimes(2);

    unmount();
    document.body.dispatchEvent(mouseDownEvent);
    expect(mock).toBeCalledTimes(2);
  });

  it("could change default container and event name", () => {
    const mock = jest.fn();
    renderHook(() => {
      useClickOutside(() => button, mock, { container, eventName: "click" });
    });

    button.click();
    expect(mock).not.toBeCalled();

    container.click();
    expect(mock).toBeCalledTimes(1);

    document.body.click();
    expect(mock).toBeCalledTimes(1);
  });
});

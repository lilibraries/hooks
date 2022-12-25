import { useResizeObserver } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useResizeObserver", () => {
  it("should render normally", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    renderHook(() => {
      useResizeObserver(
        () => element,
        () => {}
      );
    });
  });
});

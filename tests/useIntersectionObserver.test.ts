import { useIntersectionObserver } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useIntersectionObserver", () => {
  it("should render normally", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    renderHook(() => {
      useIntersectionObserver(
        () => element,
        () => {}
      );
    });
  });
});

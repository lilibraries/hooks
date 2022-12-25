import { useIntersecting } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useIntersecting", () => {
  it("should render normally", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    renderHook(() => {
      useIntersecting(() => element);
    });
  });
});

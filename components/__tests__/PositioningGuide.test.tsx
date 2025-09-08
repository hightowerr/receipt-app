// components/__tests__/PositioningGuide.test.tsx
import React from "react";
import {render} from "@testing-library/react-native";
import {PositioningGuide} from "../PositioningGuide";

describe("PositioningGuide", () => {
  it("renders correctly when visible", () => {
    const {getByTestId} = render(
      <PositioningGuide testID="positioning-guide" />
    );
    const guide = getByTestId("positioning-guide");
    expect(guide).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const {queryByTestId} = render(
      <PositioningGuide visible={false} testID="positioning-guide" />
    );
    const guide = queryByTestId("positioning-guide");
    expect(guide).toBeNull();
  });
});

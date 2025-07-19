import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { WinnerDisplay } from "./WinnerDisplay";

describe("WinnerDisplay", () => {
  it("renders the default text when no winner text is provided", () => {
    const { container } = render(<WinnerDisplay text="" />);
    const defaultText = container.querySelector(
      ".MuiTypography-root.MuiTypography-body1",
    );

    expect(defaultText).toBeInTheDocument();
  });
});

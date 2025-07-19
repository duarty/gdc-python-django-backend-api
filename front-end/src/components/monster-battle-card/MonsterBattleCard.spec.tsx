import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MonsterBattleCard } from "./MonsterBattleCard.extended";

describe("MonsterBattleCard", () => {
  it("renders the card with a title when no monster is provided", () => {
    render(<MonsterBattleCard title="No Monster" />);

    const titleElement = screen.getByText("No Monster");
    expect(titleElement).toBeInTheDocument();
  });
});

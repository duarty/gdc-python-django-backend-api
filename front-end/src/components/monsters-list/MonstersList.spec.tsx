import "@testing-library/jest-dom";

import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { MonstersList } from "./MonstersList.extended";
import monstersData from "../../../../data/monsters.json";
import React from "react";

const monstersListFactory = (data = monstersData.monsters) => {
  render(
    <Provider store={store}>
      <MonstersList monsters={data} />
    </Provider>,
  );
};

describe("MonstersList", () => {
  it("should render the monsters list", () => {
    monstersListFactory();
    const monsterItemsCount = screen.getByTestId("monsters-list-section")
      .childNodes.length;
    expect(monsterItemsCount).toBe(monstersData.monsters.length);
  });

  it("should render the no monsters available message", () => {
    monstersListFactory([]);
    const noMonstersTitle = screen.getByText(/no monsters available/i);
    expect(noMonstersTitle).toBeInTheDocument();
  });

  it("should click on the first monster card", () => {
    monstersListFactory();
    expect(screen.getByTestId("monster-1")).toBeInTheDocument();
    act(() => screen.getByTestId("monster-1").click());
    expect(screen.getByTestId("monster-1")).toHaveStyle(
      "border: 1px solid #000000;",
    );
    act(() => screen.getByTestId("monster-1").click());
    expect(screen.getByTestId("monster-1")).toHaveStyle("border: none;");
  });
});

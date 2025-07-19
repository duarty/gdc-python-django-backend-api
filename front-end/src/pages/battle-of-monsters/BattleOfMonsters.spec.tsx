import "@testing-library/jest-dom";

import { act, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BattleOfMonsters } from "./BattleOfMonsters.extended";
import mockFetch from "jest-fetch-mock";

import monstersData from "../../../../data/monsters.json";
import { store } from "../../app/store";
import React from "react";

const battleOfMonstersFactory = async () => {
  mockFetch.mockResponse((req) => {
    if (req.url.includes("monsters")) {
      return Promise.resolve(JSON.stringify(monstersData.monsters));
    }
    if (req.url.includes("battle")) {
      return Promise.resolve(
        JSON.stringify({
          winner: monstersData.monsters[0],
          tie: false,
        }),
      );
    }

    return Promise.reject(new Error("not mapped url"));
  });
  render(
    <Provider store={store}>
      <BattleOfMonsters />
    </Provider>,
  );
  await waitFor(() =>
    expect(screen.getByTestId("monsters-list-section").childNodes).toHaveLength(
      monstersData.monsters.length,
    ),
  );
};

describe("BattleOfMonsters", () => {
  beforeEach(() => {
    mockFetch.enableMocks();
    mockFetch.resetMocks();
  });

  it("should render the page container", async () => {
    await battleOfMonstersFactory();
    expect(screen.getByText(/Battle of Monsters/i)).toBeInTheDocument();
    expect(screen.getByTestId("start-battle-button")).toBeInTheDocument();
  });

  it("should enable the start battle button on choose a monster", async () => {
    await battleOfMonstersFactory();
    expect(screen.getByTestId("start-battle-button")).toBeDisabled();
    expect(screen.getByTestId("monster-1")).toBeInTheDocument();
    act(() => screen.getByTestId("monster-1").click());
    expect(screen.getByTestId("start-battle-button")).toBeEnabled();
    act(() => screen.getByTestId("monster-1").click());
    expect(screen.getByTestId("start-battle-button")).toBeDisabled();
  });

  it("should start fight after click on button", async () => {
    await battleOfMonstersFactory();
    expect(screen.getByTestId("monster-1")).toBeInTheDocument();
    await act(() => screen.getByTestId("monster-1").click());
    await act(() => screen.getByTestId("start-battle-button").click());
  });
});

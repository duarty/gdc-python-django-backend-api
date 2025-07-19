import { MonsterService } from "./monsters.service";
import monstersData from "../../../../data/monsters.json";

describe("Monsters Service", () => {
  it("should return the monsters list empty", async () => {
    jest.spyOn(MonsterService, "getAll").mockResolvedValue([]);
    const response = await MonsterService.getAll();
    expect(response).toEqual([]);
  });

  it("should return the monsters list with data", async () => {
    jest
      .spyOn(MonsterService, "getAll")
      .mockResolvedValue([monstersData.monsters[0], monstersData.monsters[1]]);
    const response = await MonsterService.getAll();
    expect(response).toEqual([
      monstersData.monsters[0],
      monstersData.monsters[1],
    ]);
  });
});

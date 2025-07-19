import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Monster } from "../../models/interfaces/monster.interface";
import { MonsterService } from "./monsters.service";

export const fetchMonstersData = createAsyncThunk<Monster[]>(
  "monsters/fetchMonstersData",
  MonsterService.getAll,
);

export const setSelectedMonster = createAction<Monster | null>(
  "monsters/setSelectedMonster",
);

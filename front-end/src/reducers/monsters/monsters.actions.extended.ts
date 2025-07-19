import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Monster } from '../../models/interfaces/monster.interface';
import { Battle } from '../../models/interfaces/battle.interface';
import { MonsterServiceExtended } from './monsters.service.extended';

export const setRandomMonster = createAction<Monster | null>('monsters/setRandomMonster');

export const setWinner = createAction<Battle>('monsters/setWinner');

export const fetchBattleWins = createAsyncThunk(
  'monsters/fetchBattleWins',
  async (battleRequest: { monster1Id: string; monster2Id: string }) => {
    const battle = await MonsterServiceExtended.battle(battleRequest);
    return battle;
  }
);

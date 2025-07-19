import { RootState } from '../../app/store';

export const selectRandomMonster = (state: RootState) => 
  state.monstersExtended.selectRandomMonster;

export const selectWinner = (state: RootState) => 
  state.monstersExtended.winner;

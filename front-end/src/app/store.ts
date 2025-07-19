import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { monstersReducer } from "../reducers/monsters/monsters.reducer";
import { monstersReducerExtended } from "../reducers/monsters/monsters.reducer.extended";

export const store = configureStore({
  reducer: {
    monsters: monstersReducer,
    monstersExtended: monstersReducerExtended,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

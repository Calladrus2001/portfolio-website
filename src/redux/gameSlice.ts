import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorageUtil";

const MAX_LIVES = 3;

interface GameState {
  points: number;
  health: number;
  isGameStarted: boolean;
}

const initialState: GameState = {
  points: getFromLocalStorage("points", 0),
  health: getFromLocalStorage("health", MAX_LIVES),
  isGameStarted: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    increasePoints(state) {
      state.points += 10;
      setToLocalStorage("points", state.points);
    },
    resetGame(state) {
      state.points = 0;
      state.health = MAX_LIVES;
      setToLocalStorage("points", state.points);
      setToLocalStorage("health", state.health);
    },
    loseLife(state) {
      if (state.health > 0) {
        state.health -= 1;
        setToLocalStorage("health", state.health);
      }
    },
    setGameStarted(state) {
      state.isGameStarted = !state.isGameStarted;
    },
  },
});

export const { increasePoints, resetGame, loseLife, setGameStarted } = gameSlice.actions;
export default gameSlice.reducer;
export { MAX_LIVES };

import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/localStorageUtil";

const MAX_LIVES = 3;

interface GameState {
  points: number;
  highScore: number;
  health: number;
  isGameStarted: boolean;
}

const initialState: GameState = {
  points: 0,
  highScore: getFromLocalStorage("highScore", 0),
  health: MAX_LIVES,
  isGameStarted: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    increasePoints(state) {
      state.points += 10;
      if (state.points > state.highScore) {
        state.highScore = state.points;
        setToLocalStorage("highScore", state.highScore);
      }
    },
    resetGame(state) {
      if (state.points > state.highScore) {
        state.highScore = state.points;
        setToLocalStorage("highScore", state.highScore);
      }
      state.points = 0;
      state.health = MAX_LIVES;
    },
    loseLife(state) {
      if (state.health > 0) {
        state.health -= 1;
      }
    },
    toggleGameStarted(state) {
      state.isGameStarted = !state.isGameStarted;
    },
  },
});

export const { increasePoints, resetGame, loseLife, toggleGameStarted } =
  gameSlice.actions;
export default gameSlice.reducer;
export { MAX_LIVES };

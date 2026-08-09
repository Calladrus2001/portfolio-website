import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import modalReducer from "./modalSlice";
import resumeReducer from "./resumeSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    modal: modalReducer,
    resume: resumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

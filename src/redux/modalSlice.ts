import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
  header: string | null;
  content: string | null;
  isDismissible: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  header: null,
  content: null,
  isDismissible: true,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{
        header: string;
        content: string;
        isDismissible: boolean;
      }>
    ) {
      state.isOpen = true;
      state.header = action.payload.header;
      state.content = action.payload.content;
      state.isDismissible = action.payload.isDismissible;
    },
    closeModal(state) {
      state.isOpen = false;
      state.header = null;
      state.content = null;
      state.isDismissible = true;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

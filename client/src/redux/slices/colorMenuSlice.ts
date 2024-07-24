import { createSlice } from "@reduxjs/toolkit";

const colorMenuSlice = createSlice({
  name: "colorMenu",
  initialState: {
    isOpen: false,
  },
  reducers: {
    closeColorMenu: (state) => {
      state.isOpen = false;
    },

    openColorMenu: (state) => {
      state.isOpen = true;
    },

    generalColorMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { closeColorMenu, openColorMenu, generalColorMenu } =
  colorMenuSlice.actions;
export default colorMenuSlice.reducer;

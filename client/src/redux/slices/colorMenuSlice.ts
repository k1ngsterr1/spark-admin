import { createSlice } from "@reduxjs/toolkit";

const colorMenuSlice = createSlice({
  name: "colorMenu",
  initialState: {
    colorMenu: false,
  },
  reducers: {
    closeColorMenu: (state) => {
      state.colorMenu = false;
    },

    openColorMenu: (state) => {
      state.colorMenu = true;
    },

    generalColorMenu: (state) => {
      state.colorMenu = !state.colorMenu;
    },
  },
});

export const { closeColorMenu, openColorMenu, generalColorMenu } =
  colorMenuSlice.actions;
export default colorMenuSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const textMenuSlice = createSlice({
  name: "textMenu",
  initialState: {
    isOpen: false,
  },
  reducers: {
    closeTextMenu: (state) => {
      state.isOpen = false;
    },

    openTextMenu: (state) => {
      state.isOpen = true;
    },

    generalTextMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { closeTextMenu, openTextMenu, generalTextMenu } =
  textMenuSlice.actions;
export default textMenuSlice.reducer;

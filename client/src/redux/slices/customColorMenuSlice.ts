import { createSlice } from "@reduxjs/toolkit";

const customColorMenuSlice = createSlice({
  name: "customColorMenu",
  initialState: {
    isOpen: false,
  },
  reducers: {
    closeCustomColorMenu: (state) => {
      state.isOpen = false;
    },

    openCustomColorMenu: (state) => {
      state.isOpen = true;
    },

    generalCustomColorMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  closeCustomColorMenu,
  openCustomColorMenu,
  generalCustomColorMenu,
} = customColorMenuSlice.actions;
export default customColorMenuSlice.reducer;

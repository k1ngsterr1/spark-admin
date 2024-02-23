import { createSlice } from "@reduxjs/toolkit";

const websitePopupSlice = createSlice({
  name: "websitePopup",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleOnPopup: (state) => {
      state.isOpen = true;
    },
    toggleOffPopup: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleOnPopup, toggleOffPopup } = websitePopupSlice.actions;
export default websitePopupSlice.reducer;

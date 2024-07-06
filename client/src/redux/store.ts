import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "@redux/slices/colorMenuSlice";
import customColorMenuSlice from "./slices/customColorMenuSlice";
import textMenuSlice from "./slices/textMenuSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      colorMenu: colorSlice,
      textMenu: textMenuSlice,
      customColorMenu: customColorMenuSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

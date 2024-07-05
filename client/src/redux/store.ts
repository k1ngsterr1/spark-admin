import { configureStore } from "@reduxjs/toolkit";
import colorSlice from "@redux/slices/colorMenuSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      colorMenu: colorSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

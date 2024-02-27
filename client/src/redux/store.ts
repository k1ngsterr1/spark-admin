import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import websitePopupReducer from "./slices/websitePopupSlice";

const rootReducer = combineReducers({
  websitePopup: websitePopupReducer,
});

export const makeStore = (preloadedState: any) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const wrapper = createWrapper(makeStore);
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

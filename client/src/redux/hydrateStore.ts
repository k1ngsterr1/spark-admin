"use client";

import { useEffect } from "react";
import { makeStore } from "./store";

export const useHydrateStore = (initialState: any) => {
  useEffect(() => {
    const store = makeStore(initialState);
  }, [initialState]);
};

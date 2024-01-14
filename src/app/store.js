import { configureStore } from "@reduxjs/toolkit";
import home from "./state/homeSlice";

export const store = configureStore({
  reducer: {
    home
  },
});
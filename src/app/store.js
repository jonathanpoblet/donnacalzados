import { configureStore } from "@reduxjs/toolkit";
import home from "./state/homeSlice";
import cart from "./state/cartSlice";
import detail from "./state/detailSlice";


export const store = configureStore({
  reducer: {
    home,
    cart,
    detail
  },
});
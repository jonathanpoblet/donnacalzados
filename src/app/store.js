import { configureStore } from '@reduxjs/toolkit';
import cart from './state/cartSlice';
import products from './state/productsSlice';

export const store = configureStore({
  reducer: {
    cart,
    products,
  },
});

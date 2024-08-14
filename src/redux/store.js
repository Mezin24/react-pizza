import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter';
import cart from './slices/cart';

export const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});

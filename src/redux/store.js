import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter';
import cart from './slices/cart';
import pizza from './slices/pizza';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

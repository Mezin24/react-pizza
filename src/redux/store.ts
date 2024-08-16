import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter';
import cart from './slices/cart';
import pizza from './slices/pizza';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

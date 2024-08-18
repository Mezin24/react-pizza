import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pizza } from 'src/types/pizza';
import { RootState } from '../store';
import { LOCAL_STORAGE_CART_KEY } from 'src/const';
import { calcTotalPrice } from 'src/utils/calcTotalPrice';
import { calcTotalAmount } from 'src/utils/calcTotalAmount';
import { getCartFromLS } from 'src/utils/getCartFromLS';

interface CartState {
  totalPrice: number;
  totalAmount: number;
  items: Pizza[];
}

const { items, totalAmount, totalPrice } = getCartFromLS();

const initialState: CartState = {
  totalPrice,
  totalAmount,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, { payload }: PayloadAction<Pizza>) {
      const addedItem = state.items.find((item) => item.id === payload.id);

      if (addedItem) {
        addedItem.amount++;
      } else {
        state.items.push(payload);
      }

      state.totalPrice = calcTotalPrice(state.items);
      state.totalAmount = calcTotalAmount(state.items);
    },
    reduceProduct(state, { payload }: PayloadAction<string>) {
      const reducedItem = state.items.find((item) => item.id === payload);

      if (!reducedItem) return;
      if (reducedItem.amount <= 1) return;

      state.items = state.items.map((item) =>
        item.id === payload ? { ...item, amount: item.amount - 1 } : item
      );
      state.totalPrice = state.totalPrice - reducedItem.price;
      state.totalAmount -= 1;
    },
    removeProduct(state, { payload }: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== payload);
      state.totalPrice = calcTotalPrice(state.items);
      state.totalAmount = calcTotalAmount(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCartData = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { addProduct, removeProduct, clearItems, reduceProduct } =
  cartSlice.actions;
export default cartSlice.reducer;

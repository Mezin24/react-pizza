import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalAmount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, { payload }) {
      const addedItem = state.items.find((item) => item.id === payload.id);

      if (addedItem) {
        addedItem.amount++;
      } else {
        state.items.push(payload);
      }

      state.totalPrice = state.items.reduce(
        (acc, cur) => cur.price * cur.amount + acc,
        0
      );
      state.totalAmount = state.items.reduce((acc, cur) => cur.amount + acc, 0);
    },
    reduceProduct(state, { payload }) {
      const reducedItem = state.items.find((item) => item.id === payload);

      if (reducedItem.amount <= 1) return;

      state.items = state.items.map((item) =>
        item.id === payload ? { ...item, amount: item.amount - 1 } : item
      );
      state.totalPrice = state.totalPrice - reducedItem.price;
      state.totalAmount -= 1;
    },
    removeProduct(state, { payload }) {
      state.items = state.items.filter((item) => item.id !== payload);
      state.totalPrice = state.items.reduce(
        (acc, cur) => cur.price * cur.amount + acc,
        0
      );
      state.totalAmount = state.items.reduce((acc, cur) => cur.amount + acc, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCartData = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const { addProduct, removeProduct, clearItems, reduceProduct } =
  cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { createQuery } from 'src/lib/createQuery';

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizza',
  async ({ category, sortBy }) => {
    const query = createQuery(category, sortBy);

    const { data } = await axios.get(
      'https://66b22a731ca8ad33d4f6cda8.mockapi.io/items' + query
    );
    return data;
  }
);

const initialState = {
  pizzas: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = 'loading';
        state.pizzas = [];
      })
      .addCase(fetchPizza.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.pizzas = payload;
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.status = 'error';
        state.pizzas = [];
      });
  },
});

export default pizzaSlice.reducer;

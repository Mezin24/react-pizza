import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { createQuery } from 'src/lib/createQuery';
import { PizzaData } from 'src/types/pizza';

interface FetchPizzaProps {
  category: string;
  sortBy: string;
  search: string;
}

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizza',
  async ({ category, sortBy, search }: FetchPizzaProps) => {
    const query = createQuery(category, sortBy, search);

    const { data } = await axios.get(
      'https://66b22a731ca8ad33d4f6cda8.mockapi.io/items' + query
    );
    return data;
  }
);

export interface PizzaState {
  pizzas: PizzaData[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaState = {
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

export const selectPizzaData = (state) => state.pizza;

export default pizzaSlice.reducer;

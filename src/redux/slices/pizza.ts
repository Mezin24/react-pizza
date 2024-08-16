import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { createQuery } from 'src/lib/createQuery';
import { PizzaData, SortByProps } from 'src/types/pizza';
import { RootState } from '../store';

interface FetchPizzaProps {
  category: number;
  sortBy: SortByProps;
  search: string;
}

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizza',
  async ({ category, sortBy, search }: FetchPizzaProps) => {
    const query = createQuery(category, sortBy, search);

    const { data } = await axios.get<PizzaData[]>(
      'https://66b22a731ca8ad33d4f6cda8.mockapi.io/items' + query
    );

    if (!data) {
      throw Error('No data');
    }

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
  reducers: {},
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

export const selectPizzaData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;

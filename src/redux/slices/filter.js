import { createSlice } from '@reduxjs/toolkit';
import { pizzaSort } from 'src/const';

const initialState = {
  categoryIndex: 0,
  sortBy: pizzaSort[0],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryIndex: (state, { payload }) => {
      state.categoryIndex = payload;
    },
    setSortBy: (state, { payload }) => {
      state.sortBy = payload;
    },
    setFilters: (state, { payload }) => {
      state.categoryIndex = payload.categoryIndex;
      state.sortBy = payload.sortBy;
    },
  },
});

export const { setCategoryIndex, setSortBy, setFilters } = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { pizzaSort } from 'src/const';

const initialState = {
  categoryIndex: 0,
  sortBy: pizzaSort[0],
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
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

export const selectFilter = (state) => state.filter;

export const { setCategoryIndex, setSortBy, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;

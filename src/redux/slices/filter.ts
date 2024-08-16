import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pizzaSort } from 'src/const';
import { RootState } from '../store';
import { SortByProps } from 'src/types/pizza';

export interface FilterProps {
  categoryIndex: number;
  sortBy: SortByProps;
  searchValue: string;
}

const initialState: FilterProps = {
  categoryIndex: 0,
  sortBy: pizzaSort[0],
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
    setCategoryIndex: (state, { payload }: PayloadAction<number>) => {
      state.categoryIndex = payload;
    },
    setSortBy: (state, { payload }: PayloadAction<SortByProps>) => {
      state.sortBy = payload;
    },
    setFilters: (
      state,
      { payload }: PayloadAction<{ categoryIndex: number; sortBy: SortByProps }>
    ) => {
      state.categoryIndex = payload.categoryIndex;
      state.sortBy = payload.sortBy;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryIndex, setSortBy, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;

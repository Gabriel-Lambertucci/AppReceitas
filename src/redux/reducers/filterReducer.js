import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFiltering: false,
  searchByText: '',
  searchByCategory: '',
};

export const counterSlice = createSlice(
  {
    name: 'filter',
    initialState,
    reducers: {
      filterIsFiltering: (state, action) => {
        state.searchByText = action.payload;
      },
      filterByText: (state, action) => {
        state.searchByText = action.payload;
      },
      filterByCategory: (state, action) => {
        state.searchByCategory = action.payload;
      },
    },
  },
);

export const {
  filterIsFiltering,
  filterByText,
  filterByCategory } = counterSlice.actions;

export default counterSlice.reducer;

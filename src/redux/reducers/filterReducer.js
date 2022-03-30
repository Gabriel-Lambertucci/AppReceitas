import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchByText: '',
  searchByCategory: '',
};

export const counterSlice = createSlice(
  {
    name: 'filter',
    initialState,
    reducers: {
      filterByText: (state, action) => {
        state.searchByText = action.payload;
      },
      filterByCategory: (state, action) => {
        state.searchByCategory = action.payload;
      },
    },
  },
);

export const { filterByText, filterByCategory } = counterSlice.actions;

export default counterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isFood: 'food',
  fetchAPI: [],
};

export const counterSlice = createSlice(
  {
    name: 'data',
    initialState,
    reducers: {
      dataIsLoading: (state, action) => {
        state.isLoading = action.payload;
      },
      dataIsFood: (state, action) => {
        state.isFood = action.payload;
      },
      dataFetchAPI: (state, action) => {
        state.fetchAPI = action.payload;
      },
    },
  },
);

export const {
  dataIsLoading,
  dataIsFood,
  dataFetchAPI } = counterSlice.actions;

export default counterSlice.reducer;

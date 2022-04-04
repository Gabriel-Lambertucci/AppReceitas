import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isFood: true,
  fetchAPI: [],
  inProgressRecipe: [],
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
      dataInProgress: (state, action) => {
        state.inProgressRecipe = [...state.inProgressRecipe, action.payload];
      },
    },
  },
);

export const {
  dataIsLoading,
  dataIsFood,
  dataFetchAPI,
  dataInProgress } = counterSlice.actions;

export default counterSlice.reducer;

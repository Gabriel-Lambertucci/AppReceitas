import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isFood: true,
  fetchAPIFood: [],
  fetchAPIDrink: [],
};

export const counterSlice = createSlice(
  {
    name: 'data',
    initialState,
    reducers: {
      dataIsLoading: (state, action) => {
        state.isLoading = action.payload;
      },
      dataWhichFetch: (state, action) => {
        state.whichFetch = action.payload;
      },
      dataFetchAPIFood: (state, action) => {
        state.fetchAPIFood = action.payload;
      },
      dataFetchAPIDrink: (state, action) => {
        state.fetchAPIDrink = action.payload;
      },
    },
  },
);

export const {
  dataIsLoading,
  dataWhichFetch,
  dataFetchAPIFood,
  dataFetchAPIDrink } = counterSlice.actions;

export default counterSlice.reducer;

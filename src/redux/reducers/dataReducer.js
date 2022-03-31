import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isFood: true,
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
      dataWhichFetch: (state, action) => {
        state.whichFetch = action.payload;
      },
      dataFetchAPIFood: (state, action) => {
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

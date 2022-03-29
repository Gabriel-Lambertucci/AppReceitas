import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
};

export const counterSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
      userEmail: (state, action) => {
        state.email = action.payload;
      },
      userPassword: (state, action) => {
        state.password = action.payload;
      },
    },
  },
);

export const { userEmail, userPassword } = counterSlice.actions;

export default counterSlice.reducer;

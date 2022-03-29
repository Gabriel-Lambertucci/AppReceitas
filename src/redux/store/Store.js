import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

if (window.Cypress) {
  window.store = store;
}

export default store;

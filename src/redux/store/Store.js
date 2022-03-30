import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../reducers/filterReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
  },
});

if (window.Cypress) {
  window.store = store;
}

export default store;

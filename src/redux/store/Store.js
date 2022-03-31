import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../reducers/dataReducer';
import filterReducer from '../reducers/filterReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    data: dataReducer,
  },
});

if (window.Cypress) {
  window.store = store;
}

export default store;

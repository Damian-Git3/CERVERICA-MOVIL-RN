import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authReducer'; // Tu reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
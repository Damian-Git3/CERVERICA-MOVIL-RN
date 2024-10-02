// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notifications/notificationReducer';
// Importa otros reducers si los tienes

const rootReducer = combineReducers({
  notifications: notificationReducer,
  // Otros reducers aquí
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),  // Middleware por defecto
  devTools: process.env.NODE_ENV !== 'production',  // Herramientas de desarrollo
});

export default store;

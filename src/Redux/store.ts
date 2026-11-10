import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { setUnauthorizedHandler } from '@/Utils/api/axiosInstance';

import { listenerMiddleware } from './listeners';
import { authReducer, loggedOut } from './slices/authSlice';
import { productsReducer } from './slices/productsSlice';
import { settingsReducer } from './slices/settingsSlice';
import { toastReducer } from './slices/toastSlice';
import { usersReducer } from './slices/usersSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  products: productsReducer,
  users: usersReducer,
  toasts: toastReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;

setUnauthorizedHandler(() => {
  store.dispatch(loggedOut());
});

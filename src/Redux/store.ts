import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { getDictionary } from '@/Dictionary';
import { ApiErrorCode, ToastType } from '@/types/Enums';
import { setUnauthorizedHandler } from '@/Utils/api/axiosInstance';

import { listenerMiddleware } from './listeners';
import { authReducer, loggedOut } from './slices/authSlice';
import { productsReducer } from './slices/productsSlice';
import { settingsReducer } from './slices/settingsSlice';
import { toastReducer, toastShown } from './slices/toastSlice';
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
  const { auth, settings } = store.getState();

  // Several requests can fail at once; only the first one signs out and explains why.
  if (auth.session === null) return;

  const message = getDictionary(settings.locale).errors[ApiErrorCode.Unauthorized];
  store.dispatch(loggedOut());
  store.dispatch(toastShown(ToastType.Error, message));
});

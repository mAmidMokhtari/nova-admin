import { createListenerMiddleware } from '@reduxjs/toolkit';

import { sessionStorageService } from '@/Storage/sessionStorage';
import { localeStorageService, themeStorageService } from '@/Storage/settingsStorage';

import { loggedOut, login } from './slices/authSlice';
import { localeChanged, themeToggled } from './slices/settingsSlice';
import type { RootState } from './store';

/** Keeps browser storage in sync with the store, so reducers stay free of side effects. */
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: login.fulfilled,
  effect: (action) => {
    sessionStorageService.write(action.payload);
  },
});

listenerMiddleware.startListening({
  actionCreator: loggedOut,
  effect: () => {
    sessionStorageService.clear();
  },
});

listenerMiddleware.startListening({
  actionCreator: localeChanged,
  effect: (action) => {
    localeStorageService.write(action.payload);
  },
});

listenerMiddleware.startListening({
  actionCreator: themeToggled,
  effect: (_, api) => {
    themeStorageService.write((api.getState() as RootState).settings.theme);
  },
});

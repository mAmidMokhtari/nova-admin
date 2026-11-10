import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { localeStorageService, themeStorageService } from '@/Storage/settingsStorage';
import { Locale, ThemeMode } from '@/types/Enums';

import type { RootState } from '../store';

type SettingsState = {
  locale: Locale;
  theme: ThemeMode;
};

function getInitialTheme(): ThemeMode {
  const stored = themeStorageService.read();
  if (stored) return stored;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemeMode.Dark
    : ThemeMode.Light;
}

const initialState: SettingsState = {
  locale: localeStorageService.read() ?? Locale.Fa,
  theme: getInitialTheme(),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    localeChanged(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    themeToggled(state) {
      state.theme = state.theme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    },
  },
});

export const { localeChanged, themeToggled } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;

export const selectLocale = (state: RootState): Locale => state.settings.locale;
export const selectTheme = (state: RootState): ThemeMode => state.settings.theme;

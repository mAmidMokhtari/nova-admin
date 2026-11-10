import { Locale, StorageKey, ThemeMode } from '@/types/Enums';

import { createStorage } from './createStorage';

function isLocale(value: unknown): value is Locale {
  return Object.values(Locale).includes(value as Locale);
}

function isThemeMode(value: unknown): value is ThemeMode {
  return Object.values(ThemeMode).includes(value as ThemeMode);
}

/** Preferred panel language. */
export const localeStorageService = createStorage<Locale>(
  () => window.localStorage,
  StorageKey.Locale,
  isLocale,
);

/** Preferred color theme. */
export const themeStorageService = createStorage<ThemeMode>(
  () => window.localStorage,
  StorageKey.Theme,
  isThemeMode,
);

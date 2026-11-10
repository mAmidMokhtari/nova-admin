import { useAppSelector } from '@/Redux/hooks';
import { selectLocale } from '@/Redux/slices/settingsSlice';
import { Locale } from '@/types/Enums';

import { en } from './en';
import { fa } from './fa';
import type { Dictionary } from './types';

export type { Dictionary } from './types';

const dictionaries: Record<Locale, Dictionary> = {
  [Locale.Fa]: fa,
  [Locale.En]: en,
};

/** Returns the dictionary of the given locale. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Returns the dictionary of the currently selected panel language. */
export function useDictionary(): Dictionary {
  return getDictionary(useAppSelector(selectLocale));
}

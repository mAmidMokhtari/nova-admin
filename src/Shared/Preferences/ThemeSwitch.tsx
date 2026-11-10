import { Moon, Sun } from 'lucide-react';

import { useDictionary } from '@/Dictionary';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { selectTheme, themeToggled } from '@/Redux/slices/settingsSlice';
import { IconButton } from '@/Shared/IconButton';
import { ThemeMode } from '@/types/Enums';

/** Toggles between the light and dark theme. */
export function ThemeSwitch() {
  const dispatch = useAppDispatch();
  const dictionary = useDictionary();
  const isDark = useAppSelector(selectTheme) === ThemeMode.Dark;

  return (
    <IconButton
      label={isDark ? dictionary.header.switchToLight : dictionary.header.switchToDark}
      onClick={() => dispatch(themeToggled())}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </IconButton>
  );
}

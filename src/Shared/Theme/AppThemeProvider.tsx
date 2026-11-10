import { useEffect, type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { useAppSelector } from '@/Redux/hooks';
import { selectLocale, selectTheme } from '@/Redux/slices/settingsSlice';
import { getDirection } from '@/Utils/formatters';

import { GlobalStyle } from './GlobalStyle';
import { themes } from './theme';

type AppThemeProviderProps = {
  children: ReactNode;
};

/** Applies the selected theme and keeps the document language and direction in sync. */
export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const locale = useAppSelector(selectLocale);
  const mode = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  return (
    <ThemeProvider theme={themes[mode]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

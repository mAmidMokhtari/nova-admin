import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { localeChanged, selectLocale } from '@/Redux/slices/settingsSlice';
import { Locale } from '@/types/Enums';

const Group = styled.div`
  display: inline-flex;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const Option = styled.button<{ $active: boolean }>`
  min-inline-size: 40px;
  block-size: 32px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme, $active }) => ($active ? theme.colors.accentSoft : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

/** Language codes are shown untranslated on purpose, so each is readable in any locale. */
const LOCALE_LABELS: Record<Locale, string> = {
  [Locale.Fa]: 'FA',
  [Locale.En]: 'EN',
};

/** Segmented control that switches the panel language. */
export function LocaleSwitch() {
  const dispatch = useAppDispatch();
  const dictionary = useDictionary();
  const activeLocale = useAppSelector(selectLocale);

  return (
    <Group role="group" aria-label={dictionary.header.language} dir="ltr">
      {Object.values(Locale).map((locale) => (
        <Option
          key={locale}
          type="button"
          lang={locale}
          $active={locale === activeLocale}
          aria-pressed={locale === activeLocale}
          onClick={() => dispatch(localeChanged(locale))}
        >
          {LOCALE_LABELS[locale]}
        </Option>
      ))}
    </Group>
  );
}

import { Direction, Locale } from '@/types/Enums';

const INTL_LOCALES: Record<Locale, string> = {
  [Locale.Fa]: 'fa-IR',
  [Locale.En]: 'en-US',
};

/** FakeStoreAPI prices are plain numbers in US dollars. */
const API_CURRENCY = 'USD';

/** Formats an API price with the digits and separators of the locale. */
export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALES[locale], {
    style: 'currency',
    currency: API_CURRENCY,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Formats a plain number with the digits of the locale. */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALES[locale]).format(value);
}

/** Text direction of a locale. */
export function getDirection(locale: Locale): Direction {
  return locale === Locale.Fa ? Direction.Rtl : Direction.Ltr;
}

/**
 * Replaces `{name}` placeholders of a dictionary template.
 * @param values placeholder name to value
 */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in values ? String(values[name]) : placeholder,
  );
}

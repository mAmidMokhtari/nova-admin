const PERSIAN_ZERO = '۰'.charCodeAt(0);
const ARABIC_ZERO = '٠'.charCodeAt(0);

/** Converts Persian and Arabic-Indic digits to ASCII digits. */
export function toEnglishDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - PERSIAN_ZERO))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - ARABIC_ZERO));
}

/** Parses a number typed with any supported digit set; returns `NaN` when it is not numeric. */
export function parseLocalizedNumber(value: string): number {
  const normalized = toEnglishDigits(value).replace(/٫/g, '.').trim();
  return normalized === '' ? Number.NaN : Number(normalized);
}

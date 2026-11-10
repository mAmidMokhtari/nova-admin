/** Lowercases and unifies Arabic/Persian letter variants so typed queries match stored text. */
export function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک');
}

/**
 * Tells whether any of the fields contains the query.
 * @param fields the searchable text of one row
 */
export function matchesQuery(query: string, fields: readonly string[]): boolean {
  const needle = normalizeText(query);
  if (needle === '') return true;

  return fields.some((field) => normalizeText(field).includes(needle));
}

/** Returns an id greater than every id in the list. */
export function getNextId(items: readonly { id: number }[]): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

import type { StorageKey } from '@/types/Enums';

export type StorageService<T> = {
  read: () => T | null;
  write: (value: T) => void;
  clear: () => void;
};

/**
 * Wraps a Web Storage area with JSON handling. Storage can be unavailable
 * (private mode, blocked site data), so every access degrades to a no-op.
 * @param getArea lazy accessor, because touching `window.localStorage` itself can throw
 * @param isValid guards against stale or tampered values
 */
export function createStorage<T>(
  getArea: () => Storage,
  key: StorageKey,
  isValid: (value: unknown) => value is T,
): StorageService<T> {
  return {
    read() {
      try {
        const raw = getArea().getItem(key);
        if (raw === null) return null;

        const parsed: unknown = JSON.parse(raw);
        return isValid(parsed) ? parsed : null;
      } catch {
        return null;
      }
    },
    write(value) {
      try {
        getArea().setItem(key, JSON.stringify(value));
      } catch {
        // Persisting is best effort; the in-memory state stays correct.
      }
    },
    clear() {
      try {
        getArea().removeItem(key);
      } catch {
        // Nothing to clean up when storage is unavailable.
      }
    },
  };
}

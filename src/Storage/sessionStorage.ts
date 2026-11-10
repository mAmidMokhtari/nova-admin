import type { Session } from '@/types';
import { StorageKey } from '@/types/Enums';

import { createStorage } from './createStorage';

function isSession(value: unknown): value is Session {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return typeof candidate.token === 'string' && typeof candidate.username === 'string';
}

/**
 * Admin session. FakeStoreAPI returns the token in the response body, so an HttpOnly
 * cookie is not possible; sessionStorage limits its lifetime to the browser tab.
 */
export const sessionStorageService = createStorage<Session>(
  () => window.sessionStorage,
  StorageKey.Session,
  isSession,
);

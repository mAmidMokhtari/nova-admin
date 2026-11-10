import type { Dictionary } from '@/Dictionary';
import { ApiErrorCode } from '@/types/Enums';

function isApiErrorCode(value: unknown): value is ApiErrorCode {
  return Object.values(ApiErrorCode).includes(value as ApiErrorCode);
}

/**
 * Turns whatever a rejected thunk threw into a translated, user-facing message.
 * @param error the value caught from `dispatch(thunk).unwrap()`
 */
export function getErrorMessage(error: unknown, dictionary: Dictionary): string {
  return dictionary.errors[isApiErrorCode(error) ? error : ApiErrorCode.Unknown];
}

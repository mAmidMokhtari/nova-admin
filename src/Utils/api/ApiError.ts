import { ApiErrorCode } from '@/types/Enums';

/** Error shape every failed request is converted to before it reaches the app. */
export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number | null;

  constructor(code: ApiErrorCode, status: number | null = null) {
    super(code);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

/** Extracts the normalized code from anything thrown by a service call. */
export function toApiErrorCode(error: unknown): ApiErrorCode {
  return error instanceof ApiError ? error.code : ApiErrorCode.Unknown;
}

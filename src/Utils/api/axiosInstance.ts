import axios, { AxiosError, type AxiosInstance } from 'axios';

import { sessionStorageService } from '@/Storage/sessionStorage';
import { ApiErrorCode } from '@/types/Enums';
import { env } from '@/Utils/env';

import { ApiError } from './ApiError';

const REQUEST_TIMEOUT_MS = 15_000;

type UnauthorizedHandler = () => void;

let unauthorizedHandler: UnauthorizedHandler | null = null;

/**
 * Lets the store react to an expired session without the API layer importing Redux.
 * @param handler called when an authenticated request is answered with 401
 */
export function setUnauthorizedHandler(handler: UnauthorizedHandler): void {
  unauthorizedHandler = handler;
}

function resolveErrorCode(error: AxiosError): ApiErrorCode {
  if (error.code === AxiosError.ECONNABORTED || error.code === AxiosError.ETIMEDOUT) {
    return ApiErrorCode.Timeout;
  }

  const status = error.response?.status;

  if (status === undefined) return ApiErrorCode.Network;
  if (status === 401 || status === 403) return ApiErrorCode.Unauthorized;
  if (status === 404) return ApiErrorCode.NotFound;
  if (status >= 500) return ApiErrorCode.Server;

  return ApiErrorCode.Unknown;
}

/** The only HTTP client of the app; every service goes through it. */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorageService.read()?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(new ApiError(ApiErrorCode.Unknown));
    }

    const code = resolveErrorCode(error);
    const wasAuthenticated = Boolean(error.config?.headers.Authorization);

    if (code === ApiErrorCode.Unauthorized && wasAuthenticated) {
      unauthorizedHandler?.();
    }

    return Promise.reject(new ApiError(code, error.response?.status ?? null));
  },
);

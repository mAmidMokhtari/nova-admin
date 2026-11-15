/** Normalized failure reasons produced by the axios response interceptor. */
export enum ApiErrorCode {
  Network = 'network',
  Timeout = 'timeout',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
  NotFound = 'notFound',
  Server = 'server',
  Unknown = 'unknown',
}

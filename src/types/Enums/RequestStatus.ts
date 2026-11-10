/** Lifecycle of an async request tracked in a Redux slice. */
export enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

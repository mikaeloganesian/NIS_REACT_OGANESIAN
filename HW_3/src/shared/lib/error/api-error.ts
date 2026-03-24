import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  )
}

export function getApiErrorMessage(error: unknown): string | undefined {
  if (!isFetchBaseQueryError(error)) {
    return undefined
  }
  const data = error.data
  if (isRecord(data) && typeof data.message === 'string') {
    return data.message
  }
  return undefined
}

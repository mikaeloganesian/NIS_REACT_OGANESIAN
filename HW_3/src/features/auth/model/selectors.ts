import type { RootState } from '@/app/store/store'

export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectAuthUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.accessToken)

/** Minimal slice shape for Authorization header — avoids circular imports with the store. */
export interface AuthSliceForApi {
  auth: {
    accessToken: string | null
  }
}
